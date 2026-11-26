import { createContext } from "preact";
import { useContext, useState, useCallback, useEffect } from "preact/hooks";
import { saveLastPage } from "../api/index.ts";
import useDebounce from "../../../hooks/useDebounce.ts";

type BookContextType = {
  currentPage: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  setTotalPages: (pages: number) => void;
};

const BookContext = createContext<BookContextType | null>(null);

export function BookProvider({ bookId, children }: { bookId: string; children: any }) {
  const [currentPage, setPage] = useState(1);
  const [totalPages, setPages] = useState(1);
  const debouncedLastPage = useDebounce(currentPage, 10000);

  const setTotalPages = useCallback((pages: number) => {
    setPages(pages);
  }, []);

  const prevPage = useCallback(() => {
    setPage(page => Math.max(1, page - 1));
  }, []);

  const nextPage = useCallback(() => {
    setPage(page => Math.min(totalPages, page + 1));
  }, [totalPages]);

  useEffect(() => {
    saveLastPage(bookId, debouncedLastPage);
  }, [debouncedLastPage, bookId]);

  return (
    <BookContext.Provider value={{ currentPage, totalPages, prevPage, nextPage, setTotalPages }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBookContext must be used within BookProvider");
  return context;
}
