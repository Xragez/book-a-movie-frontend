import React from 'react'
import notfoundImg from '../../assets/images/404_page.svg'

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img 
      src={notfoundImg}
      className="img-fluid m-5"
      style = {{width: "50rem"}} />
      <h2>404 not found</h2>
    </div>

  )
}
