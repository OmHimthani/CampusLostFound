import React, { useState } from 'react'
import './css/FoundFormStyle.css'
import supabase from './client'
import { useNavigate, Link } from 'react-router-dom'

const FoundForm = () => {
  const navigate = useNavigate()
  const [addItemOpen, setAddItemOpen] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [input, setInput] = useState({
    item_name: "", place_found: "", owner_name: "", owner_phone: "", description: ""
  })
  const [image, setImage] = useState(null)

  const getUrl = async (file) => {
    const filePath = `${file.name}-${Date.now()}`
    const { error } = await supabase.storage.from("image_bucket").upload(filePath, file)
    if (error) { console.error(error); return null }
    const { data } = await supabase.storage.from("image_bucket").getPublicUrl(filePath)
    return data.publicUrl
  }

  const handleInput = (e) => setInput({ ...input, [e.target.name]: e.target.value })
  const handleFile = (ev) => { if (ev.target.files?.[0]) setImage(ev.target.files[0]) }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let imageUrl = null
    if (image) imageUrl = await getUrl(image)
    const { error } = await supabase.from("FoundTable").insert({ ...input, image_url: imageUrl }).single()
    if (error) { console.error(error); return }
    setInput({ item_name: "", place_found: "", owner_name: "", owner_phone: "", description: "" })
    alert("Found item submitted!")
    navigate('/Homepage')
  }

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
          <Link to="/FoundItems" onClick={closeSidebar}>📦 All Found Items</Link>
          <div className={`menu-toggle${addItemOpen ? ' open' : ''}`}>
            <button className="toggle-btn" onClick={() => setAddItemOpen(!addItemOpen)}>➕ Add Item</button>
            <div className={`submenu${addItemOpen ? ' open' : ''}`}>
              <Link to="/LostForm" onClick={closeSidebar}>➕ Add Lost Item</Link>
              <Link to="/FoundForm" className="active" onClick={closeSidebar}>➕ Add Found Item</Link>
            </div>
          </div>
        </nav>
        <div className="sidebar-footer">
          <button onClick={logFunc}>🚪 Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="content">
        <div className="form-container">
          
          <h1>Report Found Item</h1>
          <p className="subtitle">Help someone on campus recover their belongings</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="field"><input type="text" placeholder='Item Name' name="item_name" value={input.item_name} onChange={handleInput} required /></div>
            <div className="field"><input type="file" placeholder='Item Image' accept="image/*" onChange={handleFile} /></div>
            <div className="field"><input type="text" placeholder='Place Found' name="place_found" value={input.place_found} onChange={handleInput} required /></div>
            <div className="field"><input type="text" placeholder='Person of Contact Name' name="owner_name" value={input.owner_name} onChange={handleInput} required /></div>
            <div className="field"><input type="tel" placeholder='Person of Contact Phone' name="owner_phone" value={input.owner_phone} onChange={handleInput} pattern="[0-9]{10}" required /></div>
            <div className="field"><textarea rows="4" placeholder='Description' name="description" value={input.description} onChange={handleInput} /></div>
            <button type="submit" className="submit-btn">Submit Found Item</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default FoundForm