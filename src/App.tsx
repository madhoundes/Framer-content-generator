import { framer, CanvasNode } from "framer-plugin"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import TextGenerator from './components/TextGenerator'
import Banner from './components/Banner'
import YouTubeWidget from './components/widgets/YouTubeWidget'
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

function useSelection() {
    const [selection, setSelection] = useState<CanvasNode[]>([])

    useEffect(() => {
        return framer.subscribeToSelection(setSelection)
    }, [])

    return selection
}

// Define the type for the theme explicitly
type Theme = 'light' | 'dark';

// Custom hook using visual detection
function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const requestRef = useRef<number>();
  const previousThemeRef = useRef<Theme>('light');

  const detectThemeVisually = useCallback(() => {
    try {
      // Check if running inside Framer iframe
      if (window.self === window.top) {
          // Standalone mode: Use OS preference
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const currentTheme = mediaQuery.matches ? 'dark' : 'light';
          if (currentTheme !== previousThemeRef.current) {
              setTheme(currentTheme);
              document.documentElement.classList.toggle('dark-theme', currentTheme === 'dark');
              console.log('Standalone theme set to:', currentTheme);
              previousThemeRef.current = currentTheme;
          }
          return; // Exit if not in iframe
      }
      
      // --- Visual Detection Logic (inside iframe) ---
      const probe = document.createElement('div');
      probe.style.position = 'absolute';
      probe.style.width = '1px';
      probe.style.height = '1px';
      probe.style.opacity = '0'; // Make it truly invisible
      probe.style.pointerEvents = 'none';
      // Try a potentially inherited Framer variable (adjust if needed)
      probe.style.color = 'var(--framer-color-text, #000000)'; 
      document.body.appendChild(probe);
      
      const computedStyle = window.getComputedStyle(probe);
      const textColor = computedStyle.color;
      document.body.removeChild(probe); // Clean up immediately

      // Basic check: Framer dark theme typically uses lighter text
      // Analyze brightness (simple RGB check might suffice)
      const rgbMatch = textColor.match(/\((\d+),\s*(\d+),\s*(\d+)/);
      let currentTheme: Theme = 'light'; // Default to light
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1], 10);
        const g = parseInt(rgbMatch[2], 10);
        const b = parseInt(rgbMatch[3], 10);
        // Simple brightness heuristic: average RGB value > 128 means light text (dark mode)
        const brightness = (r + g + b) / 3;
        currentTheme = brightness > 128 ? 'dark' : 'light';
      }

      // Only update state and DOM if theme actually changed
      if (currentTheme !== previousThemeRef.current) {
        setTheme(currentTheme);
        // Use toggle for cleaner class management
        document.documentElement.classList.toggle('dark-theme', currentTheme === 'dark'); 
        console.log('Visually detected theme changed to:', currentTheme);
        previousThemeRef.current = currentTheme;
      }
    } catch (e) {
      console.warn('Visual theme detection failed:', e);
      // Optionally fallback to OS preference here if needed
    }
    // Continue polling
    requestRef.current = requestAnimationFrame(detectThemeVisually);
  }, []); // Empty dependency array ensures stable function reference

  useEffect(() => {
    // Start the animation frame loop
    requestRef.current = requestAnimationFrame(detectThemeVisually);
    // Cleanup function to cancel the loop when component unmounts
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [detectThemeVisually]); // Rerun effect if detection logic changes (it won't here)

  return { theme };
}

