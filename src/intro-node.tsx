import { entries } from "./entries";

const totalVoices = entries.length;
const institutions = new Set(entries.map((e) => e.institution).filter(Boolean))
  .size;
const allYears = entries.flatMap((e) => e.years);
const span = `${Math.min(...allYears)}–${Math.max(...allYears)}`;

export const IntroNode = () => {
  return (
    <div className="w-[608px] h-[408px] rounded-3xl border border-neutral-200 bg-neutral-900 text-white p-10 shadow-lg flex flex-col justify-center items-center text-center">
      <p className="text-8xl font-bold tracking-tight">20</p>
      <p className="mt-1 text-lg font-medium">Jahre For..Net Symposium</p>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-300">
        Seit 2005 bringt das Symposium Wissenschaft, Praxis und Gesellschaft
        zusammen. Dieses virtuelle Gästebuch sammelt eure Erinnerungen.
      </p>
      <div className="mt-6 flex gap-6 text-sm">
        <Stat n={totalVoices} label="Stimmen" />
        <Stat n={institutions} label="Einrichtungen" />
        <Stat n={span} label="Jahre" />
      </div>
    </div>
  );
};

export const Stat = ({ n, label }: { n: number | string; label: string }) => {
  return (
    <div>
      <p className="text-xl font-semibold">{n}</p>
      <p className="text-xs text-neutral-400">{label}</p>
    </div>
  );
};
