import { useCallback, useEffect, useState } from "preact/hooks";
import { useDebounce } from "../../../hooks/useDebounce";
import { saveLastPage } from "../api";

export default function useBookContext(bookId: string): [() => void, () => void, number] {
  const [currentPage, setPage] = useState(1);
  const debouncedLastPage = useDebounce(currentPage, 10000)

  useEffect(() => {
    setPage(1)
  }, [bookId])

  const prevPage = useCallback(
    () => setPage(currentPage - 1),
    [setPage, currentPage],
  );
  const nextPage = useCallback(
    () => setPage(currentPage + 1),
    [setPage, currentPage],
  );

  useEffect(() => {
    saveLastPage(bookId, debouncedLastPage)
  }, [debouncedLastPage]);

  return [prevPage, nextPage, currentPage]
}
