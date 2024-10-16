import React, { useState, useCallback, useRef, useEffect } from "react";
import { FieldInputProps } from "formik";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends FieldInputProps<string> {
  options: Option[];
  placeholder?: string;
  className?: string;
  label?: string;
  errorMessage?: string;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, className, label, errorMessage, ...field }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    field.onChange(field.name)(value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setSearchTerm("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const selectedOption = options.find((option) => option.value === field.value);

  return (
    <div className="flex flex-col h-[76px]" ref={selectRef}>
      {label && (
        <label htmlFor={field.name} className="text-sm font-medium">
          {label}
        </label>
      )}
      <div className={`relative ${className}`}>
        <button type="button" className="w-full h-10 px-3 py-2 text-left bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleToggle}>
          {selectedOption ? <span className="capitalize">{selectedOption.label}</span> : <span className="text-gray-400">{placeholder}</span>}
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            <div className="sticky top-0 p-2 bg-white border-b">
              <input ref={searchInputRef} type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} className="w-full p-2 border rounded" onClick={(e) => e.stopPropagation()} />
            </div>
            <ul className="py-1 overflow-auto max-h-60">
              {filteredOptions.map((option) => (
                <li key={option.value} className="px-3 py-2 cursor-pointer hover:bg-gray-100 capitalize" onClick={() => handleOptionClick(option.value)}>
                  {option.label}
                </li>
              ))}
              {filteredOptions.length === 0 && <li className="px-3 py-2 text-gray-500">No options found</li>}
            </ul>
          </div>
        )}
      </div>
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};

export default Select;
