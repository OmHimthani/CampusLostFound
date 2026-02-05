# 🎒 Campus Lost & Found

A modern web application that helps campus communities **report, track, and recover lost & found items** efficiently.  
Built with **React** and **Supabase**, featuring a clean dark UI and secure authentication.

---

## 🚀 Live Overview

Campus Lost & Found replaces traditional notice boards with a **real-time digital platform** where users can:
- Report lost items
- Report found items
- Browse all listings
- Contact the concerned person directly

---

## ✨ Features

### 🔐 Authentication
- Secure **Sign Up & Login** (Supabase Auth)
- Persistent sessions
- Protected routes
- Logout functionality

### 🧭 Dashboard
- Personalized greeting
- Modern left sidebar navigation
- Toggle-based “Add Item” menu
- Smooth animations

### 📦 Lost & Found System
- Add Lost Items
- Add Found Items
- Image upload support
- Description & contact details
- Responsive card-based item display

### 🎨 UI / UX
- Dark theme with glassmorphism
- Hover & click animations
- Consistent design across pages
- Fully responsive layout

---

## 🛠 Tech Stack

| Technology | Purpose |
|---------|---------|
| **React** | Frontend UI |
| **React Router** | Navigation & protected routes |
| **Supabase** | Authentication, Database, Storage |
| **CSS** | Custom dark UI styling |

---

## 📁 Project Structure

src/
├── components/
│ ├── FrontPage.jsx
│ ├── Login.jsx
│ ├── SignUp.jsx
│ ├── Homepage.jsx
│ ├── LostForm.jsx
│ ├── FoundForm.jsx
│ ├── LostItems.jsx
│ └── FoundItems.jsx
│
├── css/
│ ├── FrontPageStyle.css
│ ├── LoginStyle.css
│ ├── SignUpStyle.css
│ ├── Homepage.css
│ ├── LostFormStyle.css
│ ├── FoundFormStyle.css
│ ├── LostItemsStyle.css
│ └── FoundItemsStyle.css
│
├── client.js # Supabase config
├── App.jsx
└── main.jsx
