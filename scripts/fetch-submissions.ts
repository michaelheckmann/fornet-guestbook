import { configDotenv } from "dotenv";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import type { Entry, EntryAsset } from "../src/guestbook-entry";

configDotenv();

const TALLY_API =
  "https://api.tally.so/forms/XxNobj/submissions?limit=500&filter=completed";

const FIELD_TITLES = {
  name: "name",
  institution: "Institution / Einrichtung",
  years: "years_attended",
  photo: "photo",
  impressions: "impressions",
  statement: "statement",
  message: "message",
  consentPublish: "consent_publish",
  consentImageRights: "consent_image_rights",
} as const;

type TallyQuestion = {
  id: string;
  title: string;
};

type TallyResponse = {
  questions?: TallyQuestion[];
  submissions?: TallySubmission[];
};

type TallySubmission = {
  id: string;
  isCompleted?: boolean;
  submittedAt?: string;
  responses?: TallyAnswer[];
};

type TallyAnswer = {
  questionId: string;
  answer: unknown;
};

type TallyFile = EntryAsset;

type QuestionIdMap = Partial<Record<keyof typeof FIELD_TITLES, string>>;

async function main() {
  const apiKey = process.env.TALLY_API_KEY;
  if (!apiKey) {
    console.warn("Skipping Tally fetch because TALLY_API_KEY is not set.");
    return;
  }

  const res = await fetch(TALLY_API, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) throw new Error(`Tally fetch failed: ${res.status}`);

  const payload = (await res.json()) as TallyResponse;
  const realEntries = mapTallyResponse(payload);

  await mkdir("src/generated", { recursive: true });
  await writeFile(
    "src/generated/real-entries.ts",
    [
      'import type { Entry } from "../guestbook-entry";',
      "",
      `export const realEntries: Entry[] = ${JSON.stringify(realEntries, null, 2)};`,
      "",
    ].join("\n"),
  );
}

export const mapTallyResponse = (payload: TallyResponse): Entry[] => {
  const questionIds = getQuestionIds(payload.questions ?? []);

  return (payload.submissions ?? [])
    .filter((submission) => submission.isCompleted !== false)
    .map((submission) => toEntry(submission, questionIds))
    .filter((entry): entry is Entry => entry !== null);
};

const getQuestionIds = (questions: TallyQuestion[]): QuestionIdMap => {
  const entries = Object.entries(FIELD_TITLES).map(([key, title]) => {
    const question = questions.find((candidate) => candidate.title === title);
    return [key, question?.id] as const;
  });

  return Object.fromEntries(entries) as QuestionIdMap;
};

const toEntry = (
  submission: TallySubmission,
  questionIds: QuestionIdMap,
): Entry | null => {
  const name = getStringAnswer(submission, questionIds.name);
  const statement = getStringAnswer(submission, questionIds.statement);
  const consentPublish = hasConsent(submission, questionIds.consentPublish);
  const consentImageRights = hasConsent(
    submission,
    questionIds.consentImageRights,
  );

  if (!name || !statement || !consentPublish) {
    return null;
  }

  const photoFiles = consentImageRights
    ? getFileAnswer(submission, questionIds.photo)
    : [];

  return {
    id: submission.id,
    source: "tally",
    submittedAt: submission.submittedAt,
    name,
    institution: getStringAnswer(submission, questionIds.institution),
    statement,
    message: getStringAnswer(submission, questionIds.message),
    years: getYearsAnswer(submission, questionIds.years),
    photo: photoFiles[0],
    impressions: consentImageRights
      ? getFileAnswer(submission, questionIds.impressions)
      : [],
    consentPublish,
    consentImageRights,
  };
};

const getAnswer = (
  submission: TallySubmission,
  questionId: string | undefined,
): unknown => {
  if (!questionId) {
    return undefined;
  }

  return submission.responses?.find(
    (response) => response.questionId === questionId,
  )?.answer;
};

const getStringAnswer = (
  submission: TallySubmission,
  questionId: string | undefined,
): string | undefined => {
  const answer = getAnswer(submission, questionId);
  return typeof answer === "string" ? normalizeString(answer) : undefined;
};

const getYearsAnswer = (
  submission: TallySubmission,
  questionId: string | undefined,
): number[] => {
  const answer = getAnswer(submission, questionId);
  return toStringArray(answer)
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isFinite(value))
    .sort((left, right) => left - right);
};

const getFileAnswer = (
  submission: TallySubmission,
  questionId: string | undefined,
): TallyFile[] => {
  const answer = getAnswer(submission, questionId);

  if (!Array.isArray(answer)) {
    return [];
  }

  return answer.filter(isTallyFile).map((file) => ({
    id: file.id,
    name: normalizeString(file.name) ?? file.name,
    url: file.url,
    mimeType: file.mimeType,
    size: file.size,
  }));
};

const hasConsent = (
  submission: TallySubmission,
  questionId: string | undefined,
): boolean => toStringArray(getAnswer(submission, questionId)).length > 0;

const toStringArray = (value: unknown): string[] => {
  if (typeof value === "string") {
    const normalized = normalizeString(value);
    return normalized ? [normalized] : [];
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => normalizeString(entry))
    .filter((entry): entry is string => entry !== undefined);
};

const normalizeString = (value: string): string | undefined => {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
};

const isTallyFile = (value: unknown): value is TallyFile => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<TallyFile>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.url === "string" &&
    typeof candidate.mimeType === "string" &&
    typeof candidate.size === "number"
  );
};

if (process.argv[1]) {
  const scriptUrl = pathToFileURL(process.argv[1]).href;
  if (import.meta.url === scriptUrl) {
    main().catch((error) => {
      console.error(error);
      process.exit(1); // fail the build loudly rather than ship stale/empty data
    });
  }
}
