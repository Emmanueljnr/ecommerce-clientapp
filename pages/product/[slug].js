import React, {useState} from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from '../../components/Product';
import {useStateContext} from '../../context/StateContext';
import productsData from '../../data/productsData'; // Assuming this is your mock data file
import Image from 'next/image';

const ProductDetails = ({product, products}) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const {incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

  //Code for 'Buy Now Button/Option'
  const handleBuyNow = async (product, quantity) => {
    onAdd(product, quantity);
    setShowCart(true);
  };

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
    
      return {
        paths,
        fallback: false, // or 'blocking' if you want to ensure all pages are generated at build time
      };
    };
    
    export const getStaticProps = async ({ params: { slug } }) => {
      // Find the product by slug in local products data
      const product = productsData.find((product) => product.slug === slug);
      // Use a subset of products for the "You may also like" section
      const relatedProducts = productsData.filter((product) => product.slug !== slug);
    
      // If no product is found, return a 404 status
      if (!product) {
        return { notFound: true };
      }
    
      return {
        props: { product, products: relatedProducts },
      };
    };
    


export default ProductDetails