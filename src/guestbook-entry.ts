export type EntryAsset = {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  size: number;
};

export type EntrySource = "mock" | "tally";

export type Entry = {
  id: string;
  source: EntrySource;
  submittedAt?: string;
  name: string;
  institution?: string;
  statement: string;
  message?: string;
  years: number[];
  photo?: EntryAsset;
  impressions: EntryAsset[];
  consentPublish: boolean;
  consentImageRights: boolean;
};
