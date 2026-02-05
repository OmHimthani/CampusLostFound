import React, { useEffect, useState } from 'react'
import './css/LostItemsStyle.css'
import supabase from './client'

const FoundItems = () => {
    const [foundData,setFoundData]=useState([])
    const fetchFoundData = async () => {
        const { data, error } = await supabase.from("LostTable").select("*").order("created_at", { ascending: true })
    if(error){
        console.error(error)
        return;
    }
    setFoundData(data)
    }
    useEffect(()=>{
fetchFoundData()
    },[])
    
    

return (
    <>


         <div className="found-page">

      {/* 🔙 Back Button */}
      <button className="back-btn" onClick={() => navigate("/Homepage")}>
        ← Back to Dashboard
      </button>

      <h1 className="found-title">Lost Items</h1>

      <div className="found-grid">
        {foundData.map((value) => (
          <div className="found-card" key={value.id}>
            <div className="image-wrapper">
              <img src={value.image_url} alt={value.item_name} />
            </div>

            <div className="card-body">
              <h3>{value.item_name}</h3>

              <p>
                <strong>📍 Place Found:</strong><br />
                {value.place_found || "Not specified"}
              </p>

              <p>
                <strong>👤 Contact Name:</strong><br />
                {value.owner_name}
              </p>

              <p className="description">
                <strong>📝 Description:</strong><br />
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
    </>
)
}

export default FoundItems
