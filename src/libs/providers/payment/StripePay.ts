import Stripe from "stripe";
import { IStripePaymentInterface } from "../../interface/IPaymentInterface";
import { LoggingColor } from "../../misc/LoggingColor";
import { productPrices } from "../../utils/data/productPriceData";

const sKey: string = process.env.STRIPE_SKEY as string;
const stripeHandler = new Stripe(sKey);

/**
 * Permit to calculate the whole of the order
 * @param items 
 * @returns 
 */

function calculateOrderAmount(items: string): number {
        return productPrices[items];
};

export class StripePay implements IStripePaymentInterface {
    async createPayment(item: string, currency: string): Promise<any> {
        try {
            const amount = calculateOrderAmount(item)

            console.log(LoggingColor.warn, amount)

            const paymentIntent = await stripeHandler.paymentIntents.create({
                amount: amount,
                currency: currency,
            })            

            return paymentIntent.client_secret;
            
        } catch(error) {
            throw new Error(`${error}`)
        }
    }
}