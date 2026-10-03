import type { ComponentChildren, FunctionComponent } from "preact";
import ReaderToolobar from "./ReaderToggleTools/ReaderToobar.tsx"

type Props = {
    children: ComponentChildren;
}

const Reader: FunctionComponent<Props> = ({ children }: Props) => {
    return (
      <div className="w-full">
        <ReaderToolobar />
        {children}
        </div>
    );
};

export default Reader;
