

import { useState } from 'react';
import MapView from './components/MapView';
import IQSlider from './components/IQSlider';

function App() {
  const [minIQ, setMinIQ] = useState(80);
  return (
    <>
      <IQSlider minIQ={minIQ} setMinIQ={setMinIQ} />
      <MapView minIQ={minIQ} />
    </>
  );
}

export default App;
