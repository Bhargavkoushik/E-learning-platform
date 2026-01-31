import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress = 0, className = '' }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div 
        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  className: PropTypes.string,
};

export default ProgressBar;
