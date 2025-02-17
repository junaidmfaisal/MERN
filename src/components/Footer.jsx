import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div style={{height:'300px'}} className="mt-5 container w-100">
    <div className='d-flex justify-content-between'>
        {/* intro */}
        <div style={{width:'400px'}}>
          <h5 ><i className='fa-brands fa-docker'></i>Project fair</h5>
          <p>
            Designed and built with all the love in the world by the luminar team with the help of our contributors
            </p>
            <p>Code licensed luminar,docs CC BY 3.0.</p>
            
          <p>Currently v5.3.2.</p>  
          
        </div>

        {/* Links */}
        <div className="d-flex flex-column">
          <h5>Links</h5>
          <Link to={'/'} style={{textDecoration:'none',color:'white'}}>Home Page</Link>
          <Link to={'/login'} style={{textDecoration:'none',color:'white'}}>Login Page</Link>
          <Link to={'/register'} style={{textDecoration:'none',color:'white'}}>Register Page</Link>


        </div>
        {/* Guides */}
       <div className="d-flex flex-column"> 
        <h5>Guides</h5>
        <a style={{textDecoration:'none',color:'white'}} target='-blank' href="https://react-bootstrap-v4.netlify.app/">React</a>
        <a style={{textDecoration:'none',color:'white'}} target='-blank' href="https://react-bootstrap-v4.netlify.app/">React-Bootstrap</a>
        <a style={{textDecoration:'none',color:'white'}} target='-blank' href="https://www.npmjs.com/package/react-router-dom">React-Router DOM</a>

       </div>

        {/* Contacts*/}
       <div className="d-flex flex-column"> 
        <h5>Contacts</h5>
        <div className="d-flex justify-content-between mt-3">
          <input type="text" placeholder="Email..." className="form-control me-2" />
          <button className="btn btn-info"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <div className="d-flex justify-content-between mt-3">
         
          <a href="https://x.com/?lang=en" style={{textDecoration:'none',color:'white'}}><i className="fa-brands fa-twitter"></i></a>
          <a href="https://www.instagram.com/" style={{textDecoration:'none',color:'white'}}><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F" style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-facebook"></i></a>
          <a href="https://www.linkedin.com/in/athuliya-p-s-3aba11215/" style={{textDecoration:'none',color:'white'}}><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/" style={{textDecoration:'none',color:'white'}}><i className="fa-brands fa-github"></i></a>
          <a href="https://github.com/" style={{textDecoration:'none',color:'white'}}><i className="fa-solid fa-phone"></i></a>

        </div>
        </div>
      </div>
      <p className="text-center mt-3"> September 2024 batch.©  Media Player.Built with React</p>  
    </div>
  )
}

export default Footer