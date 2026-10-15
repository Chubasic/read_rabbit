import type { ComponentChildren, HTMLAttributes, Signalish } from "preact";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    type?: Signalish<"submit" | "reset" | "button" | undefined>;
    className?: string;
    onClick?: (e: Event) => void;
    disabled?: boolean
  children: ComponentChildren;
}

function Button({type = "button", className, children: text, onClick, disabled, ...rest}: ButtonProps) {
    return (
      <button
        {...rest}
        disabled={disabled}
        class={`rounded-xl px-6 py-3 m-2 text-base font-extrabold dark:bg-surface-dark light:bg-surface-light
            shadow-[inset_2px_2px_10px_var(--accent)]
            transition-[transform,shadow] duration-200 cursor-pointer
            hover:border-(--accent)
            border-transparent
            border
            active:translate-y-1 ${className || ""}`}
        type={type}
        onClick={onClick}>
        {text}
      </button>
    );
}

export default Button;
