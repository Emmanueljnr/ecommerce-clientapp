import React, { useEffect } from 'react'
import {client} from '../lib/client'
import '../styles/global.css';
import { Product, FooterBanner, HeroBanner } from '../components';
import { useStateContext  } from '../context/StateContext';  // Import the context hook
// import products from '../data/productsData'; // Importing my local products data (mock data)

const Home = ({products, bannerData}) => {
  const { setCartItems } = useStateContext(); // Use the hook to access context methods

  useEffect(() => {
    // Check for a 'paymentCancelled' query parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('paymentCancelled')) {
      // Restore the cart from localStorage if the payment was cancelled
      const cartFromStorage = localStorage.getItem('cart');
      if (cartFromStorage) {
        setCartItems(JSON.parse(cartFromStorage));
      }
    }
  }, [setCartItems]);
  
  return (
    <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
    {console.log( "my products are", products)}
    {console.log( "Banner Data is", bannerData)}

    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className='products-container'>
      {products?.map((product) => <Product key={product._id} product={product}/>)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
}

//whatever this function returns will be used to populate the function above
//https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  //Fetch data for the banner
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;