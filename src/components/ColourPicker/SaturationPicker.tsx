import tw, { styled } from 'twin.macro';
import React, { useEffect, useMemo, useState } from 'react';
import { InteractiveLayer } from '../Interaction/InteractionLayer';
import useDimensions from '@hooks/useDimensions';
import { Pointer, POINTER_RADIUS } from './Pointer';
import { hslToHex, HsvaColour, hsvaToHslString } from '@utils/colours';

interface SaturationPickerProps {
  /**
   * Used for deciding what the saturation gradient is like
   */
  hue: number;
  onChange: (hsva: HsvaColour) => void;
}

/**
 * Saturation container for displaying the colours
 */
const SaturationContainer = styled.div(
  ({ baseColour }: { baseColour: string }) => [
    tw`relative rounded-md border border-gray-300`,
    `background-color: ${baseColour};`,
    `background-image: linear-gradient(0deg,#000,transparent),
    linear-gradient(90deg,#fff,hsla(0,0%,100%,0))`,
  ],
);

export const SaturationPicker: React.FC<SaturationPickerProps> = ({
  hue = 0,
  onChange,
}) => {
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [hsva, setHsva] = useState<HsvaColour>({
    h: hue,
    s: 50,
    v: 100,
    a: 1,
  });
  const [ref, dimensions] = useDimensions();

  const hex = useMemo(() => hslToHex({ h: hue }), [hue]);

  useEffect(() => {
    const hsvaVals = {
      h: hue,
      s: coordinates[0] * 100,
      v: (1 - coordinates[1]) * 100,
      a: 1,
    };
    setHsva(hsvaVals);
    onChange && onChange(hsvaVals);
  }, [coordinates[0], coordinates[1], hue]);

  return (
    <SaturationContainer ref={ref} baseColour={hex}>
      <InteractiveLayer onMove={setCoordinates}>
        {dimensions && (
          <Pointer
            size="sm"
            style={{
              backgroundColor: `${hsvaToHslString(hsva)}`,
              transform: `translate(${
                coordinates[0] * dimensions.width - POINTER_RADIUS
              }px, ${coordinates[1] * dimensions.height - POINTER_RADIUS}px)`,
            }}
          />
        )}
      </InteractiveLayer>
    </SaturationContainer>
  );
};
