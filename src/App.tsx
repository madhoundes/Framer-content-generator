import { framer, CanvasNode } from "framer-plugin"
import React, { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import TextGenerator from './components/TextGenerator'
import Banner from './components/Banner'
import './locales/i18n'
import { useToast } from './context/ToastContext'

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("UI Error:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#ef4444', borderRadius: '8px', margin: '20px' }}>
          <h3>Something went wrong</h3>
          <p>The plugin encountered an error. Please try refreshing.</p>
          <pre style={{ 
            marginTop: '10px', 
            padding: '10px', 
            backgroundColor: 'rgba(0,0,0,0.2)', 
            borderRadius: '4px',
            fontSize: '12px',
            overflowX: 'auto'
          }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: 'white',
              color: '#ef4444',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Plugin
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initial UI configuration - simplified and more robust
try {
  console.log("Initializing Framer UI");
  framer.showUI({
    position: "center",
    width: 320, 
    height: 800,
  });
  console.log("Framer UI initialized successfully");
} catch (error) {
  console.error("Failed to initialize UI:", error);
  // Fallback to basic configuration
  try {
    console.log("Attempting fallback UI initialization");
    framer.showUI();
    console.log("Fallback UI initialization succeeded");
  } catch (innerError) {
    console.error("Critical UI initialization failure:", innerError);
  }
}

function useSelection() {
    const [selection, setSelection] = useState<CanvasNode[]>([])

    useEffect(() => {
        return framer.subscribeToSelection(setSelection)
    }, [])

    return selection
}

// Theme management hook
function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    
    useEffect(() => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = prefersDark ? 'dark' : 'light';
            applyTheme(systemTheme);
        }
        
        // Add listener for system preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        };
        
        // Add listener for Framer theme toggle changes
        const handleFramerThemeChange = () => {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const newTheme = prefersDark ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        };
        
        mediaQuery.addEventListener('change', handleChange);
        // Listen for changes in prefers-color-scheme to detect Framer theme toggle
        mediaQuery.addEventListener('change', handleFramerThemeChange);
        
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
            mediaQuery.removeEventListener('change', handleFramerThemeChange);
        };
    }, [theme]);
    
    const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
        const root = document.documentElement;
        const resolvedTheme = newTheme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            : newTheme;
            
        if (resolvedTheme === 'dark') {
            root.classList.add('dark-theme');
        } else {
            root.classList.remove('dark-theme');
        }
    };
    
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };
    
    return { theme, toggleTheme };
}

