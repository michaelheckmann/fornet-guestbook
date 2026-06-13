import type { NodeProps } from "@xyflow/react";
import type { Entry } from "./entries";

export const GuestbookNode = ({ data }: NodeProps & { data: Entry }) => {
  return (
    <div className="w-[280px] h-[180px] rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm flex flex-col justify-between">
      <p className="text-[15px] leading-snug text-neutral-800">
        <span className="text-neutral-300 text-xl leading-none">„</span>
        Das For..Net Symposium ist für mich {data.statement}
      </p>
      <div>
        <p className="text-sm font-medium text-neutral-900">{data.name}</p>
        {data.institution && (
          <p className="text-xs text-neutral-500">{data.institution}</p>
        )}
        <div className="mt-1.5 flex flex-wrap gap-1">
          {data.years.map((y) => (
            <span
              key={y}
              className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-500"
            >
              '{String(y).slice(2)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
