import { useCallback, useEffect, useState } from "preact/hooks";
import { useDebounce } from "../../../hooks/useDebounce";
import { invoke } from "@tauri-apps/api/core";

export default function useBookContext(): [() => void, () => void, number] {
  const [pageNum, setPageNum] = useState(1);
  const debouncedLastPage = useDebounce(1, 10000)

  const prevPage = useCallback(
    () => setPageNum(pageNum - 1),
    [setPageNum, pageNum],
  );
  const nextPage = useCallback(
    () => setPageNum(pageNum + 1),
    [setPageNum, pageNum],
  );

  useEffect(() => {
    invoke('set_last_page', {
      presaveBook: {
        // id: BookId,
        lastPage: debouncedLastPage,
      }
    });
  }, [debouncedLastPage]);

  return [prevPage, nextPage, pageNum]
}
