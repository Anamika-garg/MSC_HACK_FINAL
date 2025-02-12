import React from 'react'
import { doSignInWithGoogle } from '../firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";


const SignUpWithGoogle = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    async function googleSignInHandler(e) {
        e.preventDefault();
        const result = await doSignInWithGoogle()


        if (result) {
            try {
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_USER_URL}/continueWithGoogle`, {
                        email: result.user.email,
                        fullName: result.user.displayName,
                        photoURL: result.user.photoURL,
                        providerId: result.providerId
                    }, {
                        headers: {
                            "Content-Type": 'application/json',
                        }
                    })
    
                    // console.log(res);
                    toast(res.data.success);
                    login(res.data.token, res.data.user)
                    if(res.data.method == 'signup'){
                        setTimeout(() => {
                            navigate('/complete');
                        }, 1500);
                        return;
                    }
                    setTimeout(() => {
                        navigate('/');
                    }, 1500)

            
            }
            catch (err) {
            console.log("error", err)
            login()
            toast.error(err.response?.data.error || err.response || 'Some Error Occured');

        }
    }
        else {
    console.log("error", err)
    toast.error(err.response.data.error)
}
    }
return (
    <>
        <ToastContainer />
        <button className='border-blue-400 border-2 font-semibold flex items-center justify-center text-black px-4 py-2 rounded-md  transition-all w-[250px]' onClick={googleSignInHandler}>
            <FcGoogle className='inline h-[30px] w-[30px] mr-2 '/>
            Continue With Google
            </button>
    </>
)
}

export default SignUpWithGoogle