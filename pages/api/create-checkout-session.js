// pages/api/create-checkout-session.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import {urlFor} from '../../lib/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { product, quantity } = req.body;

    try {
      // Log the request body to see what data is being received
      console.log("Received data from client:", req.body);
      const imageUrl = urlFor(product.image[0]).url();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              // images: [imageUrl],
              // Add more product details if necessary
            },
            unit_amount: product.price * 100, // Assuming price is in USD
          },
          quantity,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?paymentCancelled=true`, // This redirects to the home page
      });

      res.status(200).json({ url: session.url });
    } catch (err) {
      console.error("Error creating Stripe session:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
