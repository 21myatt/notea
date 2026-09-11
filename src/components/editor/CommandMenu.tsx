import type { CommandDefinition } from "../../types/commands";

type CommandMenuProps = {
  items: CommandDefinition[];
  selectedIndex: number;
  position: { top: number; left: number };
  onSelect: (command: CommandDefinition) => void;
};

export function CommandMenu({ items, selectedIndex, position, onSelect }: CommandMenuProps) {
  if (!items.length) return null;

  return (
    <div className="command-menu" role="listbox" aria-label="Insert block" style={{ top: position.top, left: position.left }}>
      <div className="command-menu__label">Insert block</div>
      {items.map((command, index) => (
        <button
          type="button"
          role="option"
          aria-selected={index === selectedIndex}
          className={`command-menu__item ${index === selectedIndex ? "is-selected" : ""}`}
          key={command.id}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(command)}
        >
          <span className="command-menu__icon" aria-hidden="true">{command.icon}</span>
          <span className="command-menu__copy">
            <strong>{command.label}</strong>
            <small>{command.description}</small>
          </span>
          <kbd>{command.aliases[0]}</kbd>
        </button>
      ))}
    </div>
  );
}
