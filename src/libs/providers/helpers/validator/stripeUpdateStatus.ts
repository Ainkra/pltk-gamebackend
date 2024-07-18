import { prisma } from '../../../database/PrismaClient';
export async function stripeUpdateStatus(paymentIntentId: string, status: string) {
    try {
        const validStatus = [
            'payment_intent.succeeded', 
            'payment_method.attached', 
            'payment_intent.payment_failed'
        ];
        if (!validStatus.includes(status)) {
            throw new Error(`Unhandled event type ${status}`);
        }
        const update = await prisma.stripePaymentHistory.update({
            where: {
                paymentIntentId: paymentIntentId,
            },
            data: {
                status: status,
            }
        });
        return update;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut du paiement:", error);
        throw error;
    }
}
