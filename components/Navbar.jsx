import React from 'react'
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai' //navbar icons for shopping cart and login
import Cart  from './Cart';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();

  return (
    <div className="navbar-container">
      <p className='logo'>
        <Link href="/">TheAmCo</Link>
      </p>
      <div className='icons-container'>

        <button type="button" className='login-icon' onClick={() => console.log('Navbar Login Button clicked')}>
          <AiOutlineUser />
        </button>
        <button type="button" className='cart-icon' onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>

        {showCart && <Cart />} {/* show the cart when 'showCart' is set to True  */}
      </div>
    </div>
  )
}

export default Navbar