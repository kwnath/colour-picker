import type { Coordinate } from '@components/Interaction/InteractionLayer';

/** Checks if this is a touch event */
export const isTouch = (e: MouseEvent | TouchEvent): e is TouchEvent =>
  'touches' in e;

/**
 *
 * Clamp between the bounding box
 * @param number
 * @param min
 * @param max
 */
const clamp = (number: number, min = 0, max = 1): number => {
  return number > max ? max : number < min ? min : number;
};

export interface DimensionObject {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}

export const getBoundingRect = (node: HTMLElement): DimensionObject => {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: rect.x ?? rect.top,
    left: rect.y ?? rect.left,
    x: rect.x ?? rect.left,
    y: rect.y ?? rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
};

/**
 *
 * Returns the relative position from the bounding box
 * @param node - html element (bounding box)
 * @param event - event from dom
 */
export const getRelativePosition = (
  node: HTMLDivElement,
  event: MouseEvent | TouchEvent,
): Coordinate => {
  const { left, width, top, height } = node.getBoundingClientRect();
  const { pageX, pageY } = isTouch(event)
    ? event.touches[0]
    : (event as MouseEvent);

  return [
    clamp((pageX - (left + window.pageXOffset)) / width),
    clamp((pageY - (top + window.pageYOffset)) / height),
  ];
};
