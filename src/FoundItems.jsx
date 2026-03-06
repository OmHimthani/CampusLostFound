import React, { useEffect, useState } from 'react'
import './css/FoundItemsStyle.css'
import supabase from './client'
import { useNavigate, Link } from 'react-router-dom'

const FoundItems = () => {
  const navigate = useNavigate()
  const [foundData, setFoundData] = useState([])
  const [addItemOpen, setAddItemOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const fetchFoundData = async () => {
    const { data, error } = await supabase.from("FoundTable").select("*").order("created_at", { ascending: true })
    if (error) { console.error(error); return }
    setFoundData(data)
  }

  useEffect(() => { fetchFoundData() }, [])

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
          <Link to="/LostItems" onClick={closeSidebar}>🔍 All Lost Items</Link>
          <Link to="/FoundItems" className="active" onClick={closeSidebar}>📦 All Found Items</Link>
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
        <h1 className="page-title">Found Items</h1>
        <p className="page-subtitle">Browse items found across campus</p>

        {foundData.length === 0 ? (
          <p className="empty-state">No found items reported yet.</p>
        ) : (
          <div className="items-grid">
            {foundData.map((value) => (
              <div className="item-card" key={value.id}>
                <div className="image-wrapper">
                  <img src={value.image_url} alt={value.item_name} className="img-bg" />
                  <img src={value.image_url} alt={value.item_name} className="img-main" />
                </div>
                <div className="card-body">
                  <h3>{value.item_name}</h3>
                  <p><strong>📍 Place Found:</strong><br />{value.place_found}</p>
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

export default FoundItems