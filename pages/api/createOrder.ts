// import { NextApiRequest, NextApiResponse } from 'next';
// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID as string,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { amount, currency } = req.body;

//         try {
//             const options = {
//                 amount: amount * 100, // Amount in paisa
//                 currency: currency,
//                 receipt: 'receipt_order_74394',
//             };

//             const order = await razorpay.orders.create(options);
//             res.status(200).json({ order_id: order.id });

//         } catch (error) {
//             console.error('Error creating Razorpay order:', error);
//             res.status(500).json({ error: 'Unable to create order' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
