// pages/index.js
import React, { useEffect } from 'react';
import '../styles/global.css';
import { Product, FooterBanner, HeroBanner } from '../components';
import { useStateContext } from '../context/StateContext';
import { useFetchProducts } from '../data/useFetchProducts';
import bannerData from '../data/bannerData'; // Importing my local banner data (mock data)

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //- Resolves issue related to Self Signed Cerificates (only for now, during developmnet)
const Home = () => {
  const { products, loading, error } = useFetchProducts();
  const { setCartItems } = useStateContext();

  useEffect(() => {
    //...existing useEffect logic...
  }, [setCartItems]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products.map((product) => <Product key={product.id} product={product} />)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
}

export default Home;















// // pages/index.js
// import React, { useEffect } from 'react';
// import Link from 'next/link'; // using next/Link to modify each link
// import '../styles/global.css';
// import { Product, FooterBanner, HeroBanner } from '../components';
// import { useStateContext } from '../context/StateContext';
// import { useFetchProducts } from '../data/useFetchProducts';
// // import products from '../data/productsData'; // Importing my local products data (mock data)
// import bannerData from '../data/bannerData'; // Importing my local banner data (mock data)

// const Home = () => {
//   //const { products, loading } = useFetchProducts();
//   const { products } = useFetchProducts();
//   const { setCartItems } = useStateContext();

//   // You may want to handle the loading state and errors here
//   // For simplicity, I'm just showing a loading text
//   //if (loading) return <p>Loading...</p>;

//   useEffect(() => {
//     //...existing useEffect logic...
//   }, [setCartItems]);
  
//   return (
//     <div>
//       <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
//       <div className="products-heading">
//         <h2>Best Selling Products</h2>
//         <p>Speakers of many variations</p>
//       </div>

//       <div className='products-container'>
//         {products.map((product) => <Product key={product._id} product={product} />)}
//       </div>
//       <FooterBanner footerBanner={bannerData && bannerData[0]} />
//     </div>
//   );
// }

// export default Home;
