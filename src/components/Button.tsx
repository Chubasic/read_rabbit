import { Signalish } from "preact";

type ButtonProps = {
    type: Signalish<"submit" | "reset" | "button" | undefined>;
    children: string;
};

function Button({type, children: text}: ButtonProps) {
    return (
      <button 
        class="rounded-lg border border-transparent px-4 py-3 text-base font-medium bg-surface-light dark:bg-surface-dark shadow-button transition-colors duration-250 cursor-pointer hover:border-[#396cd8] active:border-[#396cd8] active:bg-[#e8e8e8] dark:active:bg-[#0f0f0f69] outline-none" 
        type={type}
      >
        {text}
      </button>
    );
}

export default Button;
