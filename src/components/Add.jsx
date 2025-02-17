import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { addProjectAPI } from '../services/allAPI';
import uploadImg from '../assets/upload.webp'
import {addprojectResponseContext} from '../contexts/ContextAPI'



const Add = () => {
  const {addProjectResponse,setAddProjectResponse} =  useContext(addprojectResponseContext)
  const [preview,setPreview] = useState()
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [projectDetails, setProjectDetails] = useState({
    title:"",language:"",overview:"",github:"",website:"",projectImg:""
  })
  console.log(projectDetails);
  
  const [show, setShow] = useState(false);
  useEffect(()=>{
    if(projectDetails.projectImg.type=='image/png' || projectDetails.projectImg.type=='image/jpeg' ||projectDetails.projectImg.type=='image/jpg' ){
         // valid image
        setImageFileStatus(true)
        setPreview(URL.createObjectURL(projectDetails.projectImg))
    }else{
      setPreview("")
      setImageFileStatus(false)
     setProjectDetails({...projectDetails,projectImg:""})
    }  
  },[projectDetails.projectImg])

  const handleClose = () => {
        setPreview("")
        setImageFileStatus(false)
        setProjectDetails({
          title:"", language:"", overview:"",github:"", website:"",projectImg:""
        })
        setShow(false);
  }
    const handleShow = () => setShow(true);

    const handleAddProject = async ()=>{
      const {title,language,overview,github,website,projectImg} = projectDetails
      if(title && language && overview && github && website &&projectImg){
        // alert("API call")
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("overview",overview)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("projectImg",projectImg)
        const token = sessionStorage.getItem('token')
        if(token){
          const reqHeaders = {
            "Content-Type" : "multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          // make API
          try{
            const result = await addProjectAPI(reqBody,reqHeaders)
            if(result.status==200){
              alert("Project added succesfully")
              setAddProjectResponse(result)
              handleClose()
            }else{
              alert(result.response.data.error ||"something went wrong")
            }
          }catch(err){
            console.log(err);  
          }
        }else{
          alert("Please fill the form")
      }
      }
    }
  
  return (
    <>
    <button onClick={handleShow} className='btn btn-primary'>+ New Project</button>
    <Modal  show={show}  size='lg' centered onHide= {handleClose} backdrop="static" keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row align-items-center'>
          <div className='col-lg-4'>
             <label>
              <input  onChange={(e)=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type='file' style={{display:'none'}}/>
              <img src={preview?preview:uploadImg} className='w-50' alt="" />
              </label>            
              {
                !imageFileStatus && <div className='text-warning fw-bolder text-justify'>Lorem ipsum dolor  sit amet consectetur adipisicing elit. Maxime quasi </div>
              }
            </div>
          <div  className='col-lg-8' >
            
          <div className='mb-2'>
                <input value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} type="text"  placeholder='project title' className='form-control'/>
          </div>    
          <div className='mb-2'>
                <input value={projectDetails.language} type="text" onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}  placeholder='Language used in project' className='form-control'/>
          </div>    
          <div className='mb-2'>
                <input value={projectDetails.overview} type="text" onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} placeholder='Project Overview' className='form-control'/>
          </div>    
          <div className='mb-2'>
                <input value={projectDetails.github} type="text" onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} placeholder='Project Github Link' className='form-control'/>
          </div>    
          <div className='mb-2'>
                <input value={projectDetails.website} type="text" onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}  placeholder='Project website link' className='form-control'/>
          </div>             
            </div>
           </div>
         
        </Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button  onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add