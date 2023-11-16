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
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item.id === product._id); //is the product already in cart or not?

        //if product already exists in cart, then we dont create another instance of this product
        //instead we take the previous total price, add it to itself based onthe quantity
        if (checkProductInCart) {
            increaseTotalPrice((previousTotalPrice) => previousTotalPrice + product.price * quantity);
            setTotalQuantities((previousTotalQuantities) => previousTotalQuantities + quantity);

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        }
        //Handling items that already ecist in the cart
        else {
            product.quantity = quantity;         
            setCartItems([...cartItems, { ...product }]); //set Cart items is set as an emnpty array where we spread all the existing cart items and our new product
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    } 
  
    //inc and decrease quantity of products in cart
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
      }
    
      const decQty = () => {
        setQty((prevQty) => {
          if(prevQty - 1 < 1) return 1;
         
          return prevQty - 1;
        });
      }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);