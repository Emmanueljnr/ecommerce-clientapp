import React from 'react';
import Link from 'next/link';
import productsData from '../data/productsData'; // Importing my local products data
import Image from 'next/image';

const Product = ({ product: { image, name, slug, price } }) => {
  // Find the product in your local data based on the slug or another unique identifier
  const localProduct = productsData.find(p => p.slug === slug);
  // Use the first image URL directly from your local data
  const imageUrl = localProduct.image[0];

  return (
    <div>
      <Link href={`/product/${slug}`}>
        <div className='product-card'>
          <Image 
            src={imageUrl}
            alt="Product-Image"
            className="product-image"
            width={250}
            height={250}
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
