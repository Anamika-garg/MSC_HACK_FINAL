import React from 'react'

const Progress = ({value}) => {
    const progressColor = value >= 75 ? 'bg-green-500' : value >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${progressColor}`}
          style={{ width: `${value == null ? 0 : value}%` }}
        ></div>
      </div>
    );
  };

export default Progress