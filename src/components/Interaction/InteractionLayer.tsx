/**
 * The layer for capturing click and drag events
 *
 * We want this to be bound to the parent container.
 */

import { useEventCallback } from '@hooks/useEventCallback';
import { getRelativePosition, isTouch } from '@utils/dom';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

export type Coordinate = [number, number];

interface InteractionLayerProps {
  onMove: (coordinates: Coordinate) => void;
  children: React.ReactNode;
  className?: string;
}

export const InteractiveLayer: React.FC<InteractionLayerProps> = memo(
  ({ onMove, className, children }) => {
    const interactionContainer = useRef<HTMLDivElement>(null);
    const hasTouched = useRef(false);
    const [isDragging, setDragging] = useState(false);

    const onMoveEvent = useEventCallback(onMove);

    const isValid = (event: MouseEvent | TouchEvent): boolean => {
      if (hasTouched.current && !isTouch(event)) return false;
      if (!hasTouched.current) hasTouched.current = isTouch(event);
      return true;
    };

    const handleMove = useCallback(
      (event: MouseEvent | TouchEvent) => {
        event.preventDefault();

        const isDown = isTouch(event)
          ? event.touches.length > 0
          : event.buttons > 0;

        if (isDown && interactionContainer.current) {
          onMoveEvent(getRelativePosition(interactionContainer.current, event));
        } else {
          setDragging(false);
        }
      },
      [onMoveEvent],
    );

    const handleMoveStart = useCallback(
      ({ nativeEvent: event }: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();

        if (!isValid(event)) return;

        onMoveEvent(getRelativePosition(interactionContainer.current!, event));
        setDragging(true);
      },
      [onMoveEvent],
    );

    const handleMoveEnd = useCallback(() => setDragging(false), []);
    const toggleDocumentEvents = useCallback(
      (state) => {
        const toggleEvent =
          (state && window.addEventListener) || window.removeEventListener;
        toggleEvent(hasTouched.current ? 'touchmove' : 'mousemove', handleMove);
        toggleEvent(hasTouched.current ? 'touchend' : 'mouseup', handleMoveEnd);
      },
      [handleMove, handleMoveEnd],
    );

    useEffect(() => {
      toggleDocumentEvents(isDragging);
      return () => {
        isDragging && toggleDocumentEvents(false);
      };
    }, [isDragging, toggleDocumentEvents]);

    return (
      <div
        className={`${className} w-full h-full absolute left-0 top-0 outline-none`}
        ref={interactionContainer}
        onMouseDown={handleMoveStart}
      >
        {children}
      </div>
    );
  },
);
