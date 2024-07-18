import express from 'express';
import Stripe from 'stripe';
import { stripeUpdateStatus } from '../libs/providers/helpers/validator/stripeUpdateStatus';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export const stripeWebhookHandler = express.Router();

stripeWebhookHandler.post('/', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event: any;
    try {
        event = stripe.webhooks.constructEvent(
            request.body,
            sig as string,
            endpointSecret as string
        );
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err);
        return response.status(400).send(`Webhook Error: ${err}`);
    }
    if (event.type === 'payment_intent.succeeded' || event.type === 'payment_intent.payment_failed') {
        const paymentIntent = event.data.object;
        stripeUpdateStatus(paymentIntent.id, event.type)
            .then(() => console.log(`Payment: ${paymentIntent.id}, status: ${event.type}`))
            .catch(err => console.error(`Status update failed: ${paymentIntent.id}`, err));
    }
    response.json({ received: true });
});
