import React, { useState } from 'react';
import SignUpWithGoogle from '../Components/SignUpWithGoogle';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth()
  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })

  const changeHandler = async(e) =>{
    setFormData({...formData , [e.target.name] : e.target.value});
  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    // navigate('/')
    try{
      const data = new FormData();
      data.append('email' , formData.email);
      data.append('password' , formData.password);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_USER_URL}/login` , data , {
        headers : {
          "Content-Type" : 'application/json'
        }
      })
      
      // console.log(response);
      login(response.data.token , response.data.user)
      toast.success(response.data.success)
      setTimeout(()=>{
        navigate('/');
      },1500)
    }
    catch(err){
      console.log(err);
      toast.error( err.response.data.error || 'Some Error Occured!')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer/>
      <div className="flex md:w-3/5 w-full min-h-[500px] bg-white rounded-lg shadow-lg gap-[10px] overflow-hidden md:flex-row flex-col mt-[40px] md:mt-0">
     
        {/* Right Panel */}
        <div className="flex-1 flex justify-center items-center p-3">
          <div className="w-4/5 max-w-sm text-center">
            <h2 className="text-2xl text-gray-800 mb-5 font-bold mt-[10px]">Login</h2>
            <form className="flex flex-col gap-[15px]">
             
              <input 
                type="email" 
                placeholder="Email Address" 
                name='email'
                value={formData.email}
                onChange={changeHandler}
                required 
                className="p-3 text-base border border-gray-300 rounded-md w-full"
              />
              <input 
                type="password" 
                placeholder="Password"
                name='password'
                value={formData.password}
                onChange={changeHandler} 
                required 
                className="p-3 text-base border border-gray-300 rounded-md w-full"
              />
              
              <button 
                type="submit" 
                onClick={submitHandler}
                className="p-3 text-base bg-purple-600 text-white rounded-md hover:bg-purple-500"
              >
                Login
              </button>
            </form>
            {/* <p className="mt-3 text-sm text-gray-600">Or Sign Up With</p> */}
            <div className="flex justify-center mt-2 space-x-4 text-purple-600">
              <a href="#" className="hover:underline">
                <SignUpWithGoogle/>
              </a>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Don't have an account? 
              <Link to={"/signup"} className="text-purple-600 hover:underline"> Sign Up</Link>
            </p>
          </div>
        </div>
           {/* Left Panel */}
           {/* <div className="flex-1 bg-purple-100 justify-center items-center hidden md:flex">
          <div className="text-center max-w-xs">
            <h1 className="text-2xl text-purple-600 mb-2">5 Minute School</h1>
            <p className="text-lg text-gray-800">Learn From World's Best Instructors Around The World.</p>
            <div className="mt-5">
              <img 
                src="https://via.placeholder.com/300" 
                alt="Illustration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default Login;
