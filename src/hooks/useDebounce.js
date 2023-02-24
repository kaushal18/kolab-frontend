import { useCallback, useState } from "react";

/**
 * Debounce a function by time
 * @param {Function} func
 * @param {Number} delay
 */

export default function useDebounce(
  func,
  delay
) {
  const [id, setId] = useState(null);

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
