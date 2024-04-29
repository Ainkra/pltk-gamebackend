// import { Stripe } from 'stripe';
// import { productPrices } from '../libs/utils/data/productPriceData';

// interface PaymentIntentResponse {
//     success: boolean;
//     message: string;
//     paymentIntentId?: string | null;
// }

// export class StripePaymentHandler {
//     private stripe: Stripe;

//     constructor(stripeApiKey: string) {
//         this.stripe = new Stripe(stripeApiKey);
//     }

//     async stripeUpgradeCapacity(items: string): Promise<PaymentIntentResponse> {
//         try {
//             const itemsInput = items;
//             const currency = 'EUR';

//             const amount = this.getCost(itemsInput);

//             const paymentIntent = await this.stripe.paymentIntents.create({
//                 amount: amount,
//                 currency: currency,
//             });

//             let response: PaymentIntentResponse;

//             if (paymentIntent.status === 'succeeded') {
//                 response = {
//                     success: true,
//                     message: "Payment succeeded.",
//                     paymentIntentId: paymentIntent.id
//                 }

//                 return response;
//             } else {
//                 // Paiement en attente ou échoué
//                 response = {
//                     success: false,
//                     message: "Payment intent failed. Please try again.",
//                     paymentIntentId: null
//                 }

//                 return response;
//             }
//         } catch (error) {
//             console.error('Payment processing error:', error);
//             return {
//                 success: false,
//                 message: "Payment processing give an error. Please retry later.",
//                 paymentIntentId: null
//             };
//         }
//     }

//     // private calculateOrderAmount(items: string[]): number {
//     //     const orderAmount = items.reduce((total, item) => {
//     //         return total + (buyableItem[item] || 0);
//     //     }, 0);

//     //     return orderAmount;
//     // };
    
//     private getCost(items: string): number {
//         const cost = productPrices[items];

//         if(cost !== undefined || cost !== 0) {
//             throw new Error(`Unknow product. Please try another item name.`)
//         } else {
//             return cost;
//         }
//     };
// }
