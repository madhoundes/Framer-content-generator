import React from 'react';
import { useTranslation } from 'react-i18next';

interface ParagraphLengthToggleProps {
  isLong: boolean;
  onChange: (isLong: boolean) => void;
  textType: 'paragraph' | 'heading' | 'list';
}

const ParagraphLengthToggle: React.FC<ParagraphLengthToggleProps> = ({
  isLong,
  onChange,
  textType
}) => {
  const { t } = useTranslation();

  const getLabelText = () => {
    switch (textType) {
      case 'paragraph':
        return t('paragraphLength');
      case 'heading':
        return t('headingLength');
      case 'list':
        return t('listItemsCount');
      default:
        return t('paragraphLength');
    }
  };

  return (
    <div id="paragraph-length-toggle" className="paragraph-length-toggle">
      <label className="toggle-switch">
        <input
          id="paragraph-length-input"
          type="checkbox"
          className="toggle-input"
          checked={isLong}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-slider"></span>
      </label>
      <span id="length-label" className="length-label">
        {getLabelText()}
      </span>
    </div>
  );
};

export default ParagraphLengthToggle; 