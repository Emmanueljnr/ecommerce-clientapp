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
    let foundProduct;
    let index;


// Method to add a product to the shopping cart
const onAdd = (product, quantity) => {
    console.log('onAdd method called with product:', product, 'and quantity:', quantity);

    // Check if the product has a valid id
    if (!product.id) {
        console.error('Product does not have a valid id', product);
        return;
    }

    // Check if the cartItems is an array
    console.log('Current cartItems (should be an array):', cartItems);

    const checkProductInCart = cartItems.find((item) => item.id === product.id);
    console.log('checkProductInCart:', checkProductInCart);

    // Updating the total price of the cart
    // setTotalPrice((prevTotalPrice) => {
    //     const newTotalPrice = prevTotalPrice + product.price * quantity;
    //     console.log(`Updated total price: ${newTotalPrice}`);
    //     return newTotalPrice;
    // });

    // Updating the total price of the cart
    setTotalPrice((prevTotalPrice) => {
        const newTotalPrice = prevTotalPrice + product.price * quantity;
        // Fix to two decimal places and convert back to number
        const formattedTotalPrice = parseFloat(newTotalPrice.toFixed(2));
        console.log(`Updated total price: ${formattedTotalPrice}`);
        return formattedTotalPrice;
    });


    // Updating the total quantity of items in the cart
    setTotalQuantities((prevTotalQuantities) => {
        const newTotalQuantities = prevTotalQuantities + quantity;
        console.log(`Updated total quantities: ${newTotalQuantities}`);
        return newTotalQuantities;
    });

    if (checkProductInCart) {
        const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct.id === product.id) {
                console.log(`Found product in cart, updating quantity: ${cartProduct.quantity} to ${cartProduct.quantity + quantity}`);
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                };
            }
            return cartProduct;
        });

        setCartItems(updatedCartItems);
    } else {
        console.log(`Product not found in cart, adding new product with quantity: ${quantity}`);
        product.quantity = quantity;

        setCartItems((prevCartItems) => [...prevCartItems, { ...product }]);
    }

    // Log the updated cart items
    setCartItems((currentCartItems) => {
        console.log('Cart items after adding:', currentCartItems);
        return currentCartItems;
    });

    toast.success(`${quantity} ${product.name} added to the cart.`);
};


// Method to remove a product from the cart
const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);
  
    // Updating the total price after product removal
    setTotalPrice((prevTotalPrice) => {
      const newTotalPrice = prevTotalPrice - foundProduct.price * foundProduct.quantity;
      return parseFloat(newTotalPrice.toFixed(2));
    });
  
    // Updating the total quantity after product removal
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  };
  
  // Method to toggle the quantity of a specific item in the cart
  const toggleCartItemQuanitity = (id, value) => {
    setCartItems(prevCartItems =>
      prevCartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = value === 'inc' ? item.quantity + 1 : item.quantity - 1;
          // Update the total price and quantities
          setTotalPrice((prevTotalPrice) => {
            const priceChange = value === 'inc' ? item.price : -item.price;
            const newTotalPrice = prevTotalPrice + priceChange;
            return parseFloat(newTotalPrice.toFixed(2));
          });
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + (value === 'inc' ? 1 : -1));
          // Return the updated item if quantity is greater than 1 or if we're incrementing
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
};

  
    // Method to increase the product quantity (not directly related to cart items)
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    // Method to decrease the product quantity (not directly related to cart items)
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }
  
    // When cartItems changes, update localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


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





// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< | My original Methods | >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Method to remove a product from the cart
//   const onRemove = (product) => {
//     foundProduct = cartItems.find((item) => item.id === product.id);
//     const newCartItems = cartItems.filter((item) => item.id !== product.id);
  
//     // Updating the total price after product removal
//     setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
//     // Updating the total quantity after product removal
//     setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
//     setCartItems(newCartItems);
//   }

  
// Method to toggle the quantity of a specific item in the cart
// const toggleCartItemQuanitity = (id, value) => {
//     setCartItems(prevCartItems =>
//         prevCartItems.map((item) => {
//             if (item.id === id) {
//                 const newQuantity = value === 'inc' ? item.quantity + 1 : item.quantity - 1;
//                 // Update the total price and quantities
//                 setTotalPrice((prevTotalPrice) => prevTotalPrice + (value === 'inc' ? item.price : -item.price));
//                 setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + (value === 'inc' ? 1 : -1));
//                 // Return the updated item if quantity is greater than 1 or if we're incrementing
//                 return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
//             }
//             return item;
//         })
//     );
// }