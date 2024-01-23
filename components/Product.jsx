// components/Product.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Product = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  const imageUrl = product.image[0];

  return (
    <div>
      <Link href={`/product/${product.slug}`}>
        <div className='product-card'>
          <Image 
            src={imageUrl}
            alt={product.name}
            className="product-image"
            width={250}
            height={250}
            //layout="responsive"
          />
          <h2 className='product-name'>{product.name}</h2>
          <p className='product-price'>${product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;





// // import React from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { useFetchProducts } from '../data/useFetchProducts';

// // const Product = ({ productId }) => {
// //   const { products } = useFetchProducts();

// //   // Find the product in the fetched data based on the product slug or another unique identifier
// //   const product = products.find(p => p.id === productId);

// //   if (!product) {
// //     // If product is not found, you can return null or some placeholder
// //     return <div>Product not found</div>;
// //   }

// //   // Use the first image URL directly from the fetched product data
// //   const imageUrl = product.image[0];


// //   return (
// //     <div>
// //       <Link href={`/product/${product.slug}`}>
// //         <div className='product-card'>
// //           <Image 
// //             src={imageUrl}
// //             alt={product.name}
// //             className="product-image"
// //             width={250}
// //             height={250}
// //           />
// //           <p className='product-name'>{product.name}</p>
// //           <p className='product-price'>${product.price}</p>
// //         </div>
// //       </Link>
// //     </div>
// //   );
// // }

// // export default Product;




// // import React from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { useFetchProducts } from '../data/useFetchProducts';

// // const Product = ({ productId }) => {
// //   const { products } = useFetchProducts();

// //   // Find the product in the fetched data based on the product ID or another unique identifier
// //   const product = products.find(p => p.id === productId);

// //   if (!product) {
// //     // If product is not found, you can return null or some placeholder
// //     return <div>Product not found</div>;
// //   }

// //   // Use the first image URL directly from the fetched product data
// //   const imageUrl = product.image[0];

// //   return (
// //     <div>
// //       <Link href={`/product/${product.slug}`}>
// //         <div className='product-card'>
// //           <Image 
// //             src={imageUrl}
// //             alt={product.name}
// //             className="product-image"
// //             width={250}
// //             height={250}
// //           />
// //           <p className='product-name'>{product.name}</p>
// //           <p className='product-price'>${product.price}</p>
// //         </div>
// //       </Link>
// //     </div>
// //   );
// // }

// // export default Product;






// // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Original Code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// // import React from 'react';
// // import Link from 'next/link';
// // import productsData from '../data/productsData'; // Importing my local products data
// // import Image from 'next/image';

// // const Product = ({ product: { image, name, slug, price } }) => {
// //   // Find the product in your local data based on the slug or another unique identifier
// //   const localProduct = productsData.find(p => p.slug === slug);
// //   // Use the first image URL directly from your local data
// //   const imageUrl = localProduct.image[0];

// //   return (
// //     <div>
// //       <Link href={`/product/${slug}`}>
// //         <div className='product-card'>
// //           <Image 
// //             src={imageUrl}
// //             alt="Product-Image"
// //             className="product-image"
// //             width={250}
// //             height={250}
// //           />
// //           <p className='product-name'>{name}</p>
// //           <p className='product-price'>${price}</p>
// //         </div>
// //       </Link>
// //     </div>
// //   );
// // }

// // export default Product;
