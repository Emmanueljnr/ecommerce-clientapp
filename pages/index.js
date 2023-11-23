// pages/index.js
import React, { useEffect } from 'react';
import '../styles/global.css';
import { Product, FooterBanner, HeroBanner } from '../components';
import { useStateContext } from '../context/StateContext';
import products from '../data/productsData'; // Importing my local products data (mock data)
import bannerData from '../data/bannerData'; // Importing my local banner data (mock data)

const Home = () => {
  const { setCartItems } = useStateContext();

  useEffect(() => {
    // ...existing useEffect logic...
  }, [setCartItems]);
  
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
}

export default Home;
