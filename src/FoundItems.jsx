import React, { useEffect, useState } from 'react'
import './css/FoundItemsStyle.css'
import supabase from './client'
import { Navigate, useNavigate } from 'react-router-dom'

const FoundItems = () => {
    const navigate=useNavigate()
    const [foundData,setFoundData]=useState([])
    const fetchFoundData = async () => {
        const { data, error } = await supabase.from("FoundTable").select("*").order("created_at", { ascending: true })
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
      <button
        className="back-btn"
        onClick={() => navigate("/Homepage")}
      >
        ← Back to Dashboard
      </button>
            <h1 className="found-title">Found Items</h1>

            <div className="found-grid">

                {/* <!-- Card 1 --> */}
                {foundData.map((value)=>{
                    return(
                <div className="found-card" key={value.id}>
                    <div className="image-wrapper">
                        <img src={value.image_url} alt="Wallet" />
                    </div>

                    <div className="card-body">
                        <h3>{value.item_name}</h3>

                        <p>
                            <strong>📍 Place Found:</strong><br />
                            {value.place_found}
                        </p>

                        <p>
                            <strong>👤 Contact Name:</strong><br />
                            {value.owner_name}
                        </p>

                        <p>
                            <strong>📞 Contact Number:</strong><br />
                            {value.owner_phone}
                        </p>
                        <p className="description">
                            <strong>📝 Description:</strong><br />
                            {value.description}
                        </p>
                    </div>
                </div>
                    )
                })}
            </div>

        </div>

    </>
)
}

export default FoundItems
