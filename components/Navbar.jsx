import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineUser, AiOutlineSearch } from 'react-icons/ai'; // Added AiOutlineSearch for search icon
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, filterProducts } = useStateContext();
  const [searchTerm, setSearchTerm] = useState('');

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   filterProducts(e.target.value); // This method needs to be implemented 
  // };
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
  filterProducts(e.target.value);
};

  return (
    <div className="navbar-container">
      <p className='logo'>
        <Link href="/">TheAmCo</Link>
      </p>
      


        {/* search bar */}
        <span className="search-container">
        <input
          style={{
            // fontSize: '10px',
            height: '35px',
            width: '250px', 
            color: 'gray',
            cursor: 'text',
            position: 'relative',
            border: '0.17rem solid gray',
            backgroundColor: 'transparent',
            marginRight: '1rem',
            padding: '0.5rem',
            outline: 'none',
            borderRadius: '4px' 
        }}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="button" className='login-icon'>
          <AiOutlineSearch />
        </button>
      </span>
      <div className='icons-container'>

        {/* Login */}
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
  );
};

export default Navbar;




// import React from 'react'
// import Link from 'next/link';
// import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai' //navbar icons for shopping cart and login
// import Cart  from './Cart';
// import { useStateContext } from '../context/StateContext';

// const Navbar = () => {
//   const {showCart, setShowCart, totalQuantities} = useStateContext();

//   return (
//     <div className="navbar-container">
//       <p className='logo'>
//         <Link href="/">TheAmCo</Link>
//       </p>
//       <div className='icons-container'>

//         <button type="button" className='login-icon' onClick={() => console.log('Navbar Login Button clicked')}>
//           <AiOutlineUser />
//         </button>
//         <button type="button" className='cart-icon' onClick={() => setShowCart(true)}>
//           <AiOutlineShopping />
//           <span className='cart-item-qty'>{totalQuantities}</span>
//         </button>

//         {showCart && <Cart />} {/* show the cart when 'showCart' is set to True  */}
//       </div>
//     </div>
//   )
// }

// export default Navbar