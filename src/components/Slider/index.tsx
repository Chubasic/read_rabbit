import { useEffect, useState } from "preact/hooks";
import { OnOutputFn } from "../ComponentsBuilder/types.ts";


type SliderProps = {
  label?: string
  min?: number
  max?: number
  onOutput: OnOutputFn
}

export default function Slider({ label = "Value", min = 0, max = 100, onOutput }: SliderProps) {
  const [value, setValue] = useState(50);
  useEffect(() => { onOutput({ name: "value", value }); }, []);
  return (
    <div>
      <label className="text-xs font-medium text-neutral-500 flex items-center gap-1 mb-1">
        {/*<SlidersHorizontal size={12} />*/}
        {label}: {value}
      </label>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(event) => {
          const element = event?.target as HTMLInputElement
          const value = Number(element.value);
          setValue(value);
          onOutput({ name: "value", value });
        }}
        className="w-full"
      />
    </div>
  );
}
