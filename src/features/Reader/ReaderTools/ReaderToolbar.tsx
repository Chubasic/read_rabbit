// import type { Dispatch, StateUpdater } from "preact/hooks";
import { ComponentChildren } from "preact";
import Button from "../../../components/Button.tsx";
import Icon2 from "../../../components/icons/Icon2.tsx";
import Icon1 from "../../../components/icons/Icon1.tsx";

type Props = {
  // toggle: Dispatch<StateUpdater<boolean>>;
  children: ComponentChildren;
};

const ReaderToolobar = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-4xl p-2 m-4 backdrop-blur-2xl dark:bg-surface-dark/45 light:bg-surface-dark/15 border-stone-300 border shadow-[inset_2px_1px_6px_var(--accent)]">
      {children}
      <Button
        type="button"
        className="m-2 rounded-full"
        onClick={() => {
          // readerToggle((prevState) => !prevState)
        }}
      >
        <Icon1 />
      </Button>

      <Button type="button" className="m-2 rounded-full">
        {/** biome-ignore lint/a11y/noSvgWithoutTitle: Well I dont want to deal with it rn */}
        <Icon2 />
      </Button>
    </div>
  );
};
export default ReaderToolobar;
