import {
    SettingType,
    CarType,
    QueryResolvers,
    ResolverTypeWrapper,
    Car,
    CapacityType,
    GaragePriceResponse,
} from '../../generated/graphql';
import { prisma } from '../../libs/database/PrismaClient';
import PlayerUtils from '../../libs/utils/function/PlayerUtils';
import { productPrices } from '../../libs/utils/data/productPriceData';
import { parseAndExpandOwnedItems } from '../../libs/utils/function/RankUtils';
import { productDescription } from '../../libs/utils/data/productDescription';
require('dotenv').config();

const uuid = new PlayerUtils;

export const garageDataResolver: QueryResolvers = {
    /**
     * Get all garage data for a specific player.
     * You get all capacities per cars
     * @param _ 
     * @param input playerId 
     * @returns 
     */
    getGarageData: async (_, input): Promise<ResolverTypeWrapper<Car>[]> => {
        try {
            uuid.validateUuid(input.playerId)

            const player = await prisma.player.findFirst({
                where: {
                    playerId: input.playerId,
                },
                include: {
                    carSettings: {
                        select: {
                            carType: true,
                            setting: {
                                select: {
                                    id: true,
                                    settingName: true,
                                    preference: true,
                                    upgradeLevel: true
                                }
                            }
                        }
                    },
                    carCapacities: {
                        select: {
                            carType: true,
                            capacity: {
                                select: {
                                    capacityName: true,
                                    levelMax: true,
                                    upgradeLevel: true,
                                    value: true,
                                }
                            },
                        },
                    },

                },
            });

            if (!player) {
                throw new Error(`Player with playerId ${input.playerId} not found`);
            }

            const cars: Car[] = [];

            const order = ['TOP_SPEED', 'ACCELERATION', 'SHIELDING', 'NITRO'];

            player.carSettings.forEach((carSetting: any) => {
                const carType = carSetting.carType as CarType;
                const capacities = player.carCapacities.find(
                    (item: any) => item.carType === carType
                )?.capacity || [];

                const sortedCapacities = capacities.sort((a: any, b: any) => {
                    return order.indexOf(a.capacityName as CapacityType) - order.indexOf(b.capacityName as CapacityType);
                }).map((capacity: any) => ({
                    capacityName: capacity.capacityName as CapacityType,
                    upgradeLevel: capacity.upgradeLevel,
                    levelMax: capacity.levelMax,
                    value: capacity.value,
                }));

                const car: Car = {
                    carType: carType,
                    settings: carSetting.setting.map((setting: any) => ({
                        settingName: setting.settingName as SettingType,
                        preference: setting.preference,
                        upgrade: setting.upgradeLevel,
                    })),
                    capacities: sortedCapacities,
                };

                cars.push(car);
            });

            return cars;

        } catch (error) {
            console.error('Error in getGarageData resolver:', error);
            throw new Error('Failed to fetch garage data');
        }
    },
    /**
     * Obtain all garages prices.
     * No args.
     * @param _ 
     * @returns 
     */
    getGaragePrices: async (_, input): Promise<ResolverTypeWrapper<GaragePriceResponse>[]> => {
        const playerId = input.playerId;

        const [applePayments, googlePayments, stripePayments] = await Promise.all([
            prisma.applePaymentHistory.findMany({
                where: { playerUuid: playerId, isDone: true },
                select: { itemId: true }
            }),
            prisma.googlePaymentHistory.findMany({
                where: { playerUuid: playerId, isDone: true },
                select: { itemId: true }
            }),
            prisma.stripePaymentHistory.findMany({
                where: { playerUuid: playerId, isDone: true },
                select: { item: true }
            })
        ]);
    
        const ownedItems = new Set<string>();

        applePayments.forEach(payment => parseAndExpandOwnedItems(
            payment.itemId, ownedItems)
        );

        googlePayments.forEach(payment => parseAndExpandOwnedItems(
            payment.itemId, ownedItems)
        );
        
        stripePayments.forEach(payment => payment.item.forEach(
            item => parseAndExpandOwnedItems(item, ownedItems))
        );

        const response: GaragePriceResponse[] = Object.keys(productPrices).map(productId => {
            const price = productPrices[productId].toFixed(2);
            const owned = ownedItems.has(productId);
            return {
                productId,
                productInfo: {
                    locale: "fr-FR",
                    title: productId.replace(/_/g, ' ').toUpperCase(),
                    description: productDescription[productId] || "No description available",
                    price: price.toString(),
                    owned: owned
                }
            };
        });

        return response;
    }
}