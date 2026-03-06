import React, { useEffect, useState } from 'react'
import './css/LostItemsStyle.css'
import supabase from './client'
import { useNavigate, Link } from 'react-router-dom'

const LostItems = () => {
  const navigate = useNavigate()
  const [lostData, setLostData] = useState([])
  const [addItemOpen, setAddItemOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const fetchLostData = async () => {
    const { data, error } = await supabase.from("LostTable").select("*").order("created_at", { ascending: false })
    if (error) { console.error(error); return }
    setLostData(data)
  }

  useEffect(() => { fetchLostData() }, [])

  const logFunc = async () => { await supabase.auth.signOut(); navigate('/') }
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="layout">

      {/* Mobile topbar */}
      <div className="topbar">
        <button className="topbar-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
          <span></span><span></span><span></span>
        </button>
        <span className="topbar-logo">Lost &amp; Found</span>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <h2 className="HomeLogo">Lost &amp; Found</h2>
        <nav className="menu">
          <Link to="/Homepage" onClick={closeSidebar}>🏠 Dashboard</Link>
          <Link to="/LostItems" className="active" onClick={closeSidebar}>🔍 All Lost Items</Link>
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
        <h1 className="page-title">Lost Items</h1>
        <p className="page-subtitle">Browse items reported lost across campus</p>

        {lostData.length === 0 ? (
          <p className="empty-state">No lost items reported yet.</p>
        ) : (
          <div className="items-grid">
            {lostData.map((value) => (
              <div className="item-card" key={value.id}>
                <div className="image-wrapper">
                  <img src={value.image_url} alt={value.item_name} className="img-bg" />
                  <img src={value.image_url} alt={value.item_name} className="img-main" />
                </div>
                <div className="card-body">
                  <h3>{value.item_name}</h3>
                  <p><strong>📍 Last Seen:</strong><br />{value.place_found || "Not specified"}</p>
                  <p><strong>👤 Contact Name:</strong><br />{value.owner_name}</p>
                  <p><strong>📞 Contact Number:</strong><br />{value.owner_phone}</p>
                  <p className="description"><strong>📝 Description:</strong><br />{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default LostItems