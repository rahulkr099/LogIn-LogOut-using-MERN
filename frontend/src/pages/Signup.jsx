
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
function Signup() {
    const [signupInfo, setSignupInfo]=useState({
        name:'',
        email:'',
        password:'',
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(name,value)
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name]= value;
        setSignupInfo(copySignupInfo);
    }
    console.log('signupInfo ->', signupInfo);
    const navigate = useNavigate();
    const handleSignup = async (e)=>{
        e.preventDefault();
        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
            return handleError('name, email or password required')           
        }
        try{
            const url = "https://log-in-log-out-using-mern-backend.vercel.app/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login');
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details)
            }else if(!success){
                handleError(message)
            }
            console.log(result)
        }catch(err){
            handleError(err);
        }
    }
  return (
    <div className='text-2xl p-4 flex flex-col justify-center items-center'>
        <h1 className='text-xl underline text-center'>Signup</h1>
    <div>
    <form onSubmit={handleSignup} className='flex flex-col justify-center items-start border-2 border-green-400 m-4 p-2 rounded-lg shadow-lg'>
        <div className=''>
            <label htmlFor='name'>Name:</label>
            <input
            className='outline-blue-400 m-2 placeholder:text-2xl p-1 border-2 border-orange-400 rounded-lg'
                onChange={handleChange}
                type='text'
                name='name'
                autoFocus
                placeholder='Enter Your Name'
                value={signupInfo.name}
            />
        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <input
            className='outline-blue-400 m-2 placeholder:text-2xl p-1 border-2 border-orange-400 rounded-lg'
                onChange={handleChange}
                type='email'
                name='email'
                autoFocus
                placeholder='Enter Your Email'
                value={signupInfo.email}
            />
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input
            className='outline-blue-400 m-2 placeholder:text-2xl p-1 border-2 border-orange-400 rounded-lg'
                onChange={handleChange}
                type='password'
                name='password'
                autoFocus
                placeholder='Enter Your Password'
                value={signupInfo.password}
            />
        </div>
       <button type='submit' className=''>Signup</button>
       <span>Already Have an account?
        <Link to='/login' className='text-blue-800 m-1 hover:text-green-400'>Login</Link>
       </span>
    </form>
    </div>
    <ToastContainer/>
    </div>
    
  )
}

export default Signup
