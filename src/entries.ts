import { realEntries } from "./generated/real-entries";
import type { Entry } from "./guestbook-entry";
import { mockEntries } from "./mock-entries";

export type { Entry } from "./guestbook-entry";
export { mockEntries, realEntries };

// Flip this to preview only fetched Tally submissions.
export const INCLUDE_MOCK_ENTRIES = true;

export const entries: Entry[] = [
  ...realEntries,
  ...(INCLUDE_MOCK_ENTRIES ? mockEntries : []),
];
