import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToastContainer from '../components/ui/ToastContainer';
import { ToastType } from '../components/Toast';
import { useTranslation } from 'react-i18next';

// Define the shape of a toast notification
export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Define the context shape
interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: number) => void;
}

// Create the context with an initial empty state
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [lastToast, setLastToast] = useState<{ message: string, timestamp: number } | null>(null);
  const { i18n } = useTranslation();

  // Clear toasts when language changes to prevent showing stale messages
  useEffect(() => {
    clearAllToasts();
  }, [i18n.language]);

  // Show a toast notification
  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    // Check for duplicate toast messages within short time period (1 second)
    const now = Date.now();
    if (lastToast && 
        lastToast.message === toast.message && 
        now - lastToast.timestamp < 1000) {
      // Skip showing duplicate toast
      return;
    }
    
    // Update last toast info
    setLastToast({
      message: toast.message,
      timestamp: now
    });
    
    // Add toast with a unique ID
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { ...toast, id }]);

    // Automatically remove toast after duration (default: 3 seconds)
    const duration = toast.duration || 3000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [lastToast]);

  // Remove a toast by ID
  const removeToast = useCallback((id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Context value
  const contextValue = {
    toasts,
    showToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Toast container */}
      {toasts.length > 0 && (
        <div 
          className="toast-container"
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 1000,
          }}
        >
          {toasts.map(toast => (
            <div
              key={toast.id}
              className={`toast toast-${toast.type}`}
              style={{
                padding: '12px 16px',
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundColor: 
                  toast.type === 'success' ? '#10B981' :
                  toast.type === 'error' ? '#EF4444' :
                  toast.type === 'warning' ? '#F59E0B' : '#3B82F6',
                color: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: '200px',
                maxWidth: '400px',
              }}
            >
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  marginLeft: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 