import type { TargetedEvent } from "preact";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "preact/hooks";
import type { OnOutputFn } from "../ComponentsBuilder/types.ts";


export type ValueInputProps = {
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "number";
  value: string;
  onOutput: OnOutputFn;
  onKeyDown?: (e: KeyboardEvent) => void;
}
export default function ValueInput({ label = "Input", type = "text", value, onOutput, onKeyDown, placeholder }: ValueInputProps) {

  const inputName = useMemo(() => nanoid(), []);


  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (onKeyDown) onKeyDown(e);
  }, [onKeyDown]);

  const handleChange = useCallback((event: TargetedEvent<HTMLInputElement, Event>) => {
    const element = event?.target as HTMLInputElement
    const newValue = element.value;


    // Emit the change through onOutput function
    onOutput({ name: "value", value: newValue });
  }, [onOutput])


  return (
    <div className="flex flex-col">
      {/* Common Labeling structure */}
      <label className="text-xs font-medium text-neutral-500 flex items-center gap-1 mb-1"
        htmlFor={inputName}
      >
        {/* <ArrowUp size={12} /> add comnents*/}
        {label}
      </label>
      <input
        name={inputName}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full mr-1.25 rounded-lg border border-transparent px-3 py-2 text-base font-medium bg-surface-light dark:bg-surface-dark shadow-button outline-none"
      />
    </div>
  );
}
