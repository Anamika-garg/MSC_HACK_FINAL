import React from 'react'

const Card = ({ children, className }) => {
  return (
      <div className={`bg-white shadow-lg rounded-2xl p-4 h-auto flex flex-col items-center justify-center ${className}`}>
        {children}
      </div>
    );
}

export default Card