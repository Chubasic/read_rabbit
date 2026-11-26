import { useBookContext } from '../hooks/useBookContext';
import { useKeyPress } from '../hooks/useKeyPress';
import useWindowClose from '../../../hooks/useWindowClose';
import { saveLastPage } from '../api';

type ReaderControlsProps = {
  bookId: string;
  children: React.ReactNode;
};

export default function ReaderControls({ bookId, children }: ReaderControlsProps) {
  const [prevPage, nextPage, currentPage] = useBookContext(bookId);

  // Keyboard navigation
  useKeyPress('ArrowRight', nextPage);
  useKeyPress('ArrowLeft', prevPage);

  // Save last page on window close
  useWindowClose(
    async () => saveLastPage(bookId, currentPage),
    [bookId, currentPage]
  );

  return <>{children}</>;
}
