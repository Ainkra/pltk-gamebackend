import { google } from "googleapis";
import { IGooglePaymentInterface } from "../../interface/IPaymentInterface";
import { authClient } from "../helpers/auth/GoogleAuth";
import { prisma } from "../../database/PrismaClient";
require('dotenv').config();

const androidpublisher = google.androidpublisher({ version: 'v3', auth: authClient });

export class GooglePlay implements IGooglePaymentInterface {
    async verifyPayment(productId: string, purchaseToken: string, playerId: string, orderId: string) {
        try {
            await authClient.authorize();
            const existingPlayer = await prisma.player.findFirst({
                where: {
                    playerId: playerId,
                }
            })

            if(!existingPlayer) {
                throw new Error(`Player not found. `)
            }

            const paymentExist = await prisma.googlePaymentHistory.findFirst({
                where: {
                    token: purchaseToken,
                    player: {
                        playerId: playerId
                    }
                }
            })

            if (!paymentExist) {
                await prisma.googlePaymentHistory.create({
                    data: {
                        player: {
                            connect: {
                                playerId: playerId
                            }
                        },
                        orderId: orderId,
                        itemId: productId,
                        token: purchaseToken,
                        isDone: false,       
                    }
                })
            }

            if(paymentExist?.isDone === true) {
                throw new Error(`Payment has already been made.`)
            }
    
            const purchaseResponse = await androidpublisher.purchases.products.get({
                packageName: 'com.myEnterprise.product',
                productId: productId,
                token: purchaseToken
            });

            switch(purchaseResponse.data.purchaseState) {
                case 0:
                    const acknowlegdePurchase = await androidpublisher.purchases.products.acknowledge({
                        packageName: 'com.myEnterprise.product',
                        productId: productId,
                        token: purchaseToken,
                    });

                    if(acknowlegdePurchase) {
                        console.log('Purchase acknowledged');
    
                        await prisma.googlePaymentHistory.update({
                            where: {
                                token: purchaseToken
                            },
                            data: {
                                player: {
                                    connect: {
                                        playerId: playerId
                                    }
                                },
                                itemId: productId,
                                isDone: true,       
                            }
                        }); 
        
                        return true;
                    } else {
                        throw new Error(`Something wrong at validation.`)
                    }  
                case 1:
                    await prisma.googlePaymentHistory.create({
                        data: {
                            player: {
                                connect: {
                                    playerId: playerId
                                }
                            },
                            itemId: productId,
                            orderId: orderId,
                            token: purchaseToken,
                            isDone: false,       
                        }
                    }) 
                    console.log("payment canceled...")
    
                    return false;
                case 2:
                    await prisma.googlePaymentHistory.create({
                        data: {
                            player: {
                                connect: {
                                    playerId: playerId
                                }
                            },
                            orderId: orderId,
                            itemId: productId,
                            token: purchaseToken,
                            isDone: false,       
                        }
                    })
                    console.log("Payment in pending...")

                    return false;
                default:
                    throw new Error();
            }
        } catch (error) {
            console.error(error);
            throw new Error(`Error: ${error}`);
        }
    }
}