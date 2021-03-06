import { HuePicker } from './HuePicker';
import React, { useEffect, useState } from 'react';
import { SaturationPicker } from './SaturationPicker';
import { hsvaToHex } from '@utils/colours';

interface ColourPickerProps {
  /**
   * Returns the hex value of the colour picked
   */
  onChange?: (hex: string) => void;
}

export const ColourPicker: React.FC<ColourPickerProps> = ({ onChange }) => {
  const [hue, setHue] = useState(0);
  const [hexColour, setHexColour] = useState('');

  useEffect(() => {
    onChange && onChange(hexColour);
  }, [hexColour, hue, onChange]);
  return (
    /**
     * Ideally you would make this fit the outer container or have predefined sizes
     */
    <div
      className="grid grid-flow-col gap-5 h-32 w-64"
      style={{
        gridAutoColumns: '1fr min-content',
      }}
    >
      <SaturationPicker
        hue={hue}
        onChange={(hsva) => setHexColour(hsvaToHex(hsva))}
      />
      <HuePicker onChange={setHue} />
    </div>
  );
};
