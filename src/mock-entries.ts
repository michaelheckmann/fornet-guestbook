import type { Entry, EntryAsset } from "./guestbook-entry";

type MockSeed = {
  id: string;
  name: string;
  institution?: string;
  statement: string;
  message: string;
  years: number[];
  accent: string;
};

const mockSeeds: MockSeed[] = [
  {
    id: "1",
    name: "Dr. Anna Bauer",
    institution: "TUM",
    statement:
      "ein Ort, an dem Recht und Technik endlich miteinander sprechen.",
    message:
      "Danke fuer zwanzig Jahre kluge Debatten und die seltene Mischung aus Haltung, Neugier und Gastfreundschaft.",
    years: [2008, 2012, 2019],
    accent: "#A8432F",
  },
  {
    id: "2",
    name: "Prof. Klaus Wagner",
    institution: "Uni Passau",
    statement: "der jaehrliche Reset fuer mein Denken ueber Digitalisierung.",
    message:
      "Ich nehme jedes Mal mindestens eine Frage mit, die mich noch Monate spaeter beschaeftigt.",
    years: [2005, 2006, 2007],
    accent: "#2563EB",
  },
  {
    id: "3",
    name: "Sarah Klein",
    institution: "bidt",
    statement: "Heimat. Ganz einfach.",
    message:
      "Bitte genauso weitermachen: nahbar, anspruchsvoll und offen fuer neue Stimmen.",
    years: [2021, 2022, 2023],
    accent: "#0F766E",
  },
  {
    id: "4",
    name: "Michael Roth",
    institution: "freiberuflich",
    statement: "die besten Pausengespraeche meiner Karriere.",
    message:
      "Die Begegnungen zwischen den Sessions waren oft genauso wertvoll wie die Buehne selbst.",
    years: [2015, 2018],
    accent: "#B45309",
  },
  {
    id: "5",
    name: "Dr. Lena Hoffmann",
    institution: "BAdW",
    statement: "ein Kompass in unsicheren digitalen Zeiten.",
    message:
      "For..Net schafft es, Komplexitaet nicht zu verflachen und trotzdem Lust auf Zukunft zu machen.",
    years: [2019, 2020, 2024],
    accent: "#7C3AED",
  },
  {
    id: "6",
    name: "Thomas Schaefer",
    institution: "Stadt Muenchen",
    statement: "der Beweis, dass Verwaltung Zukunft kann.",
    message:
      "Gerade der Austausch zwischen Verwaltung, Wissenschaft und Zivilgesellschaft macht das Format so stark.",
    years: [2016, 2017],
    accent: "#BE123C",
  },
  {
    id: "7",
    name: "Julia Neumann",
    institution: "TUM CDPS",
    statement: "jedes Jahr ein neuer Aha-Moment.",
    message:
      "Ich freue mich schon auf die naechsten zwanzig Jahre und auf all die Ideen, die hier noch entstehen.",
    years: [2022, 2023, 2025],
    accent: "#0891B2",
  },
  {
    id: "8",
    name: "Prof. Dirk Vogel",
    institution: "Uni Regensburg",
    statement: "wo aus Fragen Netzwerke werden.",
    message:
      "Fuer mich war For..Net immer auch ein Ort, an dem Kooperationen fast nebenbei entstehen.",
    years: [2009, 2011, 2014],
    accent: "#4F46E5",
  },
  {
    id: "9",
    name: "Maria Fischer",
    institution: "privat",
    statement: "mein liebster Termin im Jahr.",
    message:
      "Selten fuehlt sich eine Konferenz so warm, konzentriert und gleichzeitig relevant an.",
    years: [2020, 2021],
    accent: "#DB2777",
  },
  {
    id: "10",
    name: "Stefan Berger",
    institution: "LMU",
    statement: "Inspiration mit Tiefgang.",
    message:
      "Die Mischung aus theoretischer Schaerfe und praktischer Konsequenz ist fuer mich weiterhin einzigartig.",
    years: [2013, 2016, 2019],
    accent: "#059669",
  },
  {
    id: "11",
    name: "Dr. Petra Lang",
    institution: "TUM",
    statement: "ein Stueck Wissenschaftsgeschichte zum Mitmachen.",
    message:
      "Man spuertet hier, wie sich ein Thema und eine Community ueber Jahre gemeinsam weiterentwickeln.",
    years: [2007, 2010],
    accent: "#9333EA",
  },
  {
    id: "12",
    name: "Andreas Huber",
    institution: "Bay. Staatsregierung",
    statement: "der Ort, an dem Ideen Beine bekommen.",
    message:
      "Bitte behaltet genau diese Mischung aus Ernsthaftigkeit, Offenheit und Freude am Widerspruch.",
    years: [2018, 2024, 2025],
    accent: "#DC2626",
  },
];

const createMockAsset = (
  id: string,
  label: string,
  accent: string,
  subtitle: string,
): EntryAsset => {
  const safeLabel = escapeXml(label);
  const safeSubtitle = escapeXml(subtitle);
  const safeAccent = escapeXml(accent);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${safeLabel}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${safeAccent}" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)" rx="48" />
      <circle cx="980" cy="170" r="130" fill="rgba(255,255,255,0.12)" />
      <circle cx="210" cy="620" r="170" fill="rgba(255,255,255,0.08)" />
      <text x="88" y="520" fill="#F9FAFB" font-size="84" font-family="Georgia, serif">${safeLabel}</text>
      <text x="92" y="610" fill="#E5E7EB" font-size="34" font-family="Arial, sans-serif">${safeSubtitle}</text>
    </svg>
  `.trim();

  return {
    id,
    name: `${id}.svg`,
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    mimeType: "image/svg+xml",
    size: svg.length,
  };
};

const buildImpressions = (seed: MockSeed, index: number): EntryAsset[] => {
  const labels = [
    `Begegnungen ${seed.years.at(-1) ?? "For..Net"}`,
    `Panelmoment ${seed.institution ?? "For..Net"}`,
  ];

  return labels
    .slice(0, index % 3 === 0 ? 2 : 1)
    .map((label, labelIndex) =>
      createMockAsset(
        `${seed.id}-impression-${labelIndex + 1}`,
        label,
        seed.accent,
        seed.name,
      ),
    );
};

const escapeXml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const mockEntries: Entry[] = mockSeeds.map((seed, index) => ({
  id: `mock-${seed.id}`,
  source: "mock",
  name: seed.name,
  institution: seed.institution,
  statement: seed.statement,
  message: seed.message,
  years: seed.years,
  photo: createMockAsset(
    `${seed.id}-photo`,
    seed.name,
    seed.accent,
    seed.institution ?? "For..Net Symposium",
  ),
  impressions: buildImpressions(seed, index),
  consentPublish: true,
  consentImageRights: true,
}));
