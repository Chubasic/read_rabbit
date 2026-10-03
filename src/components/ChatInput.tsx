import { FunctionalComponent } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { Input } from './Input.tsx';
import Button from './Button.tsx';

/**
 * Chat‑style input used for typing prompts or commands.
 */
export type Props = {
  /** Callback invoked with the submitted value. */
  onSubmit: (value: string) => void;
};

export const ChatInput: FunctionalComponent<Props> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleChange = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement;
    setText(target.value);
  }, []);

  const submit = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed !== '') {
      onSubmit(trimmed);
      setText('');
    }
  }, [text, onSubmit]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }, [submit]);

  return (
    <div class="flex items-center space-x-2">
      <Input
        type="text"
        value={text}
        placeholder="Type a prompt…"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        onClick={submit}
        className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark"
      >
        Send
      </Button>
    </div>
  );
};
