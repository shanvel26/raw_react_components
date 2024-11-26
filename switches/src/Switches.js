import React, { useState } from 'react';
import './Switch.css';

const BasicSwitches = () => {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(true);
  const [checked4, setChecked4] = useState(false);

  const handleToggle = (setChecked, currentState) => {
    setChecked(!currentState);
  };

  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked1}
          onChange={() => handleToggle(setChecked1, checked1)}
          aria-label="Switch demo"
        />
        <span className="slider"></span>
      </label>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked2}
          onChange={() => handleToggle(setChecked2, checked2)}
          aria-label="Switch demo"
        />
        <span className="slider"></span>
      </label>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked3}
          disabled
          aria-label="Switch demo"
        />
        <span className="slider"></span>
      </label>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked4}
          disabled
          aria-label="Switch demo"
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default BasicSwitches;
