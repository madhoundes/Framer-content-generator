import React from 'react';
import * as FeatherIcons from 'feather-icons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  id?: string;
}

const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = 'currentColor', 
  className = '',
  id
}) => {
  const iconHtml = FeatherIcons.icons[name]?.toSvg({
    width: size,
    height: size,
    color,
    'stroke-width': 2,
    class: className,
    id
  });

  if (!iconHtml) {
    console.warn(`Icon "${name}" not found in Feather Icons`);
    return null;
  }

  return (
    <span 
      className={`feather-icon ${className}`}
      dangerouslySetInnerHTML={{ __html: iconHtml }} 
    />
  );
};

export default Icon; 