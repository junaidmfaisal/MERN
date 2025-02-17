import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingimg from'../assets/landingimg.jpg'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
 import { getHomeProjectAPI } from '../services/allAPI'


const Home = () => {
  const[allHomeProjects,setAllHomeProjects] = useState([])
  
  const navigate = useNavigate()

  useEffect(()=>{
    getAllHomeProjects()
  },[])

   const getAllHomeProjects = async ()=>{
    try{
      const result = await getHomeProjectAPI()
      if(result.status==200){
        setAllHomeProjects(result.data)
      }else{
        
      }
    }catch(err){
      console.log(err);
      
    }
   }

  const handleProjects = ()=>{
    if(sessionStorage.getItem('token')){
      navigate('/project')
    }else{
      alert("Please login to view your projects!!")
    }
  }


  return (
   <>
        <div style={{minHeight:'100vh'}} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-lg-6'>
                        <h1 style={{fontSize:'80px'}}><i className='fa-brands fa-docker'></i>Project fair</h1>
                        <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, praesentium dolor temporibus blanditiis illo tenetur nemo assumenda inventore facilis beatae fugiat, mollitia porro earum vero excepturi architecto expedita odit reprehenderit! </p>
                        {
                          sessionStorage.getItem("token")?
                          <Link to={'/dashboard'} className='btn btn-warning'>Manage your account</Link>
                          :
                          <Link to={'/login'} className='btn btn-warning'>starts to explore</Link>
                        }
                    </div>
                    <div className='col-lg-6'>
                    <img src={landingimg} className='img-fluid' alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div  className='mt-5 text-center'>
            <h1>Explore Our Projects</h1>
            <marquee>
                <div className='d-flex'>
                    {
                      allHomeProjects?.map(project=>(
                        <div className='me-5'>
                    <ProjectCard displayData={project}/>
                    </div>
                      ))
                    }
                </div>
            </marquee>
             <button onClick={handleProjects} className='btn btn-link mt-5'>Click here to view projects </button>          
        </div>
      <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
        <h1>Our Testimonials</h1>
        <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center  flex-column'>
            <img  width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=900&h=500&s=1" alt="" /><span>Rachel</span>
        </Card.Title>
        <Card.Text>
          <div className='mt-2 d-flex justify-content-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
          </div>
          <p style={{textAlign:'justify'}}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod maxime, ea architecto facilis totam ratione corrupti. Delectus quo nemo optio fuga unde culpa dignissimos, dolorum sit similique placeat eum repellendus!
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
        </div>
      </div>
   </>
  )
}

export default Home