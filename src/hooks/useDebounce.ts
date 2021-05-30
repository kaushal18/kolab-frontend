import { useCallback, useState } from "react";

/**
 * Debounce a function by time
 * @param {Function} func
 * @param {Number} delay
 */

export default function useDebounce(
  func: (...args: any[]) => void,
  delay: number
) {
  const [id, setId] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args) => {
      id && clearTimeout(id);
      setId(
        setTimeout(() => {
          func(...args);
        }, delay)
      );
    },
    [func, delay, id]
  );
}
