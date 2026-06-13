export type Entry = {
  id: string;
  name: string;
  institution?: string;
  statement: string;
  years: number[];
};

export const entries: Entry[] = [
  {
    id: "1",
    name: "Dr. Anna Bauer",
    institution: "TUM",
    statement:
      "ein Ort, an dem Recht und Technik endlich miteinander sprechen.",
    years: [2008, 2012, 2019],
  },
  {
    id: "2",
    name: "Prof. Klaus Wagner",
    institution: "Uni Passau",
    statement: "der jährliche Reset für mein Denken über Digitalisierung.",
    years: [2005, 2006, 2007],
  },
  {
    id: "3",
    name: "Sarah Klein",
    institution: "bidt",
    statement: "Heimat. Ganz einfach.",
    years: [2021, 2022, 2023],
  },
  {
    id: "4",
    name: "Michael Roth",
    institution: "freiberuflich",
    statement: "die besten Pausengespräche meiner Karriere.",
    years: [2015, 2018],
  },
  {
    id: "5",
    name: "Dr. Lena Hoffmann",
    institution: "BAdW",
    statement: "ein Kompass in unsicheren digitalen Zeiten.",
    years: [2019, 2020, 2024],
  },
  {
    id: "6",
    name: "Thomas Schäfer",
    institution: "Stadt München",
    statement: "der Beweis, dass Verwaltung Zukunft kann.",
    years: [2016, 2017],
  },
  {
    id: "7",
    name: "Julia Neumann",
    institution: "TUM CDPS",
    statement: "jedes Jahr ein neuer Aha-Moment.",
    years: [2022, 2023, 2025],
  },
  {
    id: "8",
    name: "Prof. Dirk Vogel",
    institution: "Uni Regensburg",
    statement: "wo aus Fragen Netzwerke werden.",
    years: [2009, 2011, 2014],
  },
  {
    id: "9",
    name: "Maria Fischer",
    institution: "privat",
    statement: "mein liebster Termin im Jahr.",
    years: [2020, 2021],
  },
  {
    id: "10",
    name: "Stefan Berger",
    institution: "LMU",
    statement: "Inspiration mit Tiefgang.",
    years: [2013, 2016, 2019],
  },
  {
    id: "11",
    name: "Dr. Petra Lang",
    institution: "TUM",
    statement: "ein Stück Wissenschaftsgeschichte zum Mitmachen.",
    years: [2007, 2010],
  },
  {
    id: "12",
    name: "Andreas Huber",
    institution: "Bay. Staatsregierung",
    statement: "der Ort, an dem Ideen Beine bekommen.",
    years: [2018, 2024, 2025],
  },
];
