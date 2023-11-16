import React from 'react'
import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      {/* <p>2023 ThreeAmigos Corp. All right reserved</p> */}
      <p>COPYRIGHT © 2023 THREEAMIGOSCORP.COM. ALL RIGHTS RESERVED. SEE OUR <a href="/terms" style={{ textDecoration: 'underline' }}>TERMS OF USE</a> AND <a href="/privacy" style={{ textDecoration: 'underline' }}>PRIVACY NOTICE</a>.</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer