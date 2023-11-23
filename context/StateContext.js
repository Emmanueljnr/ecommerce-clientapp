import React, {createContext, useContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast'

const Context = createContext();

//context functional component
//children mean , whenever we call out state context <State></State>, whatever we pass in there will be passed as a prop
export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false); //show the cart or not
    const [cartItems, setCartItems] = useState([]); //we always need to know what items we have in our cart. this will be empty at first but eventually we'll fill it in with data from the local storage
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1); //default is 1 cos when items get put in the basket, we will have just 1 item in there  by default}


// ============================== LOGIC HANDLING ============================== //

    //check if product we wanna add is already in the cart or not
    // const onAdd = (product, quantity) => {
    //     const checkProductInCart = cartItems.find((item) => item.id === product._id); //is the product already in cart or not?

    //     //if product already exists in cart, then we dont create another instance of this product
    //     //instead we take the previous total price, add it to itself based onthe quantity
    //     if (checkProductInCart) {
    //         increaseTotalPrice((previousTotalPrice) => previousTotalPrice + product.price * quantity);
    //         setTotalQuantities((previousTotalQuantities) => previousTotalQuantities + quantity);

    //         const updatedCartItems = cartItems.map((cartProduct) => {
    //             if (cartProduct._id === product._id) return {
    //                 ...cartProduct,
    //                 quantity: cartProduct.quantity + quantity
    //             }
    //         })

    //         setCartItems(updatedCartItems);
    //     }
    //     //Handling items that already ecist in the cart
    //     else {
    //         product.quantity = quantity;         
    //         setCartItems([...cartItems, { ...product }]); //set Cart items is set as an emnpty array where we spread all the existing cart items and our new product
    //     }

    //     toast.success(`${qty} ${product.name} added to the cart.`);
    // } 
    
    let foundProduct;
    let index;


// Method to add a product to the shopping cart
const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    // Updating the total price of the cart
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    // Updating the total quantity of items in the cart
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
  
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }
  
    toast.success(`${qty} ${product.name} added to the cart.`);
  } 
  
  // Method to remove a product from the cart
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
  
    // Updating the total price after product removal
    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    // Updating the total quantity after product removal
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }
  
  // Method to toggle the quantity of a specific item in the cart
//   const toggleCartItemQuanitity = (id, value) => {
//     foundProduct = cartItems.find((item) => item._id === id)
//     index = cartItems.findIndex((product) => product._id === id);
//     const newCartItems = cartItems.filter((item) => item._id !== id)
  
//     if(value === 'inc') {
//       setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
//       setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
//       setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
//     } else if(value === 'dec') {
//       if (foundProduct.quantity > 1) {
//         setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
//         setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
//         setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
//       }
//     }
//   }
  
// Method to toggle the quantity of a specific item in the cart
const toggleCartItemQuanitity = (id, value) => {
    setCartItems(prevCartItems =>
      prevCartItems.map((item) => {
        if (item._id === id) {
          const newQuantity = value === 'inc' ? item.quantity + 1 : item.quantity - 1;
          // Update the total price and quantities
          setTotalPrice((prevTotalPrice) => prevTotalPrice + (value === 'inc' ? item.price : -item.price));
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + (value === 'inc' ? 1 : -1));
          // Return the updated item if quantity is greater than 1 or if we're incrementing
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  }
  
  


  // Method to increase the product quantity (not directly related to cart items)
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }
  
  // Method to decrease the product quantity (not directly related to cart items)
  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }
  
  
    //inc and decrease quantity of products in cart
    // const incQty = () => {
    //     setQty((prevQty) => prevQty + 1);
    //   }
    
    //   const decQty = () => {
    //     setQty((prevQty) => {
    //       if(prevQty - 1 < 1) return 1;
         
    //       return prevQty - 1;
    //     });
    //   }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuanitity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);