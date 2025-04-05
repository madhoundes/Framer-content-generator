import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BuyMeCoffeeSvg from '../assets/icons/btn-buymecoffe.svg';

interface BannerProps {
  onClose: () => void;
}

const Banner: React.FC<BannerProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [isClosing, setIsClosing] = useState(false);
  
  const handleClose = () => {
    setIsClosing(true);
    // Wait for the animation to complete before actually removing the component
    setTimeout(() => {
      onClose();
    }, 300); // Match the transition duration in CSS (0.3s)
  };
  
  // Handle button clicks to open links in a new tab
  const handleGetTemplateClick = () => {
    window.open('https://www.framer.com/@ahmed-almadhoun/', '_blank');
  };
  
  const handleBuyMeCoffeeClick = () => {
    window.open('https://buymeacoffee.com/luxyPzpzxC', '_blank');
  };
  
  return (
    <div className={`banner ${isClosing ? 'closing' : ''}`}>
      <div className="banner-content">
        <div className="banner-header">
          <span className="banner-title">{t('banner.title', 'Got an Idea')}</span>
          <button 
            className="banner-close-button" 
            onClick={handleClose}
            aria-label={t('common.close', 'Close')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
            </svg>
          </button>
        </div>
        <p className="banner-description">
          {t('banner.description', 'Bring your vision to life with our custom freelance services tailored to your needs.')}
        </p>
        <div className="banner-actions">
          <a 
            href="https://www.framer.com/@ahmed-almadhoun/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="banner-action-button get-template"
            style={{ backgroundColor: 'black', fontWeight: 'bold' }}
            onClick={(e) => {
              e.preventDefault();
              handleGetTemplateClick();
            }}
          >
            {t('banner.getTemplate')}
          </a>
          <a 
            href="https://buymeacoffee.com/luxyPzpzxC" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="banner-action-button buy-coffee"
            onClick={(e) => {
              e.preventDefault();
              handleBuyMeCoffeeClick();
            }}
          >
            <div className="coffee-icon">
              <img src={BuyMeCoffeeSvg} alt="Buy me a coffee" width="94" height="22" />
            </div>
          </a>
        </div>
        <div className="banner-footer">
          <a 
            href="https://framer.link/madhoundes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="banner-action-label"
            data-text={t('banner.hireMe')}
          >
            {t('banner.hireMe')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner; 