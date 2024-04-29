import { MutationResolvers } from "../generated/graphql";
import { getCapacityLevelNumber, getCapacityType } from "../libs/utils/function/capacities/capacityValHandler";
import PlayerUtils from "../libs/utils/function/PlayerUtils";
import { giveCapacityPurcent } from "../libs/utils/function/PurcentUtils";
import { prisma } from "../libs/database/PrismaClient";
import { updateCapacityValue } from "../libs/utils/function/capacities/CapacityManager";
import { FakePay } from "../libs/providers/payment/FakePay";

const playerUtils = new PlayerUtils;
const fakePay = new FakePay();

/**
 * USE THIS RESOLVER ONLY FOR TESTING !
 * DISABLE THEM IN RESOLVERLINKER AFTER USE !
 * 
 * 29967e12-ae8b-428e-8576-687db4351ac9
 * f4f99837-2a43-464d-a003-e9c10caf8fa5
 * 168c3368-b222-4a57-94a9-9923ecb39723
 * c15a0bc8-3d62-479f-8023-b38fbedc993f
 */
export const testUpgradeCapacityResolver: MutationResolvers = {
    testUpgradeCapacity: async (_, input): Promise<boolean> => {

        const playerId = input.playerId;
        const carType = input.carType;
        const productId = input.productId; 
        const token = input.token
        const capacityType = getCapacityType(productId);
        const targetLevel = getCapacityLevelNumber(productId);
        const orderId = input.orderId

        if (!playerUtils.validateUuid(playerId)) {
            throw new Error("Invalid UUID format for playerId.");
        }

        playerUtils.playerExist(playerId);

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

        const actualLevel = getRealLevel?.carCapacities[0].capacity[0].upgradeLevel;
        const capacityId = getRealLevel?.carCapacities[0].capacity[0].id;
        const purcentValue = giveCapacityPurcent(carType, capacityType, targetLevel);

        const paymentIsValid = await fakePay.createFakePayment(playerId, productId, token, orderId);

        if (paymentIsValid) {
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
            throw new Error()
        }


    }
}