import { useCallback, useEffect, useState } from "preact/hooks";
import useDebounce from "../../../hooks/useDebounce.ts";
import { saveLastPage } from "../api/index.ts";

export default function useBookContext(bookId: string): [() => void, () => void, number, number, (pages: number) => void] {
  const [currentPage, setPage] = useState(1);
  const [totalPages, setPages] = useState(1);
  const debouncedLastPage = useDebounce(currentPage, 10000)

  useEffect(() => {
    setPage(1)
  }, [bookId])

  const setTotalPages = useCallback((pages: number) => {
    console.log(pages)
    setPages(pages)
  }, [totalPages, setPages])

  const prevPage = useCallback(
    () => setPage(currentPage - 1),
    [setPage, currentPage, totalPages],
  );
  const nextPage = useCallback(
    () => setPage(currentPage + 1),
    [setPage, currentPage, totalPages],
  );

  useEffect(() => {
    saveLastPage(bookId, debouncedLastPage)
  }, [debouncedLastPage]);

  return [prevPage, nextPage, currentPage, totalPages, setTotalPages]
}
