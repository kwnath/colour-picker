import { DimensionObject, getBoundingRect } from '@utils/dom';
import { useState, useCallback, useLayoutEffect } from 'react';

export interface UseDimensionsArgs {
  liveMeasure?: boolean;
}
type UseDimensionsHook = [
  (node: HTMLElement) => void,
  undefined | DimensionObject,
  HTMLElement | undefined,
];

function useDimensions({
  liveMeasure = true,
}: UseDimensionsArgs = {}): UseDimensionsHook {
  const [dimensions, setDimensions] = useState<DimensionObject | undefined>(
    undefined,
  );
  const [node, setNode] = useState<HTMLElement>();

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getBoundingRect(node)),
        );
      measure();

      if (liveMeasure) {
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);

        return () => {
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', measure);
        };
      }
    }
  }, [node]);

  return [ref, dimensions, node];
}

export default useDimensions;
