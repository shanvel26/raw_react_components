// src/TextField.js
import React, { useState } from 'react';
import './TextField.css';

const TextField = ({ label }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`textfield-container ${isFocused || value ? 'focused' : ''}`}>
      <label className="textfield-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="textfield-input"
      />
    </div>
  );
};

export default TextField;
