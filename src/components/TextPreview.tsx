import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './ui/icon';
import { TextType } from './TextTypeSelector';
import { useToast } from '../context/ToastContext';

interface TextPreviewProps {
  text: string;
  textType: TextType;
  isUpdating?: boolean;
  isRtl?: boolean;
  isLoading?: boolean;
}

const TextPreview: React.FC<TextPreviewProps> = ({ 
  text, 
  textType, 
  isUpdating = false, 
  isRtl: propIsRtl,
  isLoading = false
}) => {
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();
  const isRtl = propIsRtl !== undefined ? propIsRtl : i18n.language === 'ar';
  
  // Calculate content stats with useMemo instead of state to avoid unnecessary rerenders
  const contentStats = useMemo(() => {
    if (!text) {
      return { words: 0, items: 0, sentences: 0 };
    }

    // Count words
    const wordCount = text.split(/\s+/).filter(word => word.trim().length > 0).length;
    
    // Count list items
    const itemCount = text.split('\n').filter(line => /^\d+\./.test(line.trim())).length;
    
    // Count sentences
    const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    
    return {
      words: wordCount,
      items: itemCount,
      sentences: sentenceCount
    };
  }, [text]);

  const copyToClipboard = () => {
    try {
      // Format the text before copying to maintain spacing and formatting
      const formattedTextForCopy = formatTextForClipboard(text, textType, isRtl);
      
      // Modern clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(formattedTextForCopy)
          .then(() => {
            // Show toast notification on success
            showToast({
              message: t('textCopiedSuccess'),
              type: 'success',
              duration: 3000
            });
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
            // Try fallback method
            fallbackCopyTextToClipboard(formattedTextForCopy);
          });
      } else {
        // Use fallback for browsers that don't support clipboard API
        fallbackCopyTextToClipboard(formattedTextForCopy);
      }
    } catch (err) {
      console.error('Copy to clipboard failed: ', err);
      showToast({
        message: 'Copy failed. Please try again.',
        type: 'error',
        duration: 3000
      });
    }
  };

  // Fallback copy method for older browsers
  const fallbackCopyTextToClipboard = (text: string) => {
    try {
      // Create temporary element
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Make the textarea out of viewport
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      
      // Select and copy
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      
      // Clean up
      document.body.removeChild(textArea);
      
      // Show notification
      if (successful) {
        showToast({
          message: t('textCopiedSuccess'),
          type: 'success',
          duration: 3000
        });
      } else {
        throw new Error('execCommand failed');
      }
    } catch (err) {
      console.error('Fallback clipboard copy failed: ', err);
      showToast({
        message: 'Copy failed. Please try again.',
        type: 'error',
        duration: 3000
      });
    }
  };

  // Format text for clipboard to maintain proper spacing and paragraph breaks
  const formatTextForClipboard = (text: string, textType: TextType, isRtl: boolean): string => {
    if (textType === 'paragraph') {
      // For paragraphs, maintain paragraph breaks and proper spacing
      return text.split('\n\n').map(paragraph => {
        // Split paragraph into sentences
        const sentences = paragraph.split('. ')
          .filter(s => s.trim().length > 0)
          .map(s => s.trim() + (s.endsWith('.') ? '' : '.'));
        
        // Group sentences into chunks of max 2 sentences per chunk
        const chunks = [];
        const chunkSize = 2;
        
        for (let i = 0; i < sentences.length; i += chunkSize) {
          const chunkSentences = sentences.slice(i, i + chunkSize);
          if (chunkSentences.length > 0) {
            chunks.push(chunkSentences.join(' '));
          }
        }
        
        // Join chunks with double line breaks to maintain visual spacing
        return chunks.join('\n\n');
      }).join('\n\n\n'); // Triple line break between paragraphs
    } else if (textType === 'list') {
      // For lists, maintain line breaks between list items
      return text;
    } else if (textType === 'heading') {
      // For headings, return as is
      return text;
    }
    
    // Default fallback
    return text;
  };

  // Format the text based on its type
  const formatTextBasedOnType = (text: string, textType: TextType, isRtl: boolean) => {
    if (textType === 'paragraph') {
      // For paragraphs, split by double newlines and render as separate paragraphs
      // with fixed width of 600px and line-height of 1.3em
      return (
        <div style={{ 
          width: '600px', 
          maxWidth: '100%',
          direction: isRtl ? 'rtl' : 'ltr'
        }}>
          {text.split('\n\n').map((paragraph, index) => {
            // Split paragraph into sentences
            const sentences = paragraph.split('. ')
              .filter(s => s.trim().length > 0)
              .map(s => s.trim() + (s.endsWith('.') ? '' : '.'));
            
            // Group sentences into chunks of max 2 sentences per line
            // This ensures we have 2-3 visual breaks in a 5-6 sentence paragraph
            const chunks = [];
            const chunkSize = 2; // Fixed at 2 sentences per chunk for consistent breaks
            
            for (let i = 0; i < sentences.length; i += chunkSize) {
              const chunkSentences = sentences.slice(i, i + chunkSize);
              if (chunkSentences.length > 0) {
                chunks.push(chunkSentences.join(' '));
              }
            }
            
            return (
              <p key={index} style={{ 
                marginBottom: '1.2rem', 
                lineHeight: '1.3em',
                width: '100%',
                fontSize: '0.95rem',
                paddingLeft: isRtl ? '0' : '0.5rem',
                paddingRight: isRtl ? '0.5rem' : '0',
                // Remove text indentation
                textIndent: '0',
                textAlign: isRtl ? 'right' : 'left',
                direction: isRtl ? 'rtl' : 'ltr',
                unicodeBidi: 'embed'
              }}>
                {chunks.map((chunk, chunkIndex) => (
                  <span key={chunkIndex}>
                    {chunk}
                    {chunkIndex < chunks.length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      );
    } else if (textType === 'list') {
      // For lists, render as an ordered list with RTL support
      return (
        <ol style={{ 
          paddingLeft: isRtl ? 0 : '1.5rem', 
          paddingRight: isRtl ? '1.5rem' : 0,
          margin: 0,
          direction: isRtl ? 'rtl' : 'ltr',
          listStylePosition: 'outside',
          unicodeBidi: 'embed',
          ...(isRtl && {
            textAlign: 'right',
            listStyleType: 'arabic-indic',  // Use Arabic numerals
          })
        }}>
          {text.split('\n').map((item, index) => {
            // Remove the number prefix since we're using <ol>
            const content = isRtl ? item : item.replace(/^\d+\.\s*/, '');
            return (
              <li key={index} style={{ 
                marginBottom: '0.5rem',
                textAlign: isRtl ? 'right' : 'left',
                direction: isRtl ? 'rtl' : 'ltr',
                unicodeBidi: 'embed'
              }}>
                {content}
              </li>
            );
          })}
        </ol>
      );
    } else if (textType === 'heading') {
      // For headings, render as an h3
      return (
        <h3 style={{ 
          margin: 0, 
          fontWeight: 'bold',
          textAlign: isRtl ? 'right' : 'left',
          direction: isRtl ? 'rtl' : 'ltr',
          unicodeBidi: 'embed'
        }}>
          {text}
        </h3>
      );
    }
    
    // Default fallback
    return text;
  };

  // Get the appropriate content count based on text type - using memoized values
  const getContentCount = () => {
    if (textType === 'heading') {
      return contentStats.words;
    } else if (textType === 'list') {
      return contentStats.items;
    } else {
      return contentStats.sentences;
    }
  };

  // Get the appropriate content type label
  const getContentTypeLabel = () => {
    if (textType === 'heading') {
      return isRtl ? 'كلمات' : 'words';
    } else if (textType === 'list') {
      return isRtl ? 'عناصر' : 'items';
    } else {
      return isRtl ? 'جمل' : 'sentences';
    }
  };

  return (
    <div id="text-preview-container" className="text-preview-container">
      <div className="text-preview-header">
        <div className="text-preview-title-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h3 id="text-preview-title" className="text-preview-title">
            {t('textPreview')}
            {isUpdating && (
              <span className="updating-indicator" style={{ 
                marginLeft: '8px', 
                fontSize: '0.75rem', 
                color: '#3b82f6',
                animation: 'pulse 1s infinite ease-in-out'
              }}>
                {isRtl ? 'جاري التحديث...' : 'Updating...'}
              </span>
            )}
          </h3>
          
          <div className="content-stats" style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span className="content-count">
              {getContentCount()} {getContentTypeLabel()}
            </span>
            <button
              id="copy-button"
              className="copy-button"
              onClick={copyToClipboard}
              aria-label="Copy to clipboard"
            >
              <span className="copy-label">{t('copy')}</span>
              <Icon name="copy" size={13} />
            </button>
          </div>
        </div>
      </div>
      <div
        id="text-preview"
        className={`text-preview ${isUpdating ? 'updating' : ''}`}
        style={{
          transition: 'opacity 0.15s ease-in-out',
          opacity: isUpdating && textType === 'list' ? 0.7 : 1,
          position: 'relative'
        }}
      >
        {/* Show loading indicator for lists only */}
        {(isLoading || isUpdating) && textType === 'list' && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(30, 30, 30, 0.8)',
            padding: '8px 12px',
            borderRadius: '4px',
            color: 'white',
            fontSize: '14px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderTop: '2px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            {t('optimizingList')}
          </div>
        )}

        {formatTextBasedOnType(text, textType, isRtl)}
      </div>
    </div>
  );
};

export default TextPreview; 