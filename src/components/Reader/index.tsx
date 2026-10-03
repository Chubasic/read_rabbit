import type { ComponentChildren, FunctionComponent } from "preact";

type Props = {
    state: boolean;
    children: ComponentChildren;
}

const Reader: FunctionComponent<Props> = ({ state, children }: Props) => {
    return (
        <div className={`${state ? "filter blur-[1.4px] text-black" : ""} mx-4`}>
            {children}
        </div>
    );
};

export default Reader;
