import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Keep the type for backward compatibility, but we'll only use lineCount
export type LengthControlType = 'paragraphLength' | 'lineCount';

// Add a new type for the label display
export type LabelType = 'lines' | 'words' | 'items';

interface LengthControlProps {
  value: number;
  onChange: (value: number) => void;
  onTypeChange?: (type: LengthControlType) => void; // Make optional since we won't use it
  type?: LengthControlType; // Make optional since we'll always use lineCount
  min?: number;
  max?: number;
  step?: number;
  labelType?: LabelType; // New prop to control the label display
}

// Simple translation helper for the new labels
const getTranslation = (key: string, language: string): string => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      'wordCount': 'Word Count',
      'itemCount': 'Item Count',
      'lineCount': 'Line Count',
      'current': 'Current',
      'target': 'Target',
      'words': 'words',
      'items': 'items',
      'lines': 'lines'
    },
    ar: {
      'wordCount': 'عدد الكلمات',
      'itemCount': 'عدد العناصر',
      'lineCount': 'عدد الأسطر',
      'current': 'الحالي',
      'target': 'الهدف',
      'words': 'كلمات',
      'items': 'عناصر',
      'lines': 'أسطر'
    }
  };

  // Default to English if language not found
  const langTranslations = translations[language] || translations.en;
  return langTranslations[key] || key;
};

const LengthControl: React.FC<LengthControlProps> = ({
  value,
  onChange,
  onTypeChange,
  type = 'lineCount', // Default to lineCount
  min = 1,
  max = 20,
  step = 1,
  labelType = 'lines' // Default to lines
}) => {
  const { t, i18n } = useTranslation();
  const [currentValue, setCurrentValue] = useState(value);
  const currentLanguage = i18n.language;
  const sliderRef = useRef<HTMLInputElement>(null);

  // Update internal state when external value changes
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // Update slider progress fill when value changes
  useEffect(() => {
    updateSliderFill();
  }, [currentValue, max]);

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setCurrentValue(newValue);
    onChange(newValue);
  };

  // Update the slider's progress fill
  const updateSliderFill = () => {
    if (sliderRef.current) {
      const percent = ((currentValue - min) / (max - min)) * 100;
      sliderRef.current.style.setProperty('--slider-fill', `${percent}%`);
    }
  };

  // Get the appropriate label based on labelType
  const getLabelText = () => {
    switch (labelType) {
      case 'words':
        return getTranslation('wordCount', currentLanguage);
      case 'items':
        return getTranslation('itemCount', currentLanguage);
      case 'lines':
      default:
        return getTranslation('lineCount', currentLanguage);
    }
  };

  // Get the appropriate current value text
  const getCurrentValueText = () => {
    const label = labelType === 'words' ? getTranslation('words', currentLanguage) : 
                 labelType === 'items' ? getTranslation('items', currentLanguage) : 
                 getTranslation('lines', currentLanguage);
    return `${getTranslation('current', currentLanguage)}: ${currentValue} ${label}`;
  };

  // Get the appropriate target value text
  const getTargetValueText = () => {
    const label = labelType === 'words' ? getTranslation('words', currentLanguage) : 
                 labelType === 'items' ? getTranslation('items', currentLanguage) : 
                 getTranslation('lines', currentLanguage);
    return `${getTranslation('target', currentLanguage)}: ${max} ${label}`;
  };

  return (
    <div className="length-control">
      {/* Length Control Label */}
      <div className="length-control-label">
        <span className="length-control-title">{getLabelText()}</span>
      </div>

      {/* Slider control */}
      <div className="length-control-slider-container">
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleSliderChange}
          className="length-control-slider"
          aria-label={getLabelText()}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          style={{
            '--slider-fill': `${((currentValue - min) / (max - min)) * 100}%`
          } as React.CSSProperties}
        />
        <div className="length-control-values">
          <span className="length-control-current">{getCurrentValueText()}</span>
          <span className="length-control-target">{getTargetValueText()}</span>
        </div>
      </div>
    </div>
  );
};

export default LengthControl; 