import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.tsx"
import './index.css'
import './locales/i18n' // Import i18n configuration
import { ToastProvider } from "./context/ToastContext" // Import ToastProvider
import { dir } from 'i18next'

// Configure console error handling to be more informative
const originalConsoleError = console.error;
console.error = function(...args) {
  originalConsoleError.apply(console, args);
  // Log additional debug info when errors occur
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Error')) {
    originalConsoleError('Additional debug info:', {
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      documentReady: document.readyState,
      rootElement: document.getElementById('root') ? 'Found' : 'Not found'
    });
  }
};

// Set initial language and direction
document.documentElement.lang = 'en'
document.documentElement.dir = dir()

// Set initial loading state on root element
const rootElement = document.getElementById('root')
if (rootElement) {
  rootElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;width:100%;color:#a1a1aa;">Initializing...</div>'
}

// Initialize React with robust error handling
try {
  console.log('Mounting React application...')
  
  if (!rootElement) {
    throw new Error('Root element not found in the DOM')
  }
  
  const root = ReactDOM.createRoot(rootElement)
  
  root.render(
    <React.StrictMode>
      <ToastProvider>
        <App />
      </ToastProvider>
    </React.StrictMode>
  )
  
  console.log('React application mounted successfully')
} catch (error) {
  console.error('Fatal error during React initialization:', error)
  // Show error in UI
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding:20px;color:white;background-color:#ef4444;border-radius:8px;margin:20px;">
        <h3>Critical Error</h3>
        <p>The application failed to initialize. Please refresh the page or contact support.</p>
        <pre style="margin-top:10px;padding:10px;background-color:rgba(0,0,0,0.2);border-radius:4px;font-size:12px;overflow-x:auto;white-space:pre-wrap;word-break:break-word;">
          ${error?.toString() || 'Unknown error'}
        </pre>
        <button onclick="window.location.reload()" style="margin-top:10px;padding:8px 16px;background-color:white;color:#ef4444;border:none;border-radius:4px;cursor:pointer;">
          Reload
        </button>
      </div>
    `
  }
}
