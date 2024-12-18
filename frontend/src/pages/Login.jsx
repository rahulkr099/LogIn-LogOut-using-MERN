
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
function Login() {
    const [loginInfo, setLoginInfo]=useState({
        email:'',
        password:'',
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(name,value)
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name]= value;
        setLoginInfo(copyLoginInfo);
    }
    console.log('LoginInfo ->', loginInfo);
    const navigate = useNavigate();
    const handleLogin = async (e)=>{
        e.preventDefault();
        const {email, password} = loginInfo;
        if(!email || !password){
            return handleError('email or password required')           
        }
        try{
            const url = "https://log-in-log-out-using-mern-backend.vercel.app/auth/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(loginInfo)
            })
            const result = await response.json();
            const {success, message,token,name, error} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',token);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home');
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
    <div className='p-4 text-2xl flex flex-col justify-center items-center'>
        <h1 className='text-center underline'>Login Page</h1>
    <div className='m-4 border-2 border-green-400 shadow-xl rounded-lg'>
    <form className='flex flex-col justify-center items-start m-4 ' onSubmit={handleLogin}>
        
        <div>
            <label className='text-2xl' htmlFor='email'>Email:</label>
            <input
            className='m-1 p-2 border-2 border-orange-400 rounded-lg outline-blue-400 placeholder-shown:text-xl'
                onChange={handleChange}
                type='email'
                name='email'
                autoFocus
                placeholder='Enter Your Email'
                value={loginInfo.email}
            />
        </div>
        <div>
            <label className='text-2xl' htmlFor='password'>Password:</label>
            <input
            className='m-1 p-2 border-2 border-orange-400 rounded-lg outline-blue-400 placeholder-shown:text-xl'
                onChange={handleChange}
                type='password'
                name='password'
                autoFocus
                placeholder='Enter Your Password'
                value={loginInfo.password}
            />
        </div>
        <div className='w-full text-center'>
       <button className='text-2xl bg-green-400 p-1 rounded-md hover:text-white m-2' type='submit'>Login</button>
        </div>
       <span>Do not have an account?
        <Link to='/signup' className='text-blue-800 m-1 hover:text-green-400'>Signup</Link>
       </span>
       
    </form>
    </div>
    <ToastContainer/>
    </div>
    
  )
}

export default Login
