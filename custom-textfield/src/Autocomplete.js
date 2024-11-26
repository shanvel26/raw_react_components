import React from 'react';
import { useAutocomplete } from './useAutocomplete';
import './Autocomplete.css';

function Autocomplete({ options }) {
  const {
    inputValue,
    filteredOptions,
    isOpen,
    selectedOptions,
    focusedOptionIndex,
    listboxRef,
    inputRef,
    menuPosition,
    handleInputChange,
    handleOptionSelect,
    handleInputFocus,
    handleInputBlur,
    handleRemoveOption,
    handleKeyDown,
  } = useAutocomplete(options);

  return (
    <div className="autocomplete-root">
      <div className="autocomplete-input-wrapper">
        {selectedOptions.map((option, index) => (
          <div key={index} className="autocomplete-tag">
            <span>{option.title}</span>
            <button type="button" onClick={() => handleRemoveOption(index)}>
              x
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="autocomplete-input"
          placeholder="Search..."
          ref={inputRef}
        />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul
          className={`autocomplete-listbox ${menuPosition}`}
          ref={listboxRef}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option.title}
              className={`autocomplete-option ${index === focusedOptionIndex ? 'focused' : ''
                }`}
              onMouseDown={() => handleOptionSelect(option)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
