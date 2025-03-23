import React from 'react';
import { useTranslation } from 'react-i18next';

export type TextType = 'paragraph' | 'heading' | 'list';

interface TextTypeSelectorProps {
  selectedType: TextType;
  onChange: (type: TextType) => void;
}

const TextTypeSelector: React.FC<TextTypeSelectorProps> = ({ 
  selectedType, 
  onChange 
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const options: { value: TextType; label: string }[] = [
    { value: 'paragraph', label: t('textTypes.paragraph', 'Paragraph') },
    { value: 'heading', label: t('textTypes.heading', 'Heading') },
    { value: 'list', label: t('textTypes.list', 'List') }
  ];

  // For RTL, we need to reverse the order of the options
  const displayOptions = isRtl ? [...options].reverse() : options;

  return (
    <div 
      id="text-type-selector" 
      className="text-type-selector" 
      role="tablist"
      data-active={selectedType}
    >
      {displayOptions.map((option) => (
        <button
          key={option.value}
          id={`text-type-${option.value}`}
          role="tab"
          aria-selected={selectedType === option.value}
          className={`text-type-button ${selectedType === option.value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TextTypeSelector; 