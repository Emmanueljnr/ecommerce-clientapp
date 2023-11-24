import React from 'react'
import Link from 'next/link';
import {urlFor} from '../lib/client';


const Product = ({ product: {image, name, slug, price}}) => {
  return (
    <div>
        {/* <Link href={`/product/${slug.current}`}> */}
        <Link href={`/product/${slug}`}>
        <div className='product-card'>
         <image src={urlFor(image && image[0])}
                 alt="Product-Image"
                 width={250}
                 height={250}
                 className="product-image"
            />
            <p className='product-name'> {name} </p>
            <p className='product-price'> ${price} </p>

        </div>
        </Link>
    </div>
  )
}

export default Product