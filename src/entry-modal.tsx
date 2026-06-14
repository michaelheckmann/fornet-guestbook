import * as Dialog from "@radix-ui/react-dialog";
import type { Entry } from "./entries";

export const EntryModal = ({
  entry,
  onClose,
}: {
  entry: Entry | null;
  onClose: () => void;
}) => {
  const submittedLabel = entry?.submittedAt
    ? new Date(entry.submittedAt).toLocaleDateString("de-DE")
    : undefined;

  return (
    <Dialog.Root open={!!entry} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-8 shadow-xl focus:outline-none">
          {entry && (
            <>
              {entry.photo && (
                <img
                  src={entry.photo.url}
                  alt={`Portraet von ${entry.name}`}
                  className="h-64 w-full rounded-2xl object-cover"
                />
              )}
              <Dialog.Title className="text-lg font-semibold text-neutral-900">
                {entry.name}
              </Dialog.Title>
              {entry.institution && (
                <Dialog.Description className="text-sm text-neutral-500">
                  {entry.institution}
                </Dialog.Description>
              )}
              {submittedLabel && (
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-neutral-400">
                  Eingereicht am {submittedLabel}
                </p>
              )}
              <p className="mt-4 text-base leading-relaxed text-neutral-800">
                „Das For..Net Symposium ist für mich {entry.statement}"
              </p>
              {entry.message && (
                <div className="mt-4 rounded-2xl bg-neutral-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Zusatznachricht
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {entry.message}
                  </p>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {entry.years.map((y) => (
                  <span
                    key={y}
                    className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                  >
                    {y}
                  </span>
                ))}
              </div>
              {entry.impressions.length > 0 && (
                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Impressionen
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {entry.impressions.map((asset) => (
                      <img
                        key={asset.id}
                        src={asset.url}
                        alt={`Impression von ${entry.name}: ${asset.name}`}
                        className="h-32 w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
              <Dialog.Close className="mt-6 w-full rounded-lg bg-neutral-900 py-2 text-sm font-medium text-white">
                Schließen
              </Dialog.Close>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
