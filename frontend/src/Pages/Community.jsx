import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
import axios from 'axios';


export default function Community() {
    const [posts , setPosts] = useState([]);
    const [content , setContent] = useState('');
    useEffect(()=>{
        fetchPosts();
    },[]);

    async function fetchPosts() {
        try{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_POST_URL}/posts`);
            
            // console.log(res.data);
            setPosts(res.data.Posts);
        }
        catch(err){
            console.log("Some Error Occured" , err)
        }
    }

    async function createPost() {
        try{
            
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_POST_URL}/create` , {content} , {
                headers : {
                    "Content-Type" : 'application/json',
                    Authorization : `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            // console.log(res.data);
            setPosts([...posts , res.data.post]);
            setContent('')
        }
        catch(err){
            console.log("Some Error Occured" , err)
        }
    }
    return (
      <div className="min-h-screen font-sans">
      
  
        {/* Navigation Tabs */}
        <nav className="bg-white shadow-sm flex justify-center space-x-8 py-4 mt-[70px]">
          <button className="text-purple-600 border-b-2 border-purple-600 pb-2 font-medium">All Posts</button>
          {/* <button className="text-gray-600 hover:text-purple-600 hover:border-purple-600 border-b-2 border-transparent pb-2 font-medium">
            My Posts
          </button> */}
        </nav>
  
        {/* Create Post Section */}
        <section className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg w-[90vw] md:w-[100vw]">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition duration-300"
          onClick={createPost}>
            Post
          </button>
        </section>
  
        {/* Posts Section */}
        <section className="max-w-3xl mx-auto mt-6 space-y-6 mb-4 flex flex-col items-center justify-center">
          {
            posts.length > 0 ? posts.map((e ,i)=>{
                return <Post key={i} authorName={e.authorName} content={e.content} timeStamp={e.createdAt} likes={e.likes} id={e._id} authorId = {e.authorId} commentsData={e.comments}/>
            }) : <h1 className="text-center"> No Posts </h1>
          }
          
        </section>
      </div>
    );
  }
  