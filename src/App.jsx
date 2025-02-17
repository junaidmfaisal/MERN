
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './contexts/AuthContextAPI'
import Pnf from './components/Pnf'


function App() {
    const {isAuthorised, setIsAuthorised} = useContext(tokenAuthContext)
     useEffect(()=>{
            if(sessionStorage.getItem('token')){
                setIsAuthorised(true)
            }else{
                setIsAuthorised(false)
            }
        },[isAuthorised])
  return (
    <>
      <Routes>
        <Route path={'/'} element ={<Home/>}/>
       {
        isAuthorised && 
        <>
        <Route path={'/dashboard'} element ={<Dashboard/>}/>
        <Route path={'/project'} element ={<Project/>}/>
        </>
       }
        <Route path={'/login'} element ={<Auth/>}/>
        <Route path={'/register'} element ={<Auth insideRegister ={true}/>}/>
        <Route path={'/*'} element ={<Pnf/>}/>

      </Routes>
      <Footer/>
    </>
  )
}

export default App
