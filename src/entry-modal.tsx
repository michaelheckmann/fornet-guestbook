import * as Dialog from "@radix-ui/react-dialog";
import type { Entry } from "./entries";

export const EntryModal = ({
  entry,
  onClose,
}: {
  entry: Entry | null;
  onClose: () => void;
}) => {
  return (
    <Dialog.Root open={!!entry} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-xl focus:outline-none">
          {entry && (
            <>
              <Dialog.Title className="text-lg font-semibold text-neutral-900">
                {entry.name}
              </Dialog.Title>
              {entry.institution && (
                <Dialog.Description className="text-sm text-neutral-500">
                  {entry.institution}
                </Dialog.Description>
              )}
              <p className="mt-4 text-base leading-relaxed text-neutral-800">
                „Das For..Net Symposium ist für mich {entry.statement}"
              </p>
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
