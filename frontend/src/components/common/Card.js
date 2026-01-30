import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-105' : '';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
