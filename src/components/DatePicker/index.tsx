import { useState, useEffect } from "preact/hooks";
import { OnOutputFn } from "../ComponentsBuilder/types.ts";


type DatePickerProps = {
  onOutput: OnOutputFn
  label?: string;
  date?: string;
};

export default function DatePicker({ label = "Pick a date", onOutput, date: inputDate }: DatePickerProps) {
  const [value, setValue] = useState(inputDate ?? new Date().toISOString().split("T")[0]);

  useEffect(() => {
    onOutput({ name: "date", value });
    return () => { };
  }, [value]); // emit initial value on mount

  useEffect(() => {
    if (inputDate) setValue(inputDate);
    return () => { };
  }, [inputDate]);

  return (
    <div>
      <label className="text-xs font-medium text-neutral-500 flex items-center gap-1 mb-1">
        {/*<Calendar size={12} /> add comnents*/}
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(event) => {
          const element = event?.target as HTMLInputElement
          setValue(element.value);
          onOutput({ name: "date", value: element.value });
        }}
        className="w-full border border-neutral-300 rounded-md px-2 py-1.5 text-sm"
      />
    </div>
  );
}
