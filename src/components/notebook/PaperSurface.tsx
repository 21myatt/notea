import type { ReactNode } from "react";
import type { PaperMode } from "../../types/notebook";

export function PaperSurface({ paper, children }: { paper: PaperMode; children: ReactNode }) {
  return (
    <main className={`paper-stage paper-stage--${paper}`}>
      <section className="paper" aria-label="Notebook page">
        <div className="paper__margin" aria-hidden="true" />
        <div className="paper__content">{children}</div>
      </section>
    </main>
  );
}
