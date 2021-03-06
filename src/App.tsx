import React, { useState } from 'react';
import './App.css';
import 'tailwindcss/dist/base.css';
import { ColourPicker } from './components/ColourPicker/ColourPicker';
import 'tailwindcss/dist/tailwind.css';
import { SubText } from '@components/Text/Text';

interface AppProps {}

function App({}: AppProps) {
  const [hex, setHex] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <div>hello</div>
        <ColourPicker onChange={setHex} />
        <div className="block mt-3 px-2 text-left">
          <SubText className="font-medium inline-block mr-3">HEX</SubText>
          {/* Fixed width so when hex values change they don't change the width of the "input" */}
          <div className="inline-block py-2 text-center border rounded border-gray-300 w-24">
            {hex}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
