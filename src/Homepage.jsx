import React, { useState, useEffect } from 'react'
import './css/Homepage.css'
import supabase from './client'
import { Link, useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [addItemOpen, setAddItemOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) { console.error(error); return }
    if (!data.session) return null
    return {
      name: data.session.user.user_metadata.first_name,
      email: data.session.user.user_metadata.email,
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSession()
      setUser(data)
    }
    fetchData()
  }, [])

  const logFunc = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <>
      <div className="layout">

        {/* Mobile topbar */}
        <div className="topbar">
          <button className="topbar-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            <span></span><span></span><span></span>
          </button>
          <span className="topbar-logo">Lost &amp; Found</span>
        </div>

        {/* Overlay */}
        {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

        {/* Sidebar */}
        <aside className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
          <h2 className="HomeLogo">Lost &amp; Found</h2>
          <nav className="menu">
            <a href="#" className="active" onClick={closeSidebar}>🏠 Dashboard</a>
            <Link to="/LostItems" onClick={closeSidebar}>🔍 All Lost Items</Link>
            <Link to="/FoundItems" onClick={closeSidebar}>📦 All Found Items</Link>
            <div className={`menu-toggle${addItemOpen ? ' open' : ''}`}>
              <button className="toggle-btn" onClick={() => setAddItemOpen(!addItemOpen)}>➕ Add Item</button>
              <div className={`submenu${addItemOpen ? ' open' : ''}`}>
                <Link to="/LostForm" onClick={closeSidebar}>➕ Add Lost Item</Link>
                <Link to="/FoundForm" onClick={closeSidebar}>➕ Add Found Item</Link>
              </div>
            </div>
          </nav>
          <div className="sidebar-footer">
            <button onClick={logFunc}>🚪 Logout</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="content">

          {/* Greeting */}
          <div className="dash-hero">
            <div className="dash-hero-left">
              <h1>Welcome back, <span>{user?.name}</span> 👋</h1>
              <p className="dash-sub">{user?.email}</p>
              <p className="dash-desc">
                Use the sidebar to browse lost or found items, or report a new one to help someone on campus.
              </p>
              <div className="dash-actions">
                <Link to="/LostForm" className="dash-btn primary">Report Lost Item</Link>
                <Link to="/FoundForm" className="dash-btn secondary">Report Found Item</Link>
              </div>
            </div>

            {/* Floating cards */}
            <div className="dash-hero-right">
              <div className="floating-card">🎒 Backpack</div>
              <div className="floating-card">📱 Phone</div>
              <div className="floating-card">🪪 ID Card</div>
            </div>
          </div>

          {/* Info cards */}
          <div className="info-grid">
            <div className="info-card">
              <h3>⚡ Instant Reports</h3>
              <p>Post lost or found items in seconds with images and location.</p>
            </div>
            <div className="info-card">
              <h3>🧠 Smart Discovery</h3>
              <p>Advanced filters help match items faster than notice boards.</p>
            </div>
            <div className="info-card">
              <h3>🔐 Admin-Verified</h3>
              <p>Every listing is moderated to prevent fake claims.</p>
            </div>
          </div>

        </main>
      </div>
    </>
  )
}

export default Homepage