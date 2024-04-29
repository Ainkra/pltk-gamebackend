import { validate } from 'uuid';
import { 
    PaymentIntentResponse,
    MutationResolvers
} from '../../../../generated/graphql';
import Stripe from 'stripe';
import { LoggingColor } from '../../../../libs/misc/LoggingColor';
import { StripePay } from '../../../../libs/providers/payment/StripePay';
import { prisma } from '../../../../libs/database/PrismaClient';
require('dotenv').config();

const sKey: string = process.env.STRIPE_SKEY as string;
const stripeHandler = new Stripe(sKey);

/**
 * This resolver contain all mutation system for
 * stripe management.
 */
export const stripeMutationResolvers: MutationResolvers = {

    /**
     * Permit to process all payments.
     * @param _ 
     * @param input 
     * @returns 
     */
    stripeUpgradeCapacity: async (_, input): Promise<PaymentIntentResponse> => {
        try {
            const currency: string = input.currency;
            const productId = input.productId
            const playerId = input.playerId;
            const stripe = new StripePay;

            if (!validate(input.playerId)) {
                throw new Error(`${LoggingColor.error}[❌] playerId invalid input`);
            }

            const playerExist = await prisma.player.findUnique({
                where: {
                    playerId: playerId,
                },
            });

            if (!playerExist) {
                throw new Error(`${LoggingColor.error}[❌] Player not found `);
            }

            const payment = await stripe.createPayment(currency, productId);
            await prisma.stripePaymentHistory.create({
                data: {
                    player: {
                        connect: {
                            playerId: playerId
                        }
                    },
                    paymentIntentId: payment,
                    status: 'payment_intent.requires_action',
                    isDone: false,
                    item: productId,
                }
            }) 

            const success = {
                success: true,
                message: "Payment intent succeed.",
                paymentIntentId: payment
            }
            
            return success;
        } catch (error) {
            console.log(`${LoggingColor.error}[❌] Payment intent are invalid. Please retry`);
            const failed = {
                success: false,
                message: "Payment intent failed. Please try again.",
                paymentIntentId: null
            }

            return failed;
        }
    },
}
