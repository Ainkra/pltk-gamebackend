import { MutationResolvers } from "../../../../generated/graphql";
import { LoggingColor } from "../../../../libs/misc/LoggingColor";
import { ApplePay } from "../../../../libs/providers/payment/ApplePay";
import { prisma } from "../../../../libs/database/PrismaClient";
import PlayerUtils from "../../../../libs/utils/function/PlayerUtils";
import { giveCapacityPurcent } from "../../../../libs/utils/function/PurcentUtils";
import { updateCapacityValue } from "../../../../libs/utils/function/capacities/CapacityManager";
import { getCapacityLevelNumber, getCapacityType } from "../../../../libs/utils/function/capacities/capacityValHandler";
require('dotenv').config();

const verifyUuid = new PlayerUtils;
const verifyPayment = new ApplePay();

export const appleUpgradeCapacityResolver: MutationResolvers = {
    appleUpgradeCapacity: async (_, input): Promise<boolean> => {
        const playerId = input.playerId;
        const carType = input.carType;
        const productId = input.productId;
        const capacityType = getCapacityType(productId);
        const targetLevel = getCapacityLevelNumber(productId);
        const receiptData = input.receiptData;

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

        if (!verifyPayment.appleCompareItemIdWithTransaction(receiptData, productId)) {
            throw new Error(`Your itemId doesnt correspond with our datas`)
        }

        const payment = await verifyPayment.getPayment(receiptData, playerId, productId);

        const actualLevel = getRealLevel?.carCapacities[0].capacity[0].upgradeLevel;
        const capacityId = getRealLevel?.carCapacities[0].capacity[0].id;
        const purcentValue = giveCapacityPurcent(carType, capacityType, targetLevel)

        if(payment) {
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
    }
}