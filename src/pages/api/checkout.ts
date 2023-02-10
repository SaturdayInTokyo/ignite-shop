import { Stripe } from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`

  try {
    const body = JSON.parse(req.body)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
      apiVersion: '2022-11-15'
    });

    const session = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: body.lineItems,
      mode: 'payment'
    });

    res.status(201).json({ session })
  } catch (error) {
    res.status(500).json({ message: error })
  }





}