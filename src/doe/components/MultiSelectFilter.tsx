
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Fix: Import missing icons from constants.tsx
import { ChevronDownIcon, CheckIcon, FilterIcon } from '../constants'; 

interface MultiSelectFilterProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onSelect: (selected: string[]) => void;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({ title, options, selectedOptions, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      onSelect(selectedOptions.filter(item => item !== option));
    } else {
      onSelect([...selectedOptions, option]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const buttonText = selectedOptions.length > 0 
    ? `${title} (${selectedOptions.length})` 
    : title;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <FilterIcon className="w-4 h-4 text-slate-400" /> {buttonText}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDownIcon className="w-4 h-4 text-slate-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full max-h-60 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-y-auto custom-scrollbar p-1"
            role="listbox"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleToggle(option)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-slate-50 rounded-md text-sm text-slate-700"
                role="option"
                aria-selected={selectedOptions.includes(option)}
              >
                <span>{option}</span>
                {selectedOptions.includes(option) && <CheckIcon className="w-4 h-4 text-primary-dark" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiSelectFilter;
