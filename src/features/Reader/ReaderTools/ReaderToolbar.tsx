// import type { Dispatch, StateUpdater } from "preact/hooks";
import { ComponentChildren } from "preact";
import Button from "../../../components/Button.tsx";
import Icon2 from "../../../components/icons/Icon2.tsx";
import Icon1  from "../../../components/icons/Icon1.tsx";

type Props = {
  // toggle: Dispatch<StateUpdater<boolean>>;
  children: ComponentChildren;
};

const ReaderToolobar = ({ children }: Props) => {
  return (
    <div className="rounded flex items-center justify-between border-b-2 border-(--gray-light)">
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
