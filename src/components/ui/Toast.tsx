import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Determine toast color based on type
  const getToastClass = () => {
    switch (type) {
      case 'success': return 'toast-success';
      case 'warning': return 'toast-warning';
      case 'error': return 'toast-error';
      case 'info': return 'toast-info';
      default: return '';
    }
  };

  return (
    <div 
      className={`toast ${getToastClass()} ${isClosing ? 'toast-closing' : ''}`}
      role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="toast-content">
        <span className="toast-message">{message}</span>
        <button 
          className="toast-close-button" 
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast; 