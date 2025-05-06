import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Banner.css';

// @ts-ignore - SVG import
import BuyMeCoffeeSvg from './assets/icons/btn-buymecoffe-CnCS_ovA.svg';

// Uncomment this line if you need to initialize i18n in your project
// import '../locales/i18n';

interface BannerProps {
  onClose: () => void;
  initialLocale?: 'en' | 'ar';
}

const Banner: React.FC<BannerProps> = ({ onClose, initialLocale }) => {
  const { t, i18n } = useTranslation();
  
  // Set initial language if provided
  useEffect(() => {
    if (initialLocale && i18n.language !== initialLocale) {
      i18n.changeLanguage(initialLocale);
    }
  }, [initialLocale, i18n]);
  
  const isRtl = i18n.language === 'ar';
  const [isClosing, setIsClosing] = useState(false);
  
  // Handle RTL attribute on document
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    
    // Cleanup function to avoid side effects
    return () => {
      if (document.documentElement.getAttribute('dir') === (isRtl ? 'rtl' : 'ltr')) {
        document.documentElement.removeAttribute('dir');
      }
    };
  }, [isRtl]);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Matches the transition duration in CSS
  };
  
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