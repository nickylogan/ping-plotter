import { useEffect, useRef } from 'react';
import { noop } from '../utils';

export const useInterval = (callback: noop, delay: number) => {
  const savedCallback = useRef<noop>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};