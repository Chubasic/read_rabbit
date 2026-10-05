import type { TargetedEvent } from "preact";
import { useCallback } from "preact/hooks";
import type { OnOutputFn } from "../ComponentsBuilder/types.ts";


type TextAreaProps = {
  /** Optional label for the field */
  label?: string;
  placeholder?: string;
  value: string;
  onOutput: OnOutputFn;
  onKeyDown?: (e: KeyboardEvent) => void;
}

export default function TextArea({
  label = "Text Area",
  placeholder = "Some text",
  value,
  onOutput,
  onKeyDown,
  }: TextAreaProps) {

  const handleChange = useCallback((event: TargetedEvent<HTMLTextAreaElement, Event>) => {
    const element = event?.target as HTMLInputElement
    const newValue = element.value;

    // Emit the change through onOutput function
    onOutput({ name: "value", value: newValue });
  }, [onOutput])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (onKeyDown) onKeyDown(event);
  }, [onKeyDown])

  return (
    <div className="flex flex-col">
      {/* Common Labeling structure */}
      <label className="text-xs font-medium text-neutral-500 flex items-center gap-1 mb-1">
        {/* <ArrowUp size={12} /> add comnents*/}
        {label}
      </label>
      <textarea
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full resize-y mr-1.25 rounded-lg border border-transparent px-3 py-2 text-base font-medium bg-surface-light dark:bg-surface-dark shadow-button outline-none"
        rows={4} // Sets a sensible default height for the textarea
      />
    </div>
  );
}
