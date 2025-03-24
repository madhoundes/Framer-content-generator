import React, { useState, useEffect } from 'react';
import './YouTubeWidget.css';

// Import images directly
import thumbnailImage from '/Widget-assets/video-window.png';
import avatarImage from '/Widget-assets/avatar.png';
import youtubeIcon from '/Widget-assets/YOutube-icon.svg';
import bookHelpIcon from '/Widget-assets/book-help.svg';
import closeIcon from '/Widget-assets/close-icon.svg';

interface YouTubeWidgetProps {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
}

// Local storage key for saving dismiss preference
const WIDGET_DISMISS_KEY = 'youtube_widget_dismissed';

const YouTubeWidget: React.FC<YouTubeWidgetProps> = ({
  videoId,
  title,
  description,
  thumbnailUrl
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Check if widget should be shown on initial render
  useEffect(() => {
    const isDismissed = localStorage.getItem(WIDGET_DISMISS_KEY) === 'true';
    if (isDismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    // Save preference if "don't show again" is checked
    if (dontShowAgain) {
      localStorage.setItem(WIDGET_DISMISS_KEY, 'true');
    }
    
    // Start the closing animation
    setIsClosing(true);
    
    // Delay the actual removal from DOM until animation completes
    setTimeout(() => {
      setIsVisible(false);
    }, 300); // 300ms matches the animation duration
  };

  const handleDontShowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDontShowAgain(e.target.checked);
  };

  const handleVideoClick = () => {
    window.open(`https://youtu.be/_ztzG1b2xZ4?si=5oXaWteSNFDFxxP1`, '_blank');
  };

  if (!isVisible) {
    return null;
  }

  // Use the provided thumbnail URL or default to our imported thumbnail
  const thumbnail = thumbnailUrl || thumbnailImage;

  return (
    <div className={`youtube-widget-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`youtube-widget-container ${isClosing ? 'closing' : ''}`}>
        <div className="youtube-widget-header">
          <h2>{title}</h2>
          <button className="youtube-widget-close" onClick={handleClose} aria-label="Close">
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className="youtube-widget-thumbnail" onClick={handleVideoClick}>
          <img src={thumbnail} alt={title} className="youtube-thumbnail" />
          
          <div className="youtube-widget-branding">
            <img src={avatarImage} alt="Logo" />
            <span>Framer Content Generator Plugin</span>
          </div>
          
          <div className="youtube-play-button">
            <img src={youtubeIcon} alt="Play" />
          </div>
        </div>

        <div className="youtube-widget-footer">
          <div className="youtube-widget-dont-show">
            <label className="dont-show-label">
              <input 
                type="checkbox" 
                checked={dontShowAgain}
                onChange={handleDontShowChange}
              />
              <span>Don't show this again next time</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeWidget; 