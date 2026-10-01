import type { ComponentChildren, FunctionComponent } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";
import styles from "./styles.module.css";

interface Props {
	state: boolean;
	children: ComponentChildren;
}

const Reader: FunctionComponent<Props> = ({ state, children }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		if (state) {
			ref.current?.classList.add(styles.active);
		} else {
			ref.current?.classList.remove(styles.active);
		}
		return () => {};
	}, [state]);
	return (
		<div className={styles["reader-lense"]} ref={ref}>
			{children}
		</div>
	);
};

export default Reader;
