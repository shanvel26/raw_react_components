import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Autocomplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef(null);

  // Dummy data for suggestions
  const allSuggestions = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Mango'];

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter suggestions based on the input value
    const filteredSuggestions = allSuggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    setSuggestions(filteredSuggestions);
    setFocusedIndex(-1);
    setShowClearButton(value.trim() !== '');
  };

  const handleItemClick = (item) => {
    setSearchTerm(item);
    setSuggestions([]);
    setShowClearButton(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === 'Enter' && focusedIndex !== -1) {
      event.preventDefault();
      handleItemClick(suggestions[focusedIndex]);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'ArrowDown' && suggestions.length > 0) {
      event.preventDefault();
      inputRef.current.blur();
      setFocusedIndex(0);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setFocusedIndex(-1);
    setShowClearButton(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    const handleKeyDownEvent = (event) => {
      if (event.key === 'Escape') {
        setSuggestions([]);
      }
    };

    window.addEventListener('keydown', handleKeyDownEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, []);

  return (
    <div className="autocomplete">
      <div className="input-container">
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for fruits..."
        />
        {showClearButton && (
          <button className="clear-button" onClick={handleClear}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className={focusedIndex === index ? 'focused' : ''}
            >
              {highlightMatch(item, searchTerm)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Function to highlight matching characters
const highlightMatch = (item, searchTerm) => {
  const lowerCaseItem = item.toLowerCase();
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const index = lowerCaseItem.indexOf(lowerCaseSearchTerm);

  if (index === -1) {
    return item;
  }

  return (
    <>
      {item.substring(0, index)}
      <strong>{item.substring(index, index + searchTerm.length)}</strong>
      {item.substring(index + searchTerm.length)}
    </>
  );
};

export default Autocomplete;
