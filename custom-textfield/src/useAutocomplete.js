import { useState, useEffect, useRef } from 'react';

export function useAutocomplete(options) {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const [menuPosition, setMenuPosition] = useState('bottom');

  const inputRef = useRef(null);
  const listboxRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter(
      option =>
        option.title.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedOptions.includes(option)
    );
    setFilteredOptions(filtered);
  }, [inputValue, options, selectedOptions]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
    setIsOpen(true);
  };

  const handleOptionSelect = option => {
    setSelectedOptions([...selectedOptions, option]);
    setInputValue('');
    setIsOpen(false);
    setFocusedOptionIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    adjustMenuPosition();
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 100);
  };

  const handleRemoveOption = index => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(index, 1);
    setSelectedOptions(newSelectedOptions);
  };

  const handleKeyDown = event => {
    if (event.key === 'ArrowDown') {
      if (!isOpen) {
        setIsOpen(true);
        adjustMenuPosition();
      }
      setFocusedOptionIndex((prevIndex) =>
        prevIndex === filteredOptions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === 'ArrowUp' && isOpen) {
      setFocusedOptionIndex((prevIndex) =>
        prevIndex === 0 ? filteredOptions.length - 1 : prevIndex - 1
      );
    } else if (event.key === 'Enter' && focusedOptionIndex >= 0) {
      handleOptionSelect(filteredOptions[focusedOptionIndex]);
    }
  };

  const adjustMenuPosition = () => {
    const inputRect = inputRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const listboxHeight = listboxRef.current ? listboxRef.current.scrollHeight : 200;

    if (windowHeight - inputRect.bottom < listboxHeight) {
      setMenuPosition('top');
    } else {
      setMenuPosition('bottom');
    }
  };

  return {
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
  };
}
