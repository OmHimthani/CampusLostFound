import React, { useState } from 'react'
// import './css/FoundFormStyle.css'
import supabase from './client'
import './css/LostFormStyle.css'
import { Navigate, useNavigate } from 'react-router-dom'
const LostForm = () => {
    const navigate=useNavigate()
    const [input, setInput] = useState({
        item_name: "",
        
        owner_name: "",
        owner_phone: "",
        description: ""
    })
    const [image, setImage] = useState(null)
    const getUrl = async (file) => {
        const filePath = `${file.name}-${Date.now()}`
        const { error } = await supabase.storage.from("image_bucket").upload(filePath, file);
        if (error) {
            console.error(error);
            return null
        }
        const {data}=await supabase.storage.from("image_bucket").getPublicUrl(filePath);
return data.publicUrl;
    }
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value })

    }
    const handleFile = (ev) => {
        if (ev.target.files && ev.target.files.length > 0) {
            setImage(ev.target.files[0])

        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
         let imageUrl = null;
        if (image) {
            imageUrl = await getUrl(image);
        }
        const { error } = await supabase.from("LostTable").insert({...input,image_url:imageUrl}).single();
        if (error) {
            console.error(error)
            return;
        }
       
        setInput({
            item_name: "",
            
            owner_name: "",
            owner_phone: "",
            description: ""
        })
    }
    return (
        <>


             <div className="form-page">
      <div className="form-container">

        {/* 🔙 Back Button */}
        <button
          className="back-btn"
          onClick={() => navigate("/Homepage")}
        >
          ← Back to Dashboard
        </button>

        <h1>Report Lost Item</h1>
        <p className="subtitle">
          Provide details to help recover a lost item
        </p>

        <form className="form" onSubmit={handleSubmit}>

          <div className="field">
            <label>Item Name</label>
            <input
              type="text"
              name="item_name"
              value={input.item_name}
              onChange={handleInput}
              required
            />
          </div>

          <div className="field">
            <label>Item Image</label>
            <input type="file" accept="image/*" onChange={handleFile} />
          </div>

          <div className="field">
            <label>Person of Contact Name</label>
            <input
              type="text"
              name="owner_name"
              value={input.owner_name}
              onChange={handleInput}
              required
            />
          </div>

          <div className="field">
            <label>Person of Contact Phone</label>
            <input
              type="tel"
              name="owner_phone"
              value={input.owner_phone}
              onChange={handleInput}
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              rows="4"
              name="description"
              value={input.description}
              onChange={handleInput}
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Lost Item
          </button>

        </form>
      </div>
    </div>
        </>
    )
}

export default LostForm
