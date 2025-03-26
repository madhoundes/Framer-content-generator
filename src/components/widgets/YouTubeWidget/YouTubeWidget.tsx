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
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Remove localStorage check to always show widget
  useEffect(() => {
    setIsVisible(true);
    localStorage.removeItem(WIDGET_DISMISS_KEY);
    
    // Pause video when user clicks outside the widget
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && isPlaying && target.classList.contains('youtube-widget-overlay')) {
        setIsPlaying(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isPlaying]);

  const handleClose = () => {
    // If video is playing, stop it first
    if (isPlaying) {
      setIsPlaying(false);
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
    // Instead of opening in a new tab, toggle embedded player
    setIsPlaying(true);
  };

  if (!isVisible) {
    return null;
  }

  // Use the provided thumbnail URL or default to our imported thumbnail
  const thumbnail = thumbnailUrl || thumbnailImage;
  
  // Build YouTube embed URL with high quality parameters
  // vq=hd1080 sets the quality to 1080p
  // fps=60 allows 60fps playback
  // hd=1 forces HD mode
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&vq=hd1080&hd=1&fps=60`;

  return (
    <div className={`youtube-widget-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`youtube-widget-container ${isClosing ? 'closing' : ''} ${isPlaying ? 'playing' : ''}`}>
        <div className="youtube-widget-header">
          <h2>{title}</h2>
          <button className="youtube-widget-close" onClick={handleClose} aria-label="Close">
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        {isPlaying ? (
          <div className="youtube-widget-player">
            <iframe
              src={youtubeEmbedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
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
        )}

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