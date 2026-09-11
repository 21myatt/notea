import type { SaveStatus as SaveStatusType } from "../../types/notebook";

const statusCopy: Record<SaveStatusType, string> = {
  idle: "Local notebook",
  saving: "Saving locally",
  saved: "Saved locally",
};

export function SaveStatus({ status }: { status: SaveStatusType }) {
  return (
    <span className={`save-status save-status--${status}`} aria-label={statusCopy[status]} title={statusCopy[status]} aria-live="polite">
      <span className="save-status__dot" aria-hidden="true" />
    </span>
  );
}
