import React from 'react';

type IQSliderProps = {
  minIQ: number;
  setMinIQ: (value: number) => void;
};

const IQSlider: React.FC<IQSliderProps> = ({ minIQ, setMinIQ }) => (
  <div
    style={{
      position: 'absolute',
      top: 50,
      left: 10,
      zIndex: 10,
      background: 'rgba(255,255,255,0.95)',
      padding: '10px 18px',
      borderRadius: '6px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
    }}
  >
    <label style={{ fontWeight: 'bold', fontSize: 14 }}>
      最小IQ: {minIQ}
    </label>
    <input
      type="range"
      min={80}
      max={120}
      value={minIQ}
      onChange={e => setMinIQ(Number(e.target.value))}
      style={{ width: 180, marginLeft: 10 }}
    />
  </div>
);

export default IQSlider;
