import React, { useState, useEffect } from 'react'
import './css/LoginStyle.css'
import { Link, useNavigate } from 'react-router-dom'
import supabase from './client'

const Login = () => {
  const navigate = useNavigate()

  const [CheckData, SetCheckData] = useState({
    email: "",
    password: ""
  })

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const inputCheck = (event) => {
    const name = event.target.name
    const value = event.target.value
    SetCheckData({ ...CheckData, [name]: value })
  }

  const checkData = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: CheckData.email,
        password: CheckData.password,
      })
      if (error) {
        console.error(error)
        alert("User does not exist")
        return
      }
      alert("Done user exists")
      navigate('/Homepage')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      {/* Background blobs */}
      <div className="bg-blobs">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar */}
      <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
        <div className="logo">Campus Lost &amp; Found</div>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
          <li>
            <Link to="/#home" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/#about" onClick={() => setMenuOpen(false)}>About</Link>
          </li>
          <li className="mobile-auth">
            <Link className="btn ghost" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </li>
          <li className="mobile-auth">
            <Link className="btn solid" to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </li>
        </ul>

        <div className="auth-buttons desktop-auth">
          <Link className="btn ghost" to="/login">Login</Link>
          <Link className="btn solid" to="/signup">Sign Up</Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="login-wrapper">

        {/* Left Brand Section */}
        <div className="brand-section">
          <h1>Campus Lost &amp; Found</h1>
          <p>
            Welcome back.<br />
            Let's get you reunited with what matters.
          </p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <h2>Login</h2>
          <p className="subtext">Enter your credentials to continue</p>

          <form onSubmit={checkData}>
            <div className="field">
              <input type="email" onChange={inputCheck} name="email" required />
              <label>Email Address</label>
            </div>

            <div className="field">
              <input type="password" onChange={inputCheck} name="password" required />
              <label>Password</label>
            </div>

           

            <button type="submit" className="login-btn">
              Login →
            </button>

            <p className="footer-text">
              Don't have an account?
              <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>

      </div>
    </>
  )
}

export default Login