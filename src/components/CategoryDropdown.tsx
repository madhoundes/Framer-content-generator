import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './ui/icon';

export type ContentCategory = 'technology' | 'business' | 'marketing' | 'science' | 'health';

interface CategoryDropdownProps {
  selectedCategory: ContentCategory;
  onChange: (category: ContentCategory) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onChange
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories: { value: ContentCategory; label: string }[] = [
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'science', label: 'Science' },
    { value: 'health', label: 'Health & Wellness' }
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleSelect = (category: ContentCategory) => {
    onChange(category);
    setIsOpen(false);
  };

  const getCategoryLabel = () => {
    const category = categories.find(c => c.value === selectedCategory);
    return category ? category.label : 'Select a category';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id="category-dropdown" className="category-dropdown" ref={dropdownRef}>
      <button
        id="category-dropdown-button"
        className="category-dropdown-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <span>{getCategoryLabel()}</span>
        <Icon 
          name={isOpen ? 'chevron-up' : 'chevron-down'} 
          size={16} 
          className="icon" 
        />
      </button>
      
      <div 
        id="category-dropdown-menu"
        className={`category-dropdown-menu ${isOpen ? 'open' : ''}`}
        role="listbox"
      >
        {categories.map((category) => (
          <button
            key={category.value}
            id={`category-${category.value}`}
            className="category-item"
            role="option"
            aria-selected={selectedCategory === category.value}
            onClick={() => handleSelect(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown; 