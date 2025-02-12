import React from 'react';

const Comment = ({ name, profilePic, comment, timeAgo }) => {
  return (
    <div className="flex items-start justify-center space-x-4 p-4 w-[100%] min-h-[20px] bg-white shadow-md rounded-2xl">
      {/* Profile Picture */}
      <div className='w-8 h-8 bg-red-400 rounded-full overflow-hidden'>
      <img 
        src={profilePic} 
        alt={`${name}'s profile`} 
        className="relative w-full h-full"
      />
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        {/* Name and Time */}
        <div className="flex justify-between items-center mb-1">
          {/* <h4 className="font-semibold text-md text-gray-800">Anamika</h4> */}
          <h4 className="font-semibold text-lg text-gray-800">{name}</h4>
          {/* <span className="text-sm text-gray-400">2 days ago</span> */}
          <span className="text-sm text-gray-400">{timeAgo}</span>
        </div>

        {/* Comment Text */}
        <p className="text-gray-700">{comment}</p>
        {/* <p className="text-gray-700">Hi nicee post!</p> */}
      </div>
    </div>
  );
};

export default Comment;
