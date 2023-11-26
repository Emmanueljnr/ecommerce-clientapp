import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import getStripe from '../lib/getStripe';
import Image from 'next/image';
import productsData from '../data/productsData'; // Import my local products data


const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/Stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    if (response.statusCode === 500) return;

    const data = await response.json();

    //toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'> ({totalQuantities} items)</span>
        </button>
        {/* If there are no items at all in the shopping cart,display the following div */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping Bag is Emnpty</h3>
            <Link href="/">
              <button type="button" onClick={() => { setShowCart(false) }} className='btn'>
                continue shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => {
            const localProduct = productsData.find(p => p._id === item._id); // Find the local product data by matching the _id from the cart item
            const imageUrl = localProduct ? localProduct.image[0] : ''; // Use the image URL from my local product data

            return (
              <div className="product" key={item._id}>
                {imageUrl && (
                  <Image 
                    src={imageUrl}
                    alt={item.name}
                    className="cart-product-image" 
                    width={500} 
                    height={300}
                  />
                )}
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className="quantity-desc">
                        {/* My 'toggleCartItemQuanitity' function in the StateContext is set to look for a value that is either 'inc' or 'dec' */}
                        <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}><AiOutlineMinus /></span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></span>
                      </p>
                    </div>
                    <button type="button" className='remove-item' onClick={() => onRemove(item)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart


