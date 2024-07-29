// import { NextApiRequest, NextApiResponse } from 'next';
// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID as string,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

//         try {
//             const isValidSignature = Razorpay.validateWebhookSignature(
//                 JSON.stringify(req.body),
//                 razorpay_signature,
//                 process.env.RAZORPAY_WEBHOOK_SECRET as string
//             );

//             if (isValidSignature) {
//                 res.status(200).json({ success: true });
//             } else {
//                 res.status(400).json({ success: false });
//             }

//         } catch (error) {
//             console.error('Error verifying Razorpay payment:', error);
//             res.status(500).json({ error: 'Unable to verify payment' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
