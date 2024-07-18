
import { MutationResolvers } from '../../../../generated/graphql';
import { LoggingColor } from '../../../../libs/misc/LoggingColor';
import { GooglePlay } from '../../../../libs/providers/payment/GooglePlay';
import { prisma } from '../../../../libs/database/PrismaClient';
import PlayerUtils from '../../../../libs/utils/function/PlayerUtils';
import { getCapacityLevelNumber, getCapacityType } from '../../../../libs/utils/function/capacities/capacityValHandler';
import { giveCapacityPurcent } from '../../../../libs/utils/function/PurcentUtils';
import { updateCapacityValue } from '../../../../libs/utils/function/capacities/CapacityManager';
require('dotenv').config();

const verifyUuid = new PlayerUtils;
const google = new GooglePlay();

export const googleUpgradeCapacityResolver: MutationResolvers = {
    googleUpgradeCapacity: async (_, input): Promise<boolean> => {
        try {
            const playerId = input.playerId;
            const carType = input.carType;
            const productId = input.productId; 
            const capacityType = getCapacityType(productId);
            const targetLevel = getCapacityLevelNumber(productId);
            const token = input.token;
            const orderId = input.orderId;

            console.log("product Id input: ", productId)
    
            verifyUuid.validateUuid(playerId);
    
            const existingPlayer = await prisma.player.findFirst({
                where: {
                    playerId: playerId,
                }
            })

            if (!existingPlayer) {
                throw new Error(`${LoggingColor.error}[❌] player don't exist ! Actual level`);
            }

            const getRealLevel = await prisma.player.findFirst({
                where: {
                    playerId: playerId,
                    carCapacities: {
                        some: {
                            carType: carType,
                            capacity: {
                                some: {
                                    capacityName: capacityType,
                                }
                            }
                        }
                    }
                },
                select: {
                    carCapacities: {
                        where: { 
                            carType: carType
                        },
                        select: {
                            capacity: {
                                where: { 
                                    capacityName: capacityType
                                },
                                
                                select: {
                                    id: true,
                                    upgradeLevel: true,
                                    value: true,
                                    capacityName: true
                                }
                            }
                        }
                    }
                }
            })
            
            const paymentIsValid = await google.verifyPayment(productId, token, playerId, orderId);

            const actualLevel = getRealLevel?.carCapacities[0].capacity[0].upgradeLevel;
            const capacityId = getRealLevel?.carCapacities[0].capacity[0].id;
            const purcentValue = giveCapacityPurcent(carType, capacityType, targetLevel);
    
            if(paymentIsValid) {
                if (!updateCapacityValue[productId]) {
                    throw new Error("This item isn't supported.");
                } else {
                    const updateResult = await updateCapacityValue[productId]({
                        capacityId: capacityId as number,
                        actualLevel: actualLevel as number,
                        purcentValue: purcentValue as number,
                        targetLevel: targetLevel,
                        prisma
                    })
                    if (updateResult) {
                        return true;
                    } else {
                        throw new Error("Upgrade failed. Please retry.")
                    }
                }
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
};
