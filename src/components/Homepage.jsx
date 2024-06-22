import React from 'react'
import printer from "../assets/kyocera.png"
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <div className='container'>
      <h1>Kenindia Toner Management</h1>
      <img className='home_img' src={printer} alt="" />
      <h3>Click on proceed to request for a toner</h3>
      <Link to={"/toner_request"}>
        <button className='btn'>Proceed</button>
      </Link>
    </div>
  )
}

export default Homepage