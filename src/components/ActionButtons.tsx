import React from 'react';
import { useTranslation } from 'react-i18next';

interface ActionButtonsProps {
  onGenerate: () => void;
  onAddToCanvas: () => void;
  isGenerating?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGenerate,
  onAddToCanvas,
  isGenerating = false
}) => {
  const { t } = useTranslation();

  return (
    <div id="action-buttons" className="action-buttons">
      <div className="action-buttons-inner">
        <button
          id="generate-new-btn"
          className="generate-button"
          onClick={onGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate New'}
        </button>
        <button
          id="add-to-canvas-btn"
          className="add-to-canvas-button"
          onClick={onAddToCanvas}
        >
          Add to canvas
        </button>
      </div>
    </div>
  );
};

export default ActionButtons; 