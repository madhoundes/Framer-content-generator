import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: ToastType;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, type = 'success' }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  useEffect(() => {
    if (isVisible) {
      // Reset closing state when toast appears
      setIsClosing(false);
      
      // Set timer to start closing animation after 2.5 seconds
      const closingTimer = setTimeout(() => {
        setIsClosing(true);
      }, 2500);
      
      // Set timer to fully close toast after 3 seconds
      const closeTimer = setTimeout(() => {
        onClose();
      }, 3000);
      
      // Clean up timers when component unmounts
      return () => {
        clearTimeout(closingTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isVisible, onClose]);

  // Don't render anything if toast is not visible
  if (!isVisible) return null;
  
  return (
    <div className="toast-container">
      <div className={`toast toast-${type} ${isClosing ? 'toast-closing' : ''}`}>
        <div className="toast-content">
          <span className="toast-message">{message}</span>
          <button 
            className="toast-close-button" 
            onClick={() => setIsClosing(true)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast; 