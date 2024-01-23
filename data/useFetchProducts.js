// <<<<<<<<<<<<<<<<<<<<<<<< PERFECT VERSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { useState, useEffect } from 'react';

// Hook to fetch all products
export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://localhost:7265/Products/database')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched products:', data); // Here is the console.log to see what's being fetched
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};

// Hook to fetch a single product by slug
export const useFetchProductBySlug = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://localhost:7265/products/${slug}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //console.log('Fetched products:', data); // Here is the console.log to see what's being fetched
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch product:', error);
        setError(error);
        setLoading(false);
      });
  }, [slug]); // Effect will re-run if slug changes

  return { product, loading, error };
};













// import { useState, useEffect } from 'react';

// export const useFetchProducts = () => {
//   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://localhost:7265/products/database')
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error('Network response was not ok');
//       })
//       .then(data => {
//         console.log('Fetched products:', data); // Here is the console.log to see what's being fetched
//         setProducts(data);
//         // setLoading(false);
//       })
//       .catch(error => {
//         console.error('Failed to fetch products:', error);
//         // setLoading(false);
//       });
//   }, []);

// return { products };
// //   return { products, loading };
// };
