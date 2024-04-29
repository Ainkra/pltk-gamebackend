import {
    QueryResolvers,
    ResolverTypeWrapper,
    BackendCapacityResponse,
    CapacityType,
} from '../../generated/graphql';
import { LoggingColor } from '../../libs/misc/LoggingColor';
import { ajustUnroundedNumber } from '../../libs/misc/FloatAdjuster';
import { prisma } from '../../libs/database/PrismaClient';
import PlayerUtils from '../../libs/utils/function/PlayerUtils';
import { carCoefUtils } from '../../libs/utils/function/capacities/CarTypeUtils';

const playerUtils = new PlayerUtils();

/**
 * Query resolvers concern player car's.
 */
export const playerCarDataResolver: QueryResolvers = {
    /**
     * Get car data
     * @param _ 
     * @param input carType, playerId
     * @returns 
     */
    getPlayerAssociatedCarData: async (_, input): Promise<ResolverTypeWrapper<BackendCapacityResponse>[]> => {
        try {
            const carType = input.carType;
            const playerId = input.playerId;

            playerUtils.validateUuid(playerId);
            playerUtils.playerExist(playerId)

            const playerCapacities = await prisma.player.findMany({
                where: {
                    playerId: playerId,
                },
                include: {
                    carCapacities: {
                        select: {
                            carType: true,
                            capacity: {
                                select: {
                                    id: true,
                                    capacityName: true,
                                    value: true,
                                    upgradeLevel: true,
                                },
                            },
                        }
                    }
                },
            });

            let result: BackendCapacityResponse[] = [];

            playerCapacities.forEach(playerCapacity => {
                playerCapacity.carCapacities.forEach(carCapacity => {
                    if (carCapacity.carType === carType) {
                        carCapacity.capacity.forEach(capacity => {
                            let coefficient = carCoefUtils(carType, capacity.capacityName as CapacityType, capacity.upgradeLevel);
                    
                            if (coefficient !== undefined) {

                                coefficient = ajustUnroundedNumber(coefficient, 3);
                                
                                result.push({
                                    id: capacity.capacityName as CapacityType,
                                    coefficient: coefficient
                                });
                            } else {
                                console.warn(`Coefficient non défini pour la capacité '${capacity.capacityName}' au niveau ${capacity.upgradeLevel}`);

                                result.push({
                                    id: capacity.capacityName as CapacityType,
                                    coefficient: 0 
                                });
                            }
                        });
                    }
                });
            });

            const order = ['ACCELERATION', 'TOP_SPEED', 'SHIELDING', 'NITRO'];
            result.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
            
            return result;
        } catch (error) {
            throw new Error(`${error}`);
        } finally {
            await prisma.$disconnect();
        }
    },
};
