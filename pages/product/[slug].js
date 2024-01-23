// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Using React Hooks Instead of 'getServerSideProps' >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// pages/product/[slug].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from '../../components/Product';
import { useStateContext } from '../../context/StateContext';
import Image from 'next/image';


// Custom hook to fetch product data
const useProductData = (slug) => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProductData = async () => {
      setLoading(true);
      try {
        // Fetch product details
        const productRes = await fetch(`https://localhost:7265/Products/${slug}`);
        if (!productRes.ok) throw new Error('Failed to fetch the product.');
        const productData = await productRes.json();

        // Fetch related products
        const relatedRes = await fetch('https://localhost:7265/Products/database');
        if (!relatedRes.ok) throw new Error('Failed to fetch related products.');
        let relatedProductsData = await relatedRes.json();
        relatedProductsData = relatedProductsData.filter((item) => item.slug !== slug);

        setProduct(productData);
        setProducts(relatedProductsData);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  return { product, products, loading, error };
};

const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL
  const { product, products, loading, error } = useProductData(slug);
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

  // Function to handle 'Buy Now' action
  const handleBuyNow = async (product, quantity) => {
    onAdd(product, quantity);
    setShowCart(true);
  };

  // Early return for loading state
  if (loading) return <div>Loading...</div>;
  
  // Early return for error state
  if (error) return <div>Error: {error.message}</div>;
  
  // Early return if product not found
  if (!product) return <div>Product not found</div>;

  // Destructure product data for easy access
  const { image, name, details, price } = product;

  // Rest of your component...
  // Your JSX goes here...

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              className="product-detail-image"
              src={product.image[index]}
              alt={name}
              width={350}
              height={350}
              priority //tells next.js that this is a large image and should be preloaded ASAPS
            />
          </div>
          <div className="small-images-container">
            {product.image.map((img, i) => (
              <Image
                className={i === index ? 'small-image selected-image' : 'small-image'}
                key={i}
                src={img}
                alt={`${name} - Image ${i}`}
                width={70}
                height={70}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={() => handleBuyNow(product, qty)}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item.id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
};

export default ProductDetails;













// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< OG Version2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//pages/product/[slug].js
// import React, { useState } from 'react';
// import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
// import Product from '../../components/Product';
// import { useStateContext } from '../../context/StateContext';
// import Image from 'next/image';

// const ProductDetails = ({ product, products }) => {
//   // Ensure product is not null or undefined
//   // if (product) {
//   //   return <div>we got em...</div>; 
//   // }

//   const { image, name, details, price, id } = product;
//   const [index, setIndex] = useState(0);
//   const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

//   // Code for 'Buy Now Button/Option'
//   const handleBuyNow = async (product, quantity) => {
//     onAdd(product, quantity);
//     setShowCart(true);
//   };

//   return (
//         <div>
//           <div className="product-detail-container">
//             <div>
//               <div className="image-container">
//                 <Image
//                   className="product-detail-image"
//                   src={product.image[index]}
//                   alt={name}
//                   width={350}
//                   height={350}
//                 />
//               </div>
//               <div className="small-images-container">
//                 {product.image.map((img, i) => (
//                   <Image
//                     className={i === index ? 'small-image selected-image' : 'small-image'}
//                     key={i}
//                     src={img}
//                     alt={`${name} - Image ${i}`}
//                     width={70}
//                     height={70}
//                     onMouseEnter={() => setIndex(i)}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="product-detail-desc">
//               <h1>{name}</h1>
//               <div className="reviews">
//                 <div>
//                   <AiFillStar />
//                   <AiFillStar />
//                   <AiFillStar />
//                   <AiFillStar />
//                   <AiOutlineStar />
//                 </div>
//                 <p>
//                   (20)
//                 </p>
//               </div>
//               <h4>Details: </h4>
//               <p>{details}</p>
//               <p className="price">${price}</p>
//               <div className="quantity">
//                 <h3>Quantity:</h3>
//                 <p className="quantity-desc">
//                   <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
//                   <span className="num">{qty}</span>
//                   <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
//                 </p>
//               </div>
//               <div className="buttons">
//                 <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
//                 <button type="button" className="buy-now" onClick={() => handleBuyNow(product, qty)}>Buy Now</button>
//               </div>
//             </div>
//           </div>
    
//           <div className="maylike-products-wrapper">
//               <h2>You may also like</h2>
//               <div className="marquee">
//                 <div className="maylike-products-container track">
//                   {products.map((item) => (
//                     <Product key={item._id} product={item} />
//                   ))}
//                 </div>
//               </div>
//           </div>
//         </div>
//       )
// };

// This function gets called at request time
// export const getServerSideProps = async ({ params }) => {
//   // Mock product data
//   const product = {
//     "type": "product",
//     "name": "Wireless Earbuds",
//     "details": "Wireless Earbuds Bluetooth 5.3 Headphones In-Ear With Hi-Fi Stereo 40H Bluetooth Ear Buds With 4 ENC Noise Cancelling Mics IP7 Waterproof Wireless Earphones LED Display USB-C For Android/Ios Pink",
//     "id": "27894423-db97-4361-bfac-04403ff23842",
//     "slug": "wireless_earbuds_27894423-db97-4361-bfac-04403ff23842",
//     "price": 12.99,
//     "createdAt": "0001-01-01T00:00:00",
//     "updatedAt": "0001-01-01T00:00:00",
//     "image": [
//       "https://m.media-amazon.com/images/I/41yPTh07s3L._SL500_.jpg",
//       "https://m.media-amazon.com/images/I/51UBjoGLG8L._SL500_.jpg",
//       "https://m.media-amazon.com/images/I/51kvGYnNocL._SL500_.jpg",
//       "https://m.media-amazon.com/images/I/51HB4fE7+zL._SL500_.jpg",
//       "https://m.media-amazon.com/images/I/51M1PseU36L._SL500_.jpg",
//       "https://m.media-amazon.com/images/I/414vUJ0k09L._SL500_.jpg",
//       "https://m.media-amazon.com/images/I/51JrkpQqdmL._SL500_.jpg"
//     ]
//   };

//   // Mock related products data (could be empty or some dummy products)
//   const relatedProducts = [];

//   // Return the mock data as props
//   return { props: { product, products: relatedProducts } };
// };

// export const getServerSideProps = async ({ params }) => {
//   try {
//     const apiUrl = `https://localhost:7265/Products/${params.slug}`;
//     console.log(`Fetching product details from: ${apiUrl}`);
//     const productRes = await fetch(apiUrl, {
//       // Include these options if you have SSL/TLS issues
//       agent: new https.Agent({
//         rejectUnauthorized: false // This bypasses SSL/TLS verification (use for development only)
//       })
//     });

//     if (!productRes.ok) {
//       throw new Error(`Failed to fetch the product. Status: ${productRes.status}`);
//     }
//     const product = await productRes.json();
//     console.log('Fetched product:', product);

//     // Fetch related products
//     const relatedRes = await fetch('https://localhost:7265/Products/database');
//     if (!relatedRes.ok) {
//       throw new Error('Failed to fetch related products.');
//     }
//     let relatedProducts = await relatedRes.json();
//     relatedProducts = relatedProducts.filter((item) => item.slug !== params.slug);

//     // Return the fetched data as props
//     return { props: { product, products: relatedProducts } };
//   } catch (error) {
//     console.error('Error in getServerSideProps:', error);
//     return { props: { error: error.message } };
//   }
// };


// export const getServerSideProps = async ({ params }) => {
//   try {
//     console.log(`Fetching product details for slug: ${params.slug}`);
//     const productRes = await fetch(`https://localhost:7265/Products/${params.slug}`);
//     if (!productRes.ok) {
//       throw new Error(`Failed to fetch the product. Status: ${productRes.status}`);
//     }
//     const product = await productRes.json();
//     console.log('Fetched product:', product);

//     // Fetch related products
//     const relatedRes = await fetch('https://localhost:7265/Products/database');
//     if (!relatedRes.ok) {
//       throw new Error('Failed to fetch related products.');
//     }
//     let relatedProducts = await relatedRes.json();
//     relatedProducts = relatedProducts.filter((item) => item.slug !== params.slug);

//     // Return the fetched data as props
//     return { props: { product, products: relatedProducts } };
//   } catch (error) {
//     console.error('Error in getServerSideProps:', error);
//     return { props: { error: error.message } };
//   }
// };



// export default ProductDetails;














// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Original Get Static props version >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// import React, {useState} from 'react';
// import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
// import Product from '../../components/Product';
// import {useStateContext} from '../../context/StateContext';
// import productsData from '../../data/productsData'; // My mock data file
// import Image from 'next/image';


// const ProductDetails = ({product, products}) => {
//   const { image, name, details, price } = product;
//   const [index, setIndex] = useState(0);
//   const {incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

//   //Code for 'Buy Now Button/Option'
//   const handleBuyNow = async (product, quantity) => {
//     onAdd(product, quantity);
//     setShowCart(true);
//   };

  // return (
  //       <div>
  //         <div className="product-detail-container">
  //           <div>
  //             <div className="image-container">
  //               <Image
  //                 className="product-detail-image"
  //                 src={product.image[index]}
  //                 alt={name}
  //                 width={350}
  //                 height={350}
  //               />
  //             </div>
  //             <div className="small-images-container">
  //               {product.image.map((img, i) => (
  //                 <Image
  //                   className={i === index ? 'small-image selected-image' : 'small-image'}
  //                   key={i}
  //                   src={img}
  //                   alt={`${name} - Image ${i}`}
  //                   width={70}
  //                   height={70}
  //                   onMouseEnter={() => setIndex(i)}
  //                 />
  //               ))}
  //             </div>
  //           </div>
  //           <div className="product-detail-desc">
  //             <h1>{name}</h1>
  //             <div className="reviews">
  //               <div>
  //                 <AiFillStar />
  //                 <AiFillStar />
  //                 <AiFillStar />
  //                 <AiFillStar />
  //                 <AiOutlineStar />
  //               </div>
  //               <p>
  //                 (20)
  //               </p>
  //             </div>
  //             <h4>Details: </h4>
  //             <p>{details}</p>
  //             <p className="price">${price}</p>
  //             <div className="quantity">
  //               <h3>Quantity:</h3>
  //               <p className="quantity-desc">
  //                 <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
  //                 <span className="num">{qty}</span>
  //                 <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
  //               </p>
  //             </div>
  //             <div className="buttons">
  //               <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
  //               <button type="button" className="buy-now" onClick={() => handleBuyNow(product, qty)}>Buy Now</button>
  //             </div>
  //           </div>
  //         </div>
    
  //         <div className="maylike-products-wrapper">
  //             <h2>You may also like</h2>
  //             <div className="marquee">
  //               <div className="maylike-products-container track">
  //                 {products.map((item) => (
  //                   <Product key={item._id} product={item} />
  //                 ))}
  //               </div>
  //             </div>
  //         </div>
  //       </div>
  //     )
//     }

//     export const getStaticPaths = async () => {
//       // Generate paths from local products data
//       const paths = productsData.map((product) => ({
//         params: { slug: product.slug },
//       }));
    
//       return {
//         paths,
//         fallback: false, // or 'blocking' if you want to ensure all pages are generated at build time
//       };
//     };
    
//     export const getStaticProps = async ({ params: { slug } }) => {
//       // Find the product by slug in local products data
//       const product = productsData.find((product) => product.slug === slug);
//       // Use a subset of products for the "You may also like" section
//       const relatedProducts = productsData.filter((product) => product.slug !== slug);
    
//       // If no product is found, return a 404 status
//       if (!product) {
//         return { notFound: true };
//       }
    
//       return {
//         props: { product, products: relatedProducts },
//       };
//     };
    


// export default ProductDetails