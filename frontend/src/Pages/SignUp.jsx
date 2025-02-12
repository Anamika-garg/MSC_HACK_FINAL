import React, { useState } from 'react';
import SignUpWithGoogle from '../Components/SignUpWithGoogle';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';

const SignupPage = () => {
  const {login} = useAuth();
  const [formData , setFormData] = useState({
    fullName : '',
    email : '',
    password : '',
    confirmPassword : '',
    checkbox : false
  })

  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
    // navigate('/')
    // navigate('/complete');
    if(!formData.checkbox){
      toast.error('Please accept terms and condition');
      return
    }
    const data = new FormData();
    data.append('fullName' , formData.fullName)
    data.append('email' , formData.email)
    data.append('password' , formData.password)
    data.append('confirmPassword' , formData.confirmPassword);
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_USER_URL}/register` , data , {
        headers : {
          "Content-Type" : 'application/json'
        }
      })
      // 
      // console.log(response);
      login(response.data.token , response.data.user)
      toast.success(response.data.success);
      setTimeout(()=>{
        navigate('/complete');
      },1500)
    }
    catch(err){
      console.log(err);
      toast.error( err.response.data.error || 'Some Error Occured!')
    }
  }

  const changeHandler = (e) =>{
    setFormData({...formData , [e.target.name] : e.target.value });
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer/>
      <div className="flex w-4/5 h-4/5 bg-white rounded-lg shadow-lg overflow-hidden md:flex-row flex-col mt-[40px] md:mt-0">
        {/* Left Panel */}
        <div className="flex-1 bg-purple-100 justify-center items-center flex-col hidden md:flex">
          <div className="img overflow-hidden">
            <img src={logo} alt="" className='h-[300px]' />
          </div>
          <div className="text-center max-w-xs">
            <p className="text-lg text-gray-800 relative top-[-70px]">Your one-stop destination for internships, courses, Opportunities, and career growth—unlock your future with us.</p>
            {/* <div className="mt-5">
              <img 
                src="https://via.placeholder.com/300" 
                alt="Illustration" 
                className="w-full h-auto"
              />
            </div> */}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex justify-center items-center p-3">
          <div className="md:w-4/5 w-[100%] text-center">
            <h2 className="text-2xl text-gray-800 mb-5 font-bold">Create Account</h2>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                name='fullName'
                value={formData.fullName}
                onChange={changeHandler}
                className="p-3 text-base border border-gray-300 rounded-md w-full"
              />
              <input
                type="email"
                placeholder="Email Address"
                name='email'
                value={formData.email}
                onChange={changeHandler}
                className="p-3 text-base border border-gray-300 rounded-md w-full"
              />
              <input
                type="password"
                placeholder="Password"
                name='password'
                value={formData.password}
                onChange={changeHandler}
                className="p-3 text-base border border-gray-300 rounded-md w-full"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={changeHandler}
                className="p-3 text-base border border-gray-300 rounded-md w-full"
              />
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="terms" className="w-4 h-4" name='checkbox' value={formData.checkbox} onChange={changeHandler}/>
                <label htmlFor="terms">I agree to the terms of service and privacy policy</label>
              </div>
              <button
                type="submit"
                className="p-3 text-base bg-purple-600 text-white rounded-md hover:bg-purple-500"
                onClick={submitHandler}
              >
                Sign Up
              </button>
            </form>
            {/* <p className="mt-3 text-sm text-gray-600">Or Sign Up With</p> */}
            <div className="flex justify-center mt-2 space-x-4 text-purple-600">
              <a href="#" className="hover:underline">
                <SignUpWithGoogle />
              </a>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Already have an account?
              {/* <a href="/login" className="text-purple-600 hover:underline">Sign in</a> */}
              <Link to={"/login"} className="text-purple-600 hover:underline"> Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