function AppContent() {
    const { t, i18n } = useTranslation()
    const { showToast } = useToast()
    const [showBanner, setShowBanner] = useState(true)
    const [appReady, setAppReady] = useState(false)
    
    // Initialize theme functionality without exposing in component
    useTheme();

    // Set app ready state after a short delay to ensure everything is loaded
    useEffect(() => {
        const timer = setTimeout(() => {
            setAppReady(true)
            console.log("App marked as ready");
        }, 500);
        
        return () => clearTimeout(timer)
    }, [])

    // Helper function to estimate number of lines in text
    const estimateLines = (text: string, width: number): number => {
        // Average characters per line (estimate based on width)
        const charsPerLine = width / 8; // Rough estimate: 8px per character
        
        // Count newlines and add estimated wrapped lines
        const lines = text.split('\n');
        let totalLines = 0;
        
        lines.forEach(line => {
            // Add at least 1 line, plus any additional wrapped lines
            totalLines += 1 + Math.floor(line.length / charsPerLine);
        });
        
        return totalLines;
    };

    // Handle adding the currently generated text to the canvas
    const handleAddTextToCanvas = async (text: string, styleOptions?: any) => {
        try {
            // Check if we're in RTL mode
            const isRtl = styleOptions && styleOptions.direction === 'rtl';
            
            // Enforce maximum width of 650px
            const MAX_WIDTH = 650;
            
            // Estimate number of lines
            const estimatedLines = estimateLines(text, MAX_WIDTH);
            
            // Show warning for very long content
            if (estimatedLines > 10) {
                // Force a new toast by adding a timestamp to the message
                showToast({
                    message: t('longContentWarning'),
                    type: 'warning',
                    duration: 5000
                });
                console.log("Showing long content warning toast");
            }
            
            // Add text to canvas - use the basic method first to ensure it works
            const textNode: any = await framer.addText(text);
            
            if (!textNode) {
                console.error("Failed to create text node");
                return;
            }
            
            console.log("Text node created:", textNode.id);
            
            // Apply style options to the text node after creation
            if (textNode && textNode.id) {
                try {
                    // Create attributes object with fixed width properties
                    const attributes: any = {
                        width: MAX_WIDTH,
                        // Set fixed width mode - don't auto-fit
                        textAutoResize: 'HEIGHT',
                        // Ensure max width is enforced
                        maxWidth: MAX_WIDTH,
                        // Set consistent line height for all text types
                        lineHeight: styleOptions && styleOptions.lineHeight ? styleOptions.lineHeight : 1.5
                    };
                    
                    // Add RTL properties if needed
                    if (isRtl) {
                        // Strong right alignment for RTL text
                        attributes.textAlign = 'right';
                        attributes.direction = 'rtl';
                        // Set the writing direction to RTL for proper text rendering
                        attributes.textDirection = 'RTL';
                        
                        // Try all possible Framer properties that might control alignment
                        // Some of these might not work, but we're trying everything to ensure
                        // right alignment in the Framer Canvas UI
                        attributes.textAlignHorizontal = 'right';
                        attributes.horizontalAlignment = 'right';
                        attributes.alignment = 'right';
                        attributes.paragraphAlignment = 'right';
                        attributes.paragraphAlignHorizontal = 'right';
                        attributes.textAlignVertical = 'top'; // Ensure vertical alignment is top
                        
                        // Special handling for lists
                        if (styleOptions && styleOptions.listFormat === 'rtl') {
                            attributes.paragraphIndent = 20;
                            attributes.paragraphSpacing = 10;
                            attributes.listStyle = 'rtl';
                            // Fix for inverted numbering in RTL lists
                            attributes.listReversed = false;
                            attributes.listStylePosition = 'outside';
                            // Apply other RTL-specific attributes from styleOptions
                            if (styleOptions.listStyle) {
                                attributes.listStyle = styleOptions.listStyle;
                            }
                        } else {
                            // For English lists, ensure proper formatting
                            if (styleOptions && styleOptions.listFormat) {
                                attributes.paragraphIndent = 20;
                                attributes.paragraphSpacing = 10;
                            }
                        }
                    }
                    
                    // Apply the attributes
                    console.log("Applying attributes:", attributes);
                    await framer.setAttributes(textNode.id, attributes);
                    
                } catch (styleError) {
                    console.error("Error applying text styles:", styleError);
                }
            }
        } catch (error) {
            console.error("Error adding text to canvas:", error);
            showToast({
                message: t('errorAddingText'),
                type: 'error',
                duration: 5000
            });
        }
    }

    // Show loading state if app is not ready yet
    if (!appReady) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                backgroundColor: 'var(--background-color)'
            }}>
                <div style={{
                    border: '4px solid rgba(255, 255, 255, 0.1)',
                    borderTop: '4px solid #3b82f6',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    animation: 'spin 1s linear infinite',
                }}>
                </div>
                <style>
                    {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    `}
                </style>
                <p style={{ marginTop: '16px', color: 'var(--secondary-text-color)' }}>Loading Text Generator...</p>
            </div>
        );
    }

    return (
        <div id="app-container" className="app-container" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            overflow: 'auto'
        }}>
            {showBanner && <Banner onClose={() => setShowBanner(false)} />}
            <Header />
            <main id="main-content" className="main-content">
                <TextGenerator onAddToCanvas={handleAddTextToCanvas} />
            </main>
        </div>
    )
}

export function App() {
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <AppContent />
        </ErrorBoundary>
    )
}
