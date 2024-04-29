import {  
    QueryResolvers, 
    UpgradePreviewResponse,
} from '../../generated/graphql';
import { LoggingColor } from '../../libs/misc/LoggingColor';
import { prisma } from '../../libs/database/PrismaClient';
import { giveCapacityPurcent } from '../../libs/utils/function/PurcentUtils';

/**
 * This resolver contain all query system for
 * track management. This resolver should not be confused 
 * with the track backend. There we only manages player stuff 
 * when a race is started/finished
 */
export const upgradePreviewResolver: QueryResolvers = {
    getUpgradePreview: async(_, input): Promise<UpgradePreviewResponse> => {
        const carType = input.carType
        const playerId = input.playerId
        const desiredLevel = input.upgradeLevel
        const capacityType = input.capacityType

        let response;

        try {
            const existingPlayer = await prisma.player.findFirst({
                where: {
                    playerId: playerId,
                }
            })

            if (!existingPlayer) {
                throw new Error(`${LoggingColor.error}[❌] player don't exist !`);
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
                        where: { carType: carType},
                        select: {
                            capacity: {
                                where: { capacityName: capacityType },
                                select: {
                                    id: true,
                                    upgradeLevel: true,
                                    value: false,
                                    capacityName: true
                                }
                            }
                        }
                    }
                }
            });

            if (desiredLevel === 6) {
                const capacityPurcent = giveCapacityPurcent(carType, capacityType, 6);
    
                response = {
                    message: "Purcent sended successfully",
                    success: true,
                    purcent: capacityPurcent as number
                }

            } else if(desiredLevel !== getRealLevel?.carCapacities[0].capacity[0].upgradeLevel as number + 1) {
                throw new Error(`You must give your next level ! You are actually level ${getRealLevel?.carCapacities[0].capacity[0].upgradeLevel} Also, you can choose level 6 directly.`)
            } else {
                const capacityPurcent = giveCapacityPurcent(carType, capacityType, desiredLevel);
    
                response = {
                    message: "Purcent sended successfully",
                    success: true,
                    purcent: capacityPurcent as number
                }
            }

            return response
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
}