import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface ContentSectionProps {
  onAddSvg: () => Promise<void>;
  selectionCount: number;
}

const ContentSection: React.FC<ContentSectionProps> = ({ onAddSvg, selectionCount }) => {
  const { t } = useTranslation();
  const layer = selectionCount === 1 ? "layer" : "layers";

  return (
    <div id="content-section" className="content-section p-6 bg-card rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 id="content-title" className="text-xl font-semibold mb-2">{t('app.description')}</h2>
        <p id="content-description" className="text-muted-foreground">
          {t('common.loading')} {selectionCount} {layer} selected.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div id="action-card-1" className="p-4 border rounded-md">
          <div className="flex items-center mb-3">
            <Icon name="image" id="image-icon" className="mr-2" />
            <h3 className="font-medium">Insert Logo</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Add a logo to your Framer project</p>
          <Button 
            id="insert-logo-btn"
            onClick={onAddSvg}
            className="w-full"
          >
            Insert Logo
          </Button>
        </div>
        
        <div id="action-card-2" className="p-4 border rounded-md">
          <div className="flex items-center mb-3">
            <Icon name="type" id="text-icon" className="mr-2" />
            <h3 className="font-medium">Generate Text</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Generate placeholder text for your design</p>
          <Button 
            id="generate-text-btn"
            variant="outline"
            className="w-full"
          >
            Generate Text
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentSection; 