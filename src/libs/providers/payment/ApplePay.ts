import { ReceiptUtility } from "@apple/app-store-server-library"
import { prisma } from '../../database/PrismaClient';
import { APPLE_ROOT_CA_G3_FINGERPRINT, decodeTransaction } from 'app-store-server-api';
import { appleApiProvider } from '../helpers/auth/AppleAuth';
import { getProductName } from '../../utils/function/capacities/capacityValHandler';
require('dotenv').config();

export class ApplePay {
    async getPayment(receiptData: string, playerId: string, productId: string): Promise<boolean> {
        const receiptUtil = new ReceiptUtility();       

        try {
            const playerExist = await prisma.player.findFirst({
                where: {
                    playerId: playerId
                }
            })

            if (!playerExist) throw new Error(`Player don't exist`)

            const transactionExist = await prisma.applePaymentHistory.findFirst({
                where: {
                    receipt: receiptData
                }
            })

            if (!transactionExist) {
                await prisma.applePaymentHistory.create({
                    data: {
                        player: {
                            connect: {
                                playerId: playerId
                            }
                        },
                        isDone: false,
                        itemId: productId,
                        receipt: receiptData,                 
                    }
                })
            }

            const transactionId = receiptUtil.extractTransactionIdFromTransactionReceipt(receiptData);
            if (!transactionId) {
                throw new Error("Failed to retrieve transaction information.");
            }

            const transactionInfo = await appleApiProvider.getTransactionInfo(transactionId as string);
            if (!transactionInfo) {
                console.log("Failed to retrieve transaction information.");
                return false;
            }

            const decodedTransaction = await decodeTransaction(transactionInfo as string, APPLE_ROOT_CA_G3_FINGERPRINT)
            if (!decodedTransaction) {
                console.log("Failed to decode transaction information.");
                return false
            }
        
            if (decodedTransaction) {
                await prisma.applePaymentHistory.update({
                    where: {
                        receipt: receiptData
                    },
                    data: {
                        player: {
                            connect: {
                                playerId: playerId
                            }
                        },
                        isDone: true,
                        itemId: productId,
                        receipt: receiptData,                 
                    }
                })

                return true;
            } else {
                await prisma.applePaymentHistory.update({
                    where: {
                        receipt: receiptData
                    },
                    data: {
                        player: {
                            connect: {
                                playerId: playerId
                            }
                        },
                        isDone: false,
                        itemId: productId,
                        receipt: receiptData,                 
                    }
                })

                return false;
            }

        } catch (error) {
            console.error("Transaction verification cannot be issued..", error);
            return false;
        }
    }

    /**
     * Permit to obtain productId
     * @param receiptData 
     * @returns 
     */
    async extractProductFromReceipt(receiptData: string): Promise<string> {
        const receiptUtil = new ReceiptUtility();
        const transactionId = receiptUtil.extractTransactionIdFromTransactionReceipt(receiptData);
        const transactionInfo = await appleApiProvider.getTransactionInfo(transactionId as string);
        const decodedTransaction = await decodeTransaction(transactionInfo as string, APPLE_ROOT_CA_G3_FINGERPRINT)

        const extractProductId = decodedTransaction.productId;
        const productId = getProductName(extractProductId);

        return productId;
    }

    /**
     * Permit to compare itemId with productId.
     * @param receiptData 
     * @param itemId 
     * @returns 
     */
    async appleCompareItemIdWithTransaction(receiptData: string, itemId: string): Promise<boolean> {
        const receiptUtil = new ReceiptUtility();
        const transactionId = receiptUtil.extractTransactionIdFromTransactionReceipt(receiptData);
        const transactionInfo = await appleApiProvider.getTransactionInfo(transactionId as string);
        const decodedTransaction = await decodeTransaction(transactionInfo as string, APPLE_ROOT_CA_G3_FINGERPRINT)
        const brutProductId = decodedTransaction.productId;
        const productId = getProductName(brutProductId)

        if (itemId === productId) {
            return true;
        } else {
            return false
        }

    }
}
