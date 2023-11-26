// pages/api/create-checkout-session.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import productsData from '../../data/productsData'; // Importing my local products data

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const cartItems = req.body;

      const lineItems = cartItems.map(item => {
        
        const product = productsData.find(p => p._id === item._id);// Find the product in my local data to get the image URL
        const imageUrl = product.image[0]; // Using the first image from the local data

        return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [imageUrl], // Use the local image URL
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        });
  
        const params = {
          submit_type: 'pay',
          mode: 'payment',
          payment_method_types: ['card'],
          billing_address_collection: 'auto',
          line_items: lineItems,
          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/cancel`,
        };
  
        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session);
      } catch (err) {
        console.error("Error in Stripe session creation:", err);
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }