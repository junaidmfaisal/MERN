import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min (1).css'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './contexts/ContextAPI.jsx'
import AuthContextAPI from './contexts/AuthContextAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthContextAPI>
     <ContextAPI>
       <BrowserRouter>
        <App />
        </BrowserRouter>
     </ContextAPI>
   </AuthContextAPI>
  </StrictMode>,
)
