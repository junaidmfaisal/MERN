import React, { useEffect, useState,useContext } from 'react'
import Edit from './Edit'
import Add from './Add'
import { userProjectAPI, userProjectDeleteAPI } from '../services/allAPI'
import { addprojectResponseContext, editprojectResponseContext } from '../contexts/ContextAPI'


const View = () => {
  const {editProjectResponse,setEditProjectResponse} =  useContext(editprojectResponseContext)
  const {addProjectResponse,setAddProjectResponse} =  useContext(addprojectResponseContext)
  const [userProject, setUserProject] = useState([])

 useEffect(()=>{
  getUserProjects()
 },[addProjectResponse,editProjectResponse])


  const getUserProjects = async ()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      try{
        const result = await userProjectAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          setUserProject(result.data)
        }
        
      }catch(err){
        console.log(err);
        
      }

    }
  }

  const deleteProject = async (id)=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      try{
        await userProjectDeleteAPI(id, reqHeader)
        getUserProjects()
      }catch(err){
        console.log(err);  
      }
    }
  }


  return (
    <>
      <div className='d-flex justify-content-between'>
        <h2 className='text-warning'>All Projects</h2>
        <div>
          <Add/>
        </div>
      </div>
      <div className='mt-2 allprojects'>
       {
        userProject?.length >0 ?
        userProject?.map((project)=>(
          <div className='border rounded p-2 d-flex justify-content-between mb-3'>
          <div>
            <h3>{project?.title}</h3>
            <div className='d-flex align-items-center'>
              <div><Edit project={project}/></div>
              <div className='btn'><a target='_blank' href={project?.github}><i className='fa-brands fa-github'></i></a></div>
              <button onClick={()=>deleteProject(project?._id)} className='btn text-danger'><i className='fa-solid fa-trash'></i></button>
            </div>
          </div>
        </div>
        ))
        :
        <div className='text-warning'>No Projects added</div>
        
       }
      </div>
    </>
  )
}

export default View