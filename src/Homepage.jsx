import React, { useState, useEffect } from 'react'
import './css/Homepage.css'
import supabase from './client'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const Homepage = () => {
    const navigate=useNavigate()
    const[user,setUser]=useState(null)
    const getSession = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error(error);
            return;
        }

        // console.log(data.session);
        
       if (!data.session) return null;

  return {
    name: data.session.user.user_metadata.first_name,
    email: data.session.user.user_metadata.email,
  };
    };
    useEffect(() => {
       const fetchData=async()=>{
const data=await getSession()


setUser(data)


       }
       fetchData()
    //    console.log(user);
       
        


    }, [])
   function toggleAddItem() {
  const menu = document.getElementById("addItemMenu");
  const wrapper = menu.parentElement;

  menu.classList.toggle("open");
  wrapper.classList.toggle("open");
}
const logFunc=async()=>{
    await supabase.auth.signOut();
    navigate('/')

}
    return (
        <>





            <div className="layout">

                {/* <!-- Sidebar --> */}
                <aside className="sidebar">
                    <h2 className="HomeLogo">Lost & Found</h2>

                    <nav className="menu">
                        <a href="#" className="active">🏠 Dashboard</a>
                        <Link to='/LostItems'>🔍 All Lost Items</Link>
                        <Link to='/FoundItems'>📦 All Found Items</Link>
                        <div className="menu-toggle">
                            <button className="toggle-btn" onClick={()=>toggleAddItem()}>
                                ➕ Add Item
                            </button>

                            <div className="submenu" id="addItemMenu">
                                <Link to='/LostForm'>➕ Add Lost Item</Link>
                                <Link to='/FoundForm'>➕ Add Found Item</Link>
                            </div>
                        </div>
                    </nav>

                    <div className="sidebar-footer">
                        <button onClick={()=>logFunc()}>🚪 Logout</button>
                    </div>
                </aside>

                {/* <!-- Main Content --> */}
                <main className="content">
                    <h1>Hello, <span>{user?.name}</span> 👋</h1>

                    <div className="user-info">
                        <p><strong>Email:</strong> {user?.email}</p>
                        {/* <p><strong>Phone:</strong> +91 9XXXXXXXXX</p> */}
                    </div>

                    <div className="welcome-box">
                        <h3>Welcome to Campus Lost & Found</h3>
                        <p>
                            Use the menu on the left to browse lost or found items,
                            or report a new item to help someone on campus.
                        </p>
                    </div>
                </main>

            </div>

        </>
    )
}

export default Homepage
