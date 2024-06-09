import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


const Cardpart = ({ id, title, content, onDelete }) => {
 
  const handleDeleteOne = () => {
    onDelete()
  }

  return (
    <>
     <Card style={{minHeight:'150px', width:'25rem', alignSelf:'start', marginRight:'20px', backgroundColor:'lightgray'}}>
         <Card.Body>
             <h5 className='mt-3 d-flex justify-content-between'>
                  {title}
                 <span>
                     <Link to={`/edit/${id}`} className='fw-bold' >
                         <i className="fa-solid fa-file-pen fa-sm" ></i>              
                     </Link>
                     <button className='btn btn-lg' onClick={handleDeleteOne}>
                         <i style={{color:'red'}} className='fa-solid fa-trash'></i>
                     </button>
                 </span>
             </h5>
             <Card.Text dangerouslySetInnerHTML={{__html: content}} />
         </Card.Body>
      </Card>
    </>
  )
}

export default Cardpart