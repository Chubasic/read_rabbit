import { useEffect, useState } from "preact/hooks"


export default function useDebounce<V>(value: V, time: number): V {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value),
      time)
    return () => clearTimeout(timeout);
  }, [time, value])

  return debounced;
}
