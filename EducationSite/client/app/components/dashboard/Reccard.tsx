import React from 'react';

interface ReccardProps {
  title: string;
  description: string;
  width?: string;
  height?: string;
  titleFontSize?: string;
  descriptionFontSize?: string;
}

const Reccard: React.FC<ReccardProps> = ({
  title,
  description,
  width,
  height,
  titleFontSize,
  descriptionFontSize,
}) => {
  const containerStyle = {
    width: width || '80px',
    height: height || '32px',
  };

  const titleStyle = {
    fontSize: titleFontSize || '1rem',
  };

  const descriptionStyle = {
    fontSize: descriptionFontSize || '0.875rem',
  };

  return (
    <div className="bg-green-500 rounded-lg" style={containerStyle}>
      <div className="p-4">
        <p className="text-left text-white font-medium mb-2" style={titleStyle}>
          {title}
        </p>
        <p className="text-left text-white-800" style={descriptionStyle}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Reccard;
