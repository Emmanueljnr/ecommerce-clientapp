import React, {useState} from 'react';
import {client, urlFor} from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from '../../components/Product';
import {useStateContext} from '../../context/StateContext';
import productsData  from '../../data/productsData' // Importing my local banner data (mock data)
import Image from 'next/image'


const ProductDetails = ({product, products}) => { 
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const {incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

//Code for 'Buy Now Button/Option'
const handleBuyNow = async (product, quantity) => {
  onAdd(product, quantity);
  setShowCart(true);

  // console.log("Buy Now clicked", product, quantity); // This line is for debugging
  // console.log("Buy Now clicked", product.image[0]);

  // // Call your API endpoint to create a Stripe Checkout Session
  // const response = await fetch('/api/create-checkout-session', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ product, quantity }),
  // });

  // const session = await response.json();

  // // Redirect to Stripe Checkout
  // if (session.url) {
  //   window.location.href = session.url;
  // }
};


  return (
        <div>
          <div className="product-detail-container">
            <div>
              <div className="image-container">
                {/* <Image alt="Product-Detail-Page-Image(large)" src={urlFor(image && image[index])} className="product-detail-image" width={500} height={300}/> */}
                <Image 
                  alt="Product-Detail-Page-Image(large)" 
                  src={urlFor(image && image[index]).url()} 
                  className="product-detail-image" 
                  width={500} 
                  height={300}
                />

              </div>
              <div className="small-images-container">
                {image?.map((item, i) => (
                  <Image 
                    alt="Product-Detail-Page-Image(small)"
                    key={i}
                    // src={urlFor(item)}
                    src={urlFor(item).url()}
                    className={i === index ? 'small-image selected-image' : 'small-image'}
                    onMouseEnter={() => setIndex(i)}
                    width={500} height={300}
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
                    <Product key={item._id} product={item} />
                  ))}
                </div>
              </div>
          </div>
        </div>
      )
    }

    export const getStaticPaths = async () => {
      // Generate paths from local products data
      const paths = productsData.map((product) => ({
        params: { slug: product.slug },
      }));
    
      //return { paths, fallback: 'blocking' }; //Ensures that the pages are rendered server-side before being served to the user
      return { paths, fallback: false }; //This approach will cause Next.js to pre-render every product page during the build process
    };
    
    export const getStaticProps = async ({ params: { slug } }) => {
      // Find the product by slug in local products data
      const product = productsData.find((p) => p.slug === slug);
      // Use a subset of products for the "You may also like" section
      const relatedProducts = productsData.filter((p) => p.slug !== slug);
    
      return {
        props: { product, products: relatedProducts },
      };
    };

export default ProductDetails


// export const getStaticPaths = async () => {
//     const query = `*[_type == "product"] {
//       slug {
//         current
//       }
//     }
//     `;
  
//     const products = await client.fetch(query);
//     console.log("Products for paths:", products); //-------------- NEW -------------------

//     const paths = products.map((product) => ({
//       params: { 
//         slug: product.slug.current
//       }
//     }));
  
//     return {
//       paths,
//       fallback: 'blocking'
//     }  
// }




//https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props

// export const getStaticProps = async ({params :{slug}}) => {

//     console.log("Fetching product for slug:", slug); //-------------- NEW -------------------
//     const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
//     const productsQuery = `*[_type == "product"]`

//     const product = await client.fetch(query);
//     const products = await client.fetch(productsQuery);
  
//     return {
//       props: { products, product }
//     }
// }