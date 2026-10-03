import { FunctionalComponent } from "preact";
import { useState, useEffect, useRef, useCallback } from "preact/hooks";
import { Input } from "./Input.tsx";

/**
 * Representation of a command that can be invoked from the CommandInput.
 * The `label` is what the user sees and matches on.
 * The `action` is called when the command is selected.
 */
export type Command = {
  label: string;
  action: () => void;
};

/**
 * Props for the CommandInput component.
 */
export type Props = {
  /** List of available commands. */
  commands: Command[];
  /** Optional placeholder text. */
  placeholder?: string;
};

/**
 * LMAO. This looks like it is a component, but it's actually does not work at all
 */


/**
 * A lightweight command palette like input.
 * Shows suggestions as the user types and allows selecting via mouse or
 * arrow keys.
 */
export const CommandInput: FunctionalComponent<Props> = ({
  commands,
  placeholder = "Enter command…",
}) => {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<Command[]>([]);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update filtered list whenever the input changes.
  useEffect(() => {
    const f = commands.filter((c) =>
      c.label.toLowerCase().startsWith(input.toLowerCase())
    );
    setFiltered(f);
    setOpen(f.length > 0);
    setHighlightedIndex(0);
  }, [input, commands]);

  const executeCommand = useCallback((cmd: Command) => {
    setInput("");
    setOpen(false);
    cmd.action();
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (!open) return;

    if (e.key === "ArrowDown") {

      setHighlightedIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {

      setHighlightedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {

      const cmd = filtered[highlightedIndex];
      if (cmd) executeCommand(cmd);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setInput(target.value);
  };

  const handleClickSuggestion = (cmd: Command) => {
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div class="relative w-full max-w-md" ref={containerRef}>
      <Input
        type="text"
        value={input}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      {open && (
        <ul
          class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200 dark:border-gray-700"
        >
          {filtered.map((cmd, idx) => (
            <li
              key={cmd.label}
              class={`px-3 py-2 cursor-pointer
                ${idx === highlightedIndex ? "dark:bg-gray-800 dark:border-gray-700" : ""}`}
              onClick={() => handleClickSuggestion(cmd)}
            >
              {cmd.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
