import React, { useState, useEffect } from 'react'
import './css/SignUpStyle.css'
import supabase from './client'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const [SubmitData, SetSubmitData] = useState({
    text: "",
    email: "",
    password: "",
    ComPass: ""
  })

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const inputData = (event) => {
    const name = event.target.name
    const value = event.target.value
    SetSubmitData({ ...SubmitData, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault()
    if (SubmitData.password === SubmitData.ComPass) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: SubmitData.email,
          password: SubmitData.password,
          options: {
            data: { first_name: SubmitData.text },
            emailRedirectTo: "https://campus-lost-found-iota.vercel.app/Homepage"
          }
        })
        if (error) {
          console.error(error)
          return
        }
        alert("User successfully created , check your email ")
        navigate('/')
      } catch (error) {
        alert(error)
      }
    } else {
      alert("Password does not match")
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
      <div className="signup-wrapper">

        {/* Brand / Context */}
        <div className="brand-section">
          <h1>Campus Lost &amp; Found</h1>
          <p>
            One account. One campus.<br />
            Find what's lost. Return what's found.
          </p>
        </div>

        {/* Signup Card */}
        <div className="signup-card">
          <h2>Create Your Account</h2>
          <p className="subtext">Use your campus credentials to continue</p>

          <form onSubmit={postData}>
            <div className="field">
              <input onChange={inputData} type="text" required name="text" />
              <label>Full Name</label>
            </div>

            <div className="field">
              <input onChange={inputData} type="email" required name="email" />
              <label>College Email</label>
            </div>

            <div className="field">
              <input onChange={inputData} type="password" required name="password" />
              <label>Password</label>
            </div>

            <div className="field">
              <input onChange={inputData} type="password" required name="ComPass" />
              <label>Confirm Password</label>
            </div>

            <button type="submit" className="signup-btn">
              Create Account →
            </button>

            <p className="footer-text">
              Already have an account?
              <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>

      </div>
    </>
  )
}

export default SignUp