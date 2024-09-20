import React from 'react'
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='p-3 d-flex flex-row justify-content-between border border-dark'>
      <div className="logos" >
        <a href="#"><FaTwitter color='black' size={30}/></a>
        <a href="#"><FaFacebook color='black' size={30}/></a>
        <a href="#"><FaInstagram color='black' size={30}/></a>
      </div>
      <div>
        <p>&#169; 2022 Company, Inc</p>
      </div>
    </div>
  )
}

export default Footer
