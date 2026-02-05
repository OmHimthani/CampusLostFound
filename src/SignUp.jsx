import React, { useState } from 'react'
import './css/SignUpStyle.css'
import supabase from './client'
import {Link, useNavigate} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const SignUp = () => {
    const navigate=useNavigate()
    const [SubmitData,SetSubmitData]=useState({
        text:"",
        email:"",
        password:"",
        ComPass:""
    })
const inputData=(event)=>{
const name=event.target.name;
const value=event.target.value;

console.log(name);
SetSubmitData({...SubmitData,[name]:value})


}
const postData=async(e)=>{
e.preventDefault();
if(SubmitData.password === SubmitData.ComPass){
    
try {
    const { data, error } = await supabase.auth.signUp(
  {
    email: SubmitData.email,
    password: SubmitData.password,
    options: {
      data: {
        first_name: SubmitData.text,
        
      }
    }
    
    
  }
  
)
if(error){
    console.error(error);
    return
  }
  alert("User created")
navigate('/')
} catch (error) {
 alert(error)   
}
}
else{
    alert("Password does not match")
}
}
  return (
    <> 
    
    <div className="signup-wrapper">

    {/* <!-- Brand / Context --> */}
    <div className="brand-section">
        <h1>Campus Lost & Found</h1>
        <p>
            One account. One campus.  
            Find what’s lost. Return what’s found.
        </p>
    </div>

    {/* <!-- Signup Card --> */}
    <div className="signup-card">
        <h2>Create Your Account</h2>
        <p className="subtext">Use your campus credentials to continue</p>

        <form>
            <div className="field">
                <input onChange={inputData} type="text" required name="text" />
                <label>Full Name</label>
            </div>

            <div className="field">
                <input onChange={inputData} type="email" required name='email' />
                <label>College Email</label>
            </div>

            <div className="field">
                <input onChange={inputData} type="password" required name="password" />
                <label>Password</label>
            </div>

            <div className="field">
                <input onChange={inputData} type="password" required name="ComPass"/>
                <label>Confirm Password</label>
            </div>

            <button type="submit" className="signup-btn" onClick={postData}>
                Create Account →
            </button>

            <p className="footer-text">
                Already have an account?
                <Link to='/login'>Log in</Link>
            </p>
        </form>
    </div>

</div>

</>

  )
}

export default SignUp