function AppContent() {
    const { t, i18n } = useTranslation()
    const { showToast } = useToast()
    const [direction, setDirection] = useState('ltr')
    const [showBanner, setShowBanner] = useState(true)
    const [loading, setLoading] = useState(true)
    const [showYouTubeWidget, setShowYouTubeWidget] = useState(true)
    const { theme } = useTheme()

    // Force showing YouTube widget regardless of previous visits
    useEffect(() => {
        // Remove the visited flag so the widget will show again on future visits too
        localStorage.removeItem('framer_content_generator_visited')
    }, [])

    // Initialize i18n direction
    useEffect(() => {
        // Set direction based on language
        setDirection(i18n.language === 'ar' ? 'rtl' : 'ltr')
        
        // Listen for language changes
        const handleLanguageChange = (lng: string) => {
            setDirection(lng === 'ar' ? 'rtl' : 'ltr')
        }
        
        i18n.on('languageChanged', handleLanguageChange)
        
        return () => {
            i18n.off('languageChanged', handleLanguageChange)
        }
    }, [i18n])

    // Set app ready state after a short delay to ensure everything is loaded
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
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
                    // Define a default max width
                    const MAX_WIDTH = 650;
                    
                    // Create attributes object with fixed width properties
                    const attributes: any = {
                        width: MAX_WIDTH, // Set a fixed width initially
                        maxWidth: MAX_WIDTH, // Enforce the maximum width
                        textAutoResize: 'HEIGHT', // Allow height to adjust, fix width
                        // Set consistent line height for all text types
                        lineHeight: styleOptions && styleOptions.lineHeight ? styleOptions.lineHeight : 1.5
                    };
                    
                    // Add RTL properties if needed
                    if (isRtl) {
                        attributes.textAlign = 'right';
                        attributes.direction = 'rtl';
                        attributes.textDirection = 'RTL';
                        attributes.textAlignHorizontal = 'right';
                        attributes.horizontalAlignment = 'right';
                        attributes.alignment = 'right';
                        attributes.paragraphAlignment = 'right';
                        attributes.paragraphAlignHorizontal = 'right';
                        attributes.textAlignVertical = 'top';
                        
                        // Special handling for lists (ensure maxWidth is still applied)
                        if (styleOptions && styleOptions.listFormat === 'rtl') {
                            attributes.paragraphIndent = 20;
                            attributes.paragraphSpacing = 10;
                            attributes.listStyle = 'rtl';
                            attributes.listReversed = false;
                            attributes.listStylePosition = 'outside';
                            attributes.listDirection = 'rtl';
                            attributes.listMarginRight = 20;
                            attributes.listNumberingReversed = false;
                            attributes.listStyleType = 'decimal-rtl';
                            attributes.listStyleTypeRtl = true;
                            attributes.textRtl = true;
                            if (styleOptions.listStyle) {
                                attributes.listStyle = styleOptions.listStyle;
                            }
                        } else if (styleOptions && styleOptions.listFormat) {
                            // English lists still need paragraph settings
                            attributes.paragraphIndent = 20;
                            attributes.paragraphSpacing = 10;
                        }
                    } else {
                        // Ensure English lists get indentation too
                         if (styleOptions && styleOptions.listFormat) {
                            attributes.paragraphIndent = 20;
                            attributes.paragraphSpacing = 10;
                         }
                    }
                    
                    // Apply the attributes
                    console.log("Applying attributes with max width:", attributes);
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

    useEffect(() => {
        // Initial UI configuration - Moved inside AppContent's useEffect
        try {
          console.log("Initializing Framer UI from AppContent");
          framer.showUI({
            position: "center",
            width: 320, 
            height: 746,
            resizable: false,
          });
          console.log("Framer UI initialized successfully");
        } catch (error) {
          console.error("Error initializing Framer UI:", error);
          try {
            console.log("Attempting fallback UI initialization");
            framer.showUI();
            console.log("Fallback UI initialization succeeded");
          } catch (innerError) {
            console.error("Fallback UI initialization failed:", innerError);
          }
        }
    }, []); // Empty dependency array ensures it runs only once on mount

    // Show loading state if app is not ready yet
    if (loading) {
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
            {showYouTubeWidget && (
                <YouTubeWidget 
                    videoId="_ztzG1b2xZ4" // YouTube video ID from the provided URL
                    title="How this Plugin Works"
                    description="This quick guide will show you how to use this plugin to generate content, support your customers, and explore features like Visual Recognition and LogoView."
                    thumbnailUrl="/Widget-assets/video-window.png"
                />
            )}
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
