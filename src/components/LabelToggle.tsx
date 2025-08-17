import React from "react";

type LabelToggleProps = {
  labelVisible: boolean;
  setLabelVisible: (v: boolean) => void;
};

const LabelToggle: React.FC<LabelToggleProps> = ({ labelVisible, setLabelVisible }) => (
  <div
    style={{
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 1,
      background: "rgba(255,255,255,0.8)",
      padding: "6px 12px",
      borderRadius: "4px",
    }}
  >
    <label>
      <input
        type="checkbox"
        checked={labelVisible}
        onChange={e => setLabelVisible(e.target.checked)}
      />
      ラベル表示
    </label>
  </div>
);

export default LabelToggle;
