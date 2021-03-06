import { InteractiveLayer } from '@components/Interaction/InteractionLayer';
import useDimensions from '@hooks/useDimensions';
import { getHueByPercentage, hslToHex } from '@utils/colours';
import React, { useEffect, useState } from 'react';
import tw, { css, styled } from 'twin.macro';
import { Pointer, POINTER_RADIUS } from './Pointer';

export const HueContainer = styled.div(() => [
  tw`rounded-md border border-gray-200`,
  css`
    position: relative;
    height: 100%;
    width: 26px;
    background: linear-gradient(
      red 0,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      red
    );
  `,
]);

interface HuePickerProps {
  /**
   * Hue is returned instead of hex so it's more reusable with other components.
   */
  onChange: (hue: number) => void;
  /**
   * Default hue
   */
  defaultHue?: number;
}

export const HuePicker: React.FC<HuePickerProps> = ({
  onChange,
  defaultHue = 0,
}) => {
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [ref, dimensions] = useDimensions();
  const [hexColour, setHex] = useState(
    hslToHex({
      h: defaultHue,
      s: 100,
      l: 50,
    }),
  );

  /** Ideally you'd put this in a debounce or throttle for performance */
  useEffect(() => {
    const hue = getHueByPercentage(coordinates[1]);
    setHex(
      hslToHex({
        h: hue,
        s: 100,
        /** https://www.w3schools.com/colors/colors_hsl.asp
         * 50% should be the default */
        l: 50,
      }),
    );
    onChange && onChange(hue);
  }, [coordinates]);

  return (
    <HueContainer ref={ref}>
      <InteractiveLayer onMove={setCoordinates}>
        {dimensions && (
          <Pointer
            size="sm"
            style={{
              backgroundColor: `${hexColour}`,
              transform: `translate(${
                /**
                 * Move pointer to the middle of the container
                 * -1 comes from the pointer border
                 *
                 */
                dimensions.width / 2 - POINTER_RADIUS - 1
              }px, ${coordinates[1] * dimensions.height - POINTER_RADIUS}px)`,
            }}
          />
        )}
      </InteractiveLayer>
    </HueContainer>
  );
};
