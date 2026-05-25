// useAutoScrollCarousel.js
import { useEffect, useRef } from "react";

export function useAutoScrollCarousel({
  enabled = true,
  delay = 4000,
  itemCount,
  onIndexChange,
  pauseSignal, // modal open, hover, click, etc.
  maxLoops = null, // future enhancement
}) {
  const indexRef = useRef(0);
  const loopRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!enabled || pauseSignal) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;

      if (indexRef.current >= itemCount) {
        indexRef.current = 0;
        loopRef.current += 1;

        if (maxLoops !== null && loopRef.current >= maxLoops) {
          clearInterval(intervalRef.current);
          return;
        }
      }

      onIndexChange(indexRef.current);
    }, delay);

    return () => clearInterval(intervalRef.current);
  }, [enabled, delay, itemCount, pauseSignal, maxLoops, onIndexChange]);
}
