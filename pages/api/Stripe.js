import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// import productsData from '../../data/productsData';

const productsData = useFetchProducts;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const cartItems = req.body;
    const lineItems = cartItems.map(item => {
      //const product = productsData.find(p => p._id === item._id);
      const product = productsData.find(p => p.id === item.id);
      const imageUrl = product.image[0];

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [imageUrl],
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

    try {
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch {
      res.status(500).end('Internal Server Error');
    }
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
