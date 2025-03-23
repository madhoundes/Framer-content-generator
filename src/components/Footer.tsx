import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer id="app-footer" className="app-footer bg-background border-t border-border p-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Framer Content Generator
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 