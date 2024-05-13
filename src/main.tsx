import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const base = document.createElement('base')
base.href = import.meta.env.BASE_URL
document.head.insertBefore(base, document.head.firstChild)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
