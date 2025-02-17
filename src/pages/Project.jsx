import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { allProjectAPI } from '../services/allAPI'


const Project = () => {
  const [searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])
  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects = async ()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      try{
        const result = await allProjectAPI(searchKey,reqHeader)
        if(result.status==200){
          console.log(result.data);
          setAllProjects(result.data)
          
        }

      }catch(err){
        console.log(err);
        
      }
    }
  }
  
  return (
    <>
    <Header/>
    <div style={{paddingTop:'100px'}}>
      <div className='d-flex justify-content-center gap-2'>
        <h1>All Projects</h1>
        <input type="text" onChange={e=>setSearchKey(e.target.value)}  placeholder='Search projects by their language' className='form-control w-25'/>
      </div>
      <Row className='mt-3'>
       {
        allProjects?.length>0 ?
        allProjects?.map(project=>(
          <Col className='mb-3' sm={12} md={6} lg={4}>
          <ProjectCard displayData={project}/>
          </Col>
          
        ))
        :
        <div>Project not found !!</div>
       }
      </Row>
    </div>
    </>
  )
}

export default Project