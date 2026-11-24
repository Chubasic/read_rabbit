import { useCallback, useEffect, useState } from "preact/hooks";
import { useDebounce } from "../../../hooks/useDebounce";
import { invoke } from "@tauri-apps/api/core";

export default function useBookContext(bookId: string): [() => void, () => void, number] {
  const [pageNum, setPage] = useState(1);
  const debouncedLastPage = useDebounce(pageNum, 10000)

  useEffect(() => {
    setPage(1)
  }, [bookId])

  const prevPage = useCallback(
    () => setPage(pageNum - 1),
    [setPage, pageNum],
  );
  const nextPage = useCallback(
    () => setPage(pageNum + 1),
    [setPage, pageNum],
  );

  useEffect(() => {
    invoke('set_last_page', {
      patch: {
        id: bookId,
        last_page: debouncedLastPage,
      }
    });
  }, [debouncedLastPage]);

  return [prevPage, nextPage, pageNum]
}
