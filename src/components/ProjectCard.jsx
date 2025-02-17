import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import SERVERURL from '../services/serverURL';



const ProjectCard = ({displayData}) => {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Card onClick={handleShow} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${SERVERURL}/uploads/${displayData?.projectImg}`}/>
      <Card.Body>
        <Card.Title>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>
  
    <Modal centered size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='img-fluid' src={`${SERVERURL}/uploads/${displayData?.projectImg}`} alt="" />
            </div>
            <div className='col-lg-6'>
              <h3>{displayData?.title}</h3>
              <h6 className='fw-bolder'>{displayData?.language}</h6>
              <p style={{textAlign:'justify'}}><span className='fw-bolder'></span>{displayData?.overview}
              </p>
            </div>
          </div>
          <div className='mt-2 float-start'>
            <a href={displayData?.github} className='btn btn-secondary' target='_blank'><i className='fa-brands fa-github '></i></a>
            <a href={displayData?.website} className='btn btn-secondary' target='_blank'><i className='fa-solid fa-link'></i></a>
          </div>
        </Modal.Body>  
      </Modal>

    </>
  )
}

export default ProjectCard