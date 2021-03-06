import { useRef, useEffect, useCallback } from 'react';

/**
 *
 * Save the handler function to prevent re-renders
 */
function useEventCallback<T>(handler?: (value: T) => void): (value: T) => void {
  const callbackRef = useRef(handler);

  useEffect(() => {
    callbackRef.current = handler;
  });

  return useCallback(
    (value: T) => callbackRef.current && callbackRef.current(value),
    [],
  );
}

export { useEventCallback };
