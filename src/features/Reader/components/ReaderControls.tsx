import type { ComponentChildren } from "preact";
import { useBookContext } from '../context/BookContext';
import useKeyPress from '../hooks/useKeyPress.ts';
import Button from "../../../components/Button.tsx";

type ReaderControlsProps = {
  children: ComponentChildren;
};

export default function ReaderControls({ children }: ReaderControlsProps) {
  const { currentPage, totalPages, prevPage, nextPage } = useBookContext();

  useKeyPress('ArrowRight', nextPage);
  useKeyPress('ArrowLeft', prevPage);

  return (
    <div class="flex flex-col items-center gap-2 w-full">
      <div class="flex items-center gap-3">
        <Button disabled={currentPage <= 1} onClick={prevPage}>
          Prev
        </Button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <Button disabled={currentPage >= totalPages} onClick={nextPage}>
          Next
        </Button>
      </div>
      <>{children}</>
    </div>
  );
}
