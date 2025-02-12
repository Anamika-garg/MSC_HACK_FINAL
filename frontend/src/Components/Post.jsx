import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { FiSend } from 'react-icons/fi'; // Send icon
import Comment from './Comment';

const Post = ({ authorName, content, timeStamp, likes, id, authorId , commentsData }) => {
  const [postLikes, setPostLikes] = useState(likes);
  const [author, setAuthor] = useState({});
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(commentsData); // To store comments
  // console.log(comments)

  // Fetch author details
  async function getAuthor() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/author/${authorId}`);
      setAuthor(res.data.author);
    } catch (err) {
      console.log('Some Error Occurred');
    }
  }

  useEffect(() => {
    getAuthor();
  }, [authorId]);

  // Like post handler
  async function likePost() {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_POST_URL}/likePost`, { postId: id }, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setPostLikes(like => like + 1);
    } catch (err) {
      console.log(err);
    }
  }

  // Toggle comment input visibility
  const toggleCommentInput = () => {
    setShowCommentInput(prev => !prev);
  };

  // Submit new comment
  const submitComment = async () => {
    if (newComment.trim()) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_POST_URL}/addComment`, 
          { postId: id, comment: newComment }, 
          {
            headers: {
              "Content-Type": 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          }
        );
        setComments(res.data.post.comments);
        setNewComment('');
      } catch (err) {
        
        console.log('Error posting comment:', err);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-[90vw] md:w-full">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full overflow-hidden">
          {author.details?.photoURL ? (
            <img src={author.details.photoURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold">{authorName[0]}</span>
          )}
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-800">{authorName}</h2>
          <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(timeStamp), { addSuffix: true })}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700">{content}</p>

      {/* Actions: Like & Comment */}
      <div className="flex justify-between items-center mt-4 text-gray-600">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 hover:text-purple-500" onClick={likePost}>
            <span>&#9829;</span>
            <span>{postLikes}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-purple-500" onClick={toggleCommentInput}>
            <span>&#128172;</span>
            <span>{comments.length}</span>
          </button>
        </div>
      </div>

      {/* Comment Section */}
      {showCommentInput && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          {/* Comment Input */}
          <div className="flex items-center border rounded-lg p-2 bg-white">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 outline-none px-2 text-gray-700"
            />
            <button 
              onClick={submitComment}
              className="text-purple-500 hover:text-purple-700 p-2"
            >
              <FiSend size={20} />
            </button>
          </div>

          {/* Display Comments */}
          <div className="mt-3 space-y-2">
            {comments.map((comment, index) => (
              <Comment key={index} name={comment.authorName} comment={comment.comment} timeAgo={formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })} profilePic = {comment.authorPfp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
