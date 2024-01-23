// pages/fake-payment.js
import React, { useState, useContext, useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Image from 'next/image'; // Make sure to import Image from 'next/image'
import { useRouter } from 'next/router';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow,
} from 'mdb-react-ui-kit';

const FakePayment = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { cartItems } = useStateContext(); // Using cart items from context
  const { setShowCart } = useStateContext();
  
 
    // useEffect(() => {
    //   setShowCart(false);
    // }, [setShowCart]);  
    
  

  useEffect(() => {
    setShowCart(false);
    // return () => {
    //   setShowCart(true);// Open the cart when we return to the previous page
    // };
  }, []);




  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  



    // Simulate payment processing delay
    setTimeout(() => {
      // Redirect to confirmation page after "payment"
      router.push('/payment-confirmation');
    }, 2000);
  };

  return (
    <MDBContainer className="py-5" fluid>
      <h3 style={{ textAlign: 'center' }}>TheAmCo Checkout Page</h3>
      <MDBRow className="d-flex justify-content-center">
        
        <MDBCol md="6" className="order-md-2">
  {/* RIGHT SIDE */}
            <MDBCard className="rounded-3">
            <MDBCardBody className="mx-1 my-2">
              <div className="d-flex align-items-center">
                <div>
                <FontAwesomeIcon 
                    icon={faCcVisa} 
                    size="4x" 
                    className="text-black pe-3" 
                />
                  {/* <MDBIcon
                    fab
                    icon="cc-visa"
                    size="4x"
                    className="text-black pe-3"
                  /> */}
                </div>
                <div>
                  <p className="d-flex flex-column mb-0">
                    <b>Martina Thomas</b>
                    <span className="small text-muted">**** ****</span>
                  </p>
                </div>
              </div>
              <div className="pt-3">
                <div className="d-flex flex-row pb-3">
                  <div
                    className="rounded border border-primary border-2 d-flex w-100 p-3 align-items-center"
                    style={{ backgroundColor: "rgba(18, 101, 241, 0.07)" }}
                  >
                    <div className="d-flex align-items-center pe-3">
                      {/* <MDBRadio
                        name="radioNoLabelX"
                        id="radioNoLabel11"
                        defaultChecked
                      /> */}
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-1 small text-primary">
                        Available Credit
                      </p>
                      {/* <h6 className="mb-0 text-primary">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</h6> */}
                          <h6> 1000 POINTS($1 000)</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <div className="d-flex flex-row pb-3">
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <div className="d-flex align-items-center pe-3">
                      <MDBRadio
                        name="radioNoLabelX"
                        id="radioNoLabel11"
                        defaultChecked
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-1 small text-primary">
                        Total Amount Due
                      </p>
                      <h6 className="mb-0 text-primary">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</h6>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="d-flex flex-row pb-3">
                <div className="rounded border d-flex w-100 px-3 py-2 align-items-center">
                  <div className="d-flex align-items-center pe-3">
                    <MDBRadio name="radioNoLabelX" id="radioNoLabel11" />
                  </div>
                  <div className="d-flex flex-column py-1">
                    <p className="mb-1 small text-primary">Other amount</p>
                    <div className="d-flex flex-row align-items-center">
                      <h6 className="mb-0 text-primary pe-1">$</h6>
                      <MDBInput
                        id="typeNumber"
                        type="number"
                        size="sm"
                        style={{ width: "55px" }}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="d-flex justify-content-between align-items-center pb-1">
                {/* <Link href="/">
                <button
                    style={{
                    width: '100%',
                    maxWidth: '600px',
                    padding: '10px 12px',
                    borderRadius: '15px',
                    border: 'none',
                    fontSize: '20px',
                    marginTop: '40px', // This overrides the previous marginTop of 10px
                    textTransform: 'uppercase',
                    backgroundColor: '#f02d34',
                    color: '#fff',
                    cursor: 'pointer',
                  }}>
                    Return
                  </button>             
                  
              </Link> */}
  <Link href="/"><MDBBtn size="lg" style={{ width: '200px', backgroundColor: '#f02d34', marginRight: '10px' }}>Go Back</MDBBtn></Link>
  <MDBBtn size="lg" style={{ width: '300px', backgroundColor: '#007bff' }}>Pay Amount</MDBBtn>
</div>
            </MDBCardBody>
          </MDBCard>
          {/* ... existing code ... */}
        </MDBCol>


        <MDBCol md="4" className="order-md-1">
  {/* LEFT SIDE */}
  {/* <MDBCard> */}
  <MDBCard style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <MDBCardBody>
      <h4>Your Cart</h4>
      {cartItems.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Product Image */}
            {item.image && (
              <Image 
                src={item.image[0]} // Assuming item.image[0] is the URL of the image
                alt={item.name}
                width={50} // Set the image size as needed
                height={50}
                objectFit="contain" // Adjust as needed for your layout
              />
            )}
            {/* Product Name */}
            <div style={{ marginLeft: '10px' }}>
              <div>{item.name}</div>
            </div>
          </div>
          {/* Product Price and Quantity */}
          <div>
            <div>${item.price.toFixed(2)} x {item.quantity}</div>
          </div>
        </div>
      ))}
      <div className="total" style={{ borderTop: '1px solid #ddd', padding: '10px', marginTop:'80%' }}>
        <strong>Total:</strong> $
        {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
      </div>
    </MDBCardBody>
  </MDBCard>
</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FakePayment;















// // pages/fake-payment.js
// import React, { useState, useContext } from 'react';
// import { useRouter } from 'next/router';
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBInput,
//   MDBRow,
// } from 'mdb-react-ui-kit';
// import { useStateContext } from '../context/StateContext'; // Adjust the import path according to your project structure

// const FakePayment = () => {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { cartItems } = useStateContext(); // Using cart items from context

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     // Simulate payment processing delay
//     setTimeout(() => {
//       // Redirect to confirmation page after "payment"
//       router.push('/payment-confirmation');
//     }, 2000);
//   };

//   return (
//     <MDBContainer className="py-5" fluid>
//       <MDBRow className="d-flex justify-content-center">
//         <MDBCol md="6" className="order-md-2">
//           {/* Payment form card */}
//           {/* <MDBCol md="6" lg="8" xl="5"> */}
//           <MDBCard className="rounded-3">
//             <MDBCardBody className="p-4">
//               <div className="text-center mb-4">
//                 <h3>Payment</h3>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 {/* Add your input fields for payment details */}
//                 <MDBInput label="Cardholder's Name" id="form3" type="text" size="lg" />
//                 <MDBRow className="my-4">
//                   <MDBCol size="7">
//                     <MDBInput label="Card Number" id="form4" type="text" size="lg" />
//                   </MDBCol>
//                   <MDBCol size="3">
//                     <MDBInput label="Expire" id="form5" type="text" size="lg" />
//                   </MDBCol>
//                   <MDBCol size="2">
//                     <MDBInput label="CVV" id="form6" type="text" size="lg" />
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBBtn color="success" size="lg" block disabled={loading}>
//                   {loading ? 'Processing...' : 'Pay'}
//                 </MDBBtn>
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         {/* </MDBCol> */}
//           {/* ... existing code ... */}
//         </MDBCol>
//         <MDBCol md="4" className="order-md-1">
//           {/* Cart items list */}
//           <MDBCard>
//             <MDBCardBody>
//               <h4>Your Cart</h4>
//               <ul>
//                 {cartItems.map((item, index) => (
//                   <li key={index}>
//                     {item.name} - ${item.price.toFixed(2)} x {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//               <div className="total">
//                 <strong>Total:</strong> $
//                 {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

// export default FakePayment;















// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CARD PAYMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// // pages/fake-payment.js
// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBInput,
//   MDBRow,
// } from 'mdb-react-ui-kit';

// const FakePayment = () => {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     // Simulate payment processing delay
//     setTimeout(() => {
//       // Redirect to confirmation page after "payment"
//       router.push('/payment-confirmation');
//     }, 2000);
//   };

//   return (
//     <MDBContainer className="py-5" fluid>
//       <MDBRow className=" d-flex justify-content-center">
//         <MDBCol md="10" lg="8" xl="5">
//           <MDBCard className="rounded-3">
//             <MDBCardBody className="p-4">
//               <div className="text-center mb-4">
//                 <h3>Payment</h3>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 {/* Add your input fields for payment details */}
//                 <MDBInput label="Cardholder's Name" id="form3" type="text" size="lg" />
//                 <MDBRow className="my-4">
//                   <MDBCol size="7">
//                     <MDBInput label="Card Number" id="form4" type="text" size="lg" />
//                   </MDBCol>
//                   <MDBCol size="3">
//                     <MDBInput label="Expire" id="form5" type="text" size="lg" />
//                   </MDBCol>
//                   <MDBCol size="2">
//                     <MDBInput label="CVV" id="form6" type="text" size="lg" />
//                   </MDBCol>
//                 </MDBRow>
//                 <MDBBtn color="success" size="lg" block disabled={loading}>
//                   {loading ? 'Processing...' : 'Pay'}
//                 </MDBBtn>
//               </form>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

// export default FakePayment;
