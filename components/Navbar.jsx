import React from 'react'
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai' //navbar icons for shopping cart and login

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className='logo'>
        <Link href="/">TheAmCo</Link>
      </p>
      <div className='icons-container'>

        <button type="button" className='login-icon' onClick="">
          <AiOutlineUser />
        </button>
        <button type="button" className='cart-icon' onClick="">
          <AiOutlineShopping />
          <span className='cart-item-qty'>1</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar