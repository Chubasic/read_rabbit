import { FunctionalComponent } from "preact";
import { useState, useCallback } from "preact/hooks";
import Button from "./Button.tsx";
import ValueInput from "./ValueInput/index.tsx";
import { OnOutputFnArgs } from "./ComponentsBuilder/types.ts";

/**
 * Chat‑style input used for typing prompts or commands.
 */
export type Props = {
  /** Callback invoked with the submitted value. */
  onSubmit: (value: string) => void;
};

export const ChatInput: FunctionalComponent<Props> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleChange = useCallback(({ value, name: _ }: OnOutputFnArgs) => {
    setText(value.toString());
  }, []);

  const submit = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed !== "") {
      onSubmit(trimmed);
      setText("");
    }
  }, [text, onSubmit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    },
    [submit],
  );

  return (
    <div class="flex items-center space-x-2">
      <ValueInput
        value={text}
        label=""
        placeholder="Type a prompt…"
        onOutput={handleChange}
        onKeyDown={handleKeyDown}
      />

      <Button
        onClick={submit}
        // className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark"
      >
        Send
      </Button>
    </div>
  );
};
