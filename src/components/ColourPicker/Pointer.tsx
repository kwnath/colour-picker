import type { SizeType } from 'src/types';
import tw, { css, styled } from 'twin.macro';

interface PointerProps {
  size?: SizeType;
  coordinates?: [x: number, y: number];
}

/**
 * Make more reusable
 */
export const POINTER_RADIUS = 8;

/**
 * Uses the gpu for transformations.
 */
export const Pointer = styled.div<PointerProps>`
  ${tw`transform-gpu h-4 w-4 absolute rounded-full bg-transparent border-2 border-white shadow`}
`;
