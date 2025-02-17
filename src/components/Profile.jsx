import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import profileImg from '../assets/profileimg.jpg'
import SERVERURL from '../services/serverURL';
import { updateUserAPI } from '../services/allAPI';


const Profile = () => {
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
  })
  const [preview,setPreview] = useState("")
  const [existingProfileImg,setExistingProfileImg] = useState("")
  const [open, setOpen] = useState(false);

  useEffect(()=>{
      if(sessionStorage.getItem('user')){
        const user = JSON.parse(sessionStorage.getItem('user'))
        setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
        setExistingProfileImg(user.profilePic)
      }
  },[open])

  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview("")
    }
  },[userDetails.profilePic])


  const handleUpdateProfile = async()=>{
    const {username,email,password,github,linkedin,profilePic} = userDetails
    if(github && linkedin){
      const reqBody = new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
       preview? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingProfileImg)
       const token = sessionStorage.getItem('token')
       if(token){
         const reqHeaders = {
           "Content-Type" : "multipart/form-data",
           "Authorization":`Bearer ${token}`
         }
         try{
          const result = await updateUserAPI(reqBody,reqHeaders)
          if(result.status==200){
            alert("Profile updated succesfully")
            sessionStorage.setItem('user',JSON.stringify(result.data))
            setOpen(!open)
          }else{
            console.log(result);
            
          }
         }catch(err){
          console.log(err); 
         }
    }
    }else{
      alert("Please fill the form completely")
    }
  }


  return (
    <>
      <div className='d-flex justify-content-evenly'>
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(!open)} className=' btn text-warning'><i className='fa-solid fa-chevron-down'></i></button>
      </div>
       <Collapse in={open}>
       <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded' id="example-collapse-text">
       <label className='text-center'>
              <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type='file' style={{display:'none'}}/>
              {
                existingProfileImg==""?
                <img src={preview?preview:profileImg} className='w-50 rounded-circle' alt="" />
                :
                <img src={preview?preview:`${SERVERURL}/uploads/${existingProfileImg}`} className='w-50 rounded-circle' alt="" />

              }
              </label>  
              <div className='w-100 mt-3'>
               <input type="text" value={userDetails.github}  onChange={e=>setUserDetails({...userDetails,github:e.target.value})} placeholder='user Github Profile link' className='form-control'/>
              </div>
              <div className='w-100 mt-3'>
               <input type="text"  value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} placeholder='user Linkedin Profile link' className='form-control'/>
              </div>
            <div className='grid text-center'>
            <button onClick={handleUpdateProfile}  className='mt-3 btn btn-warning'>Update Profile</button>
            </div>         
       </div>
     </Collapse>
    </>

  )
}

export default Profile