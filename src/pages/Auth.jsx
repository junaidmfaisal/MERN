import React, { useContext, useState } from 'react'
import authImg from '../assets/loginImg.avif'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import Spinner from 'react-bootstrap/Spinner'
import { tokenAuthContext } from '../contexts/AuthContextAPI'


const Auth = ({insideRegister}) => {
  const {isAuthorised, setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const [isLogined,setIsLogined] = useState(false)
  const [inputData,setInputData] = useState({
    username:'',
    email:'',
    password:''
  })
  console.log(inputData);

  const handleRegister = async(e)=>{
    e.preventDefault()
    console.log("inside register form");
    if(inputData.username && inputData.email && inputData.password){
      // alert("Make api call")
     try{
      const result = await registerAPI(inputData)
      console.log(result);
      if(result.status == 200){
         alert(`Welcome ${result.data?.username} Please login to explore our website!!!.... `)
         navigate('/login')
         setInputData({username:"",email:"",password:""})
      }else{
        if(result.response.status==406){
          alert(result.response.data)
          // console.log("registeration failed");
          setInputData({username:"",email:"",password:""})
        }
      }
     }catch(err){
      console.log(err);  
     }

    }else{
      alert("Please fill the form completely")
    }
  }



  // login
  const handleLogin = async(e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
      try{
        const result = await loginAPI(inputData)
        if(result.status==200){
        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        sessionStorage.setItem("token",result.data.token)
        setIsAuthorised(true)
        setIsLogined(true)
        setTimeout(()=>{
          setInputData({username:'',  email:'', password:''})
           navigate('/')
           setIsLogined(false)
        },2000)
     }else{
      if(result.response.status==404){
        alert(result.response.data)
      }
     }
    }catch(err){
        console.log(err);
    }     
  }else{
    alert("Please fill the form completely")
  }
}

  return (
    <div style={{minHeight:'100vh', width:'100%'}} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <div className='shadow card p-2'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img src={authImg} style={{width:"350px"}} alt="" />
            </div>
              <div className='col-lg-6'>
              <h1 style={{fontSize:'80px'}}><i className='fa-brands fa-docker'></i>Project fair</h1>
               <h5 className='mt-2'>Sign {insideRegister? "Up" :"In"} to your account</h5>
           <Form>
        {
          insideRegister &&
          <FloatingLabel controlId="floatingInput" label="User Name"  className="mb-3"
        >
         <Form.Control   onChange={e=>setInputData({...inputData,username:e.target.value})}
           type="text" placeholder="name" />
        </FloatingLabel>
        }
           <FloatingLabel    controlId="floatingInput"   label="Email address"  className="mb-3"
      >
       <Form.Control  onChange={e=>setInputData({...inputData,email:e.target.value})}
        type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel  controlId="floatingInput" label="Password" className="mb-3"
      >
       <Form.Control  onChange={e=>setInputData({...inputData,password:e.target.value})}
         type="password" placeholder="password" />
      </FloatingLabel>
      {
        insideRegister ?
        <div>
          <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
          <p>Already user? Please click here to <Link to={'/login'}>Login</Link></p>
        </div>
        :
        <div>
          <button onClick={handleLogin} className='btn btn-primary mb-2'>Login
          {
            isLogined && <Spinner animation="border" variant="light" />
          }
          </button>
          <p>Already user? Please click here to <Link to={'/register'}>Register</Link></p>
        </div>
      }
           </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth