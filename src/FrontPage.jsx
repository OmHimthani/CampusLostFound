import React from 'react'
import './css/FrontPageStyle.css';
import { Link } from 'react-router-dom';
const FrontPage = () => {
 return (
   <>
   
<div className="bg-blobs">
    <span></span>
    <span></span>
    <span></span>
</div>

{/* <!-- Navbar --> */}
<nav className="navbar">
    <div className="logo">Campus Lost & Found</div>

    <ul className="nav-links">
        <li><a href="#home" className="active">Home</a></li>
        <li><a href="#about">About</a></li>
    </ul>

    <div className="auth-buttons">
        <Link  className='aaa btn ghost' to='/login'>Login</Link>
        <Link className='aaa btn solid' to='/signup'>Sign Up</Link>
    </div>
</nav>

{/* <!-- Hero --> */}
<section className="hero" id="home">
    <div className="hero-left">
        <h1>
            Find What’s Lost. <br/>
            <span>Return What’s Found.</span>
        </h1>
        <p>
            A next-gen campus platform designed to reconnect people
            with their belongings — fast, secure, and beautifully simple.
        </p>

        <div className="hero-actions">
            <button className="cta-main">Get Started</button>
            <button className="cta-secondary">Learn More</button>
        </div>
    </div>

    <div className="hero-right">
        <div className="floating-card">🎒 Backpack</div>
        <div className="floating-card">📱 Phone</div>
        <div className="floating-card">🪪 ID Card</div>
    </div>
</section>

{/* <!-- Divider --> */}
<div className="divider"></div>

{/* <!-- About Section --> */}
<section className="about" id="about">
    <h2>Why This Exists</h2>
    <p className="about-intro">
        Campuses lose hundreds of items daily.  
        This platform reduces chaos, saves time, and builds trust.
    </p>

    <div className="feature-grid">
        <div className="feature-card">
            <h3>⚡ Instant Reports</h3>
            <p>Post lost or found items in seconds with images and location.</p>
        </div>

        <div className="feature-card">
            <h3>🧠 Smart Discovery</h3>
            <p>Advanced filters help match items faster than notice boards.</p>
        </div>

        <div className="feature-card">
            <h3>🔐 Admin-Verified</h3>
            <p>Every listing is moderated to prevent fake claims.</p>
        </div>
    </div>
</section>

   </>
  );
}

export default FrontPage
