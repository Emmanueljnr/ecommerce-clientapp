import React from 'react'
import Link from 'next/link';
import {urlFor} from '../lib/client';
import Image from 'next/image';

const Product = ({ product: {image, name, slug, price}}) => {
  return (
    <div>
        
        <Link href={`/product/${slug}`}>   {/* <Link href={`/product/${slug.current}`}> */}

        <div className='product-card'>
        {/* {console.log("Image URL:", urlFor(image && image[0]).url())} */}
         <Image 
          // src={urlFor(image && image[0])}
          src={urlFor(image && image[0]).url()}
          alt="Product-Image"
          className="product-image"
          width={250}
          height={250}
          />
            <p className='product-name'> {name} </p>
            <p className='product-price'> ${price} </p>

        </div>
        </Link>
    </div>
  )
}

export default Product