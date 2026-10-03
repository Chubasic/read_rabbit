import { FunctionalComponent } from 'preact';
import { useCallback } from 'preact/hooks';

/**
 * A reusable, controlled input component.
 *
 * Props follow the “type over interfaces” rule from AGENTS.md – they are
 * declared as a plain `type` instead of an `interface`.
 */
export type Props = {
  /** The input type. Defaults to "text". */
  type?: string;
  /** The controlled value of the input. */
  value?: string;
  /** Placeholder text shown when the value is empty. */
  placeholder?: string;
  /** Disables the input if true. */
  disabled?: boolean;
  /** Change event handler. */
  onChange?: (e: Event) => void;
  /** Key‑down event handler. */
  onKeyDown?: (e: KeyboardEvent) => void;
};

export const Input: FunctionalComponent<Props> = ({
  type = 'text',
  value = '',
  placeholder = '',
  disabled = false,
  onChange,
  onKeyDown,
  ref,
}) => {
  const handleChange = useCallback(
    (e: Event) => {
      if (onChange) onChange(e);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (onKeyDown) onKeyDown(e);
    },
    [onKeyDown]
  );

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={ref}
      class="mr-1.25 rounded-lg border border-transparent px-3 py-2 text-base font-medium bg-surface-light dark:bg-surface-dark shadow-button outline-none"
    />
  );
};
