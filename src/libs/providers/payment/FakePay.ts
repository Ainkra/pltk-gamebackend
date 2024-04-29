import { prisma } from "../../database/PrismaClient";

export class FakePay {
    async createFakePayment(playerId: string, productId: string, token: string, orderId: string) {
        try {
            await prisma.googlePaymentHistory.create({
                data: {
                    playerUuid: playerId,
                    itemId: productId,
                    token: token,
                    isDone: true,
                    orderId: orderId       
                }
            })

            return true
        } catch (error) {
            console.error("Error creating payment:", error);
            throw new Error(`Upgrade failed. Please retry ${error}`);
        }

    }
}
