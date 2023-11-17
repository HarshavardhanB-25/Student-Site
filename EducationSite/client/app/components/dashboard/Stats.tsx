import React from 'react';

interface StatProps {
  stat1Heading: string;
  stat1Content: string;
  stat2Heading: string;
  stat2Content: string;
  width: string;
  height: string;
  titleFontSize: string;
  contentFontSize: string;
}

const Stat: React.FC<StatProps> = ({
  stat1Heading,
  stat1Content,
  stat2Heading,
  stat2Content,
  width,
  height,
  titleFontSize,
  contentFontSize,
}) => {
  const containerStyle = {
    width: width || '80px',
    height: height || '40px',
  };

  const titleStyle = {
    fontSize: titleFontSize || '1.5rem',
  };

  const contentStyle = {
    fontSize: contentFontSize || '1.2rem',
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md" style={containerStyle}>
      <div className="flex justify-between">
        <div className="text-black flex flex-col justify-center items-center ml-2 gap-4">
          <p className="text-lg mt-4 " style={titleStyle}>
            {stat1Heading}
          </p>
          <p className="text-gray-600" style={contentStyle}>
            {stat1Content}
          </p>
        </div>
        <div className="text-black flex flex-col justify-center items-center ml-2 gap-4">
          <p className="text-lg mt-4" style={titleStyle}>
            {stat2Heading}
          </p>
          <p className="text-gray-600" style={contentStyle}>
            {stat2Content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stat;
