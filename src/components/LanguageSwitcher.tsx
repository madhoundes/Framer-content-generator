import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../locales/i18n';

type Language = 'ar' | 'en';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  // Use type assertion to specify the expected language values
  const currentLanguage = i18n.language as Language;
  const isRtl = currentLanguage === 'ar';

  const handleLanguageChange = (lang: Language) => {
    if (currentLanguage !== lang) {
      changeLanguage(lang);
    }
  };

  return (
    <div 
      id="language-switcher" 
      className="language-switcher" 
      role="tablist"
      data-active={currentLanguage}
    >
      {isRtl ? (
        // RTL order (Arabic first, then English)
        <>
          <button
            id="language-ar-btn"
            role="tab"
            aria-selected={currentLanguage === 'ar'}
            className={`language-button ${currentLanguage === 'ar' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('ar')}
          >
            العربية
          </button>
          <button
            id="language-en-btn"
            role="tab"
            aria-selected={currentLanguage === 'en'}
            className={`language-button ${currentLanguage === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
        </>
      ) : (
        // LTR order (English first, then Arabic)
        <>
          <button
            id="language-en-btn"
            role="tab"
            aria-selected={currentLanguage === 'en'}
            className={`language-button ${currentLanguage === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
          <button
            id="language-ar-btn"
            role="tab"
            aria-selected={currentLanguage === 'ar'}
            className={`language-button ${currentLanguage === 'ar' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('ar')}
          >
            العربية
          </button>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher; 