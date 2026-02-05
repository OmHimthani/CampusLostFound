import React, { useState } from 'react'
import './css/LoginStyle.css'
import {Link , Navigate, useNavigate} from 'react-router-dom'
import supabase from './client'
const Login = () => {
    const navigate = useNavigate();

    const [CheckData,SetCheckData]=useState({
            
            email:"",
            password:""
            
        })
    const inputCheck=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    
    // console.log(name);
    SetCheckData({...CheckData,[name]:value})
    
    
    }
    const checkData=async(e)=>{
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
  email:CheckData.email ,
  password: CheckData.password,
  
})

// console.log(data.session.user.email);
// console.log(data);
if(error){
    console.error(error);
    alert("User does not exist")
    return
}

alert("Done user exists")
navigate('/Homepage')

        } catch (error) {
            alert(error)
            console.log(data);
        }
    }
  return (
    <>


<div className="login-wrapper">

    {/* <!-- Left Brand Section --> */}
    <div className="brand-section">
        <h1>Campus Lost & Found</h1>
        <p>
            Welcome back.  
            Let’s get you reunited with what matters.
        </p>
    </div>

    {/* <!-- Login Card --> */}
    <div className="login-card">
        <h2>Login</h2>
        <p className="subtext">Enter your credentials to continue</p>

        <form>
            <div className="field">
                <input type="email" onChange={inputCheck} name='email' required />
                <label>Email Address</label>
            </div>

            <div className="field">
                <input type="password" onChange={inputCheck} name='password' required />
                <label>Password</label>
            </div>

            <div className="options">
                <label className="remember">
                    <input type="checkbox" />
                    Remember me
                </label>
                <a href="#" className="forgot">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn" onClick={checkData}>
                Login →
            </button>

            <p className="footer-text">
                Don’t have an account?
                <Link to='/signup'>Sign up</Link>
            </p>
        </form>
    </div>

</div>

    </>
  )
}

export default Login
