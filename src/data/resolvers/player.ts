import { v4 as genUuid, validate } from 'uuid';
import {
    Player,
    QueryResolvers,
    ResolverTypeWrapper,
    MutationResolvers,
    PlayerResponse,
    SettingType,
    CapacityType,
    PlayerCreationResponse,
    CarType,
} from '../../generated/graphql';
import { LoggingColor } from '../../libs/misc/LoggingColor';
import { prisma } from '../../libs/database/PrismaClient';
import { PurcentFormulav, PurcentGt, PurcentSpeeder, PurcentTruckster } from '../../libs/utils/data/capacityPurcentData';
import PlayerUtils from '../../libs/utils/function/PlayerUtils';

const playerUtils = new PlayerUtils;

/**
 * This resolver contain all query system for
 * player management.
 */
export const playerQueryResolver: QueryResolvers = {
    /**
     * Permit to get player inventory
     * @param _ 
     * @param args 
     * @param context 
     * @returns 
     */
    getPlayerInventory: async (_, args, context): Promise<ResolverTypeWrapper<Player>> => {
        try {
            const playerId = args.playerId;

            if (!validate(playerId)) {
                throw new Error('playerId Invalid Input ');
            }

            const playerExist = await prisma.player.findUnique({
                where: {
                    playerId: playerId,
                },
            });

            if (!playerExist) {
                throw new Error('[❌]');
            }

            const player = await prisma.player.findUnique({
                where: {
                    playerId: playerId,
                },
                include: {
                    inventory: {
                        select: {
                            id: true,
                            hard_currency: true,
                            soft_currency: true,
                            damage_pack: true,
                            energy: true,
                            repair_kit: true,
                            upgrade_kit: true,
                            reputation_level: true,
                        },
                    },
                },
            });

            if (!player) {
                throw new Error(`${LoggingColor.error}[❌]`);
            }

            const result = {
                playerId: player.playerId,
                inventory: {
                    id: player.inventory.id,
                    hardCurrency: player.inventory.hard_currency,
                    softCurrency: player.inventory.soft_currency,
                    energy: player.inventory.energy,
                    damagePack: player.inventory.damage_pack,
                    upgradeKit: player.inventory.upgrade_kit,
                    reputationLevel: player.inventory.reputation_level,
                    repairKit: player.inventory.repair_kit,
                },
            };

            console.log("[☑️] Inventory response sended successfully");

            return result;

        } catch (error) {
            throw new Error(`${LoggingColor.error}[❌] Inventory not found`);
        }
    },

    /** 
     * Permit to get player (only player)
     * @param _ 
     * @param args 
     * @param context 
     * @returns 
     */
    getPlayer: async (_, args): Promise<ResolverTypeWrapper<PlayerResponse>> => {
        try {
            const userId = args.userId

            if (!validate(userId)) {
                throw new Error(`${LoggingColor.error}[❌] playerId Invalid Input `);
            }

            const playerExist = await prisma.player.findUnique({
                where: {
                    userId: userId,
                },
                select: {
                    playerId: true,
                    userId: false,
                    inventory: false,
                    country: true,
                    playerName: true,
                },
            });

            if (!playerExist) {
                throw new Error('Player not found');
            }

            const result = {
                playerId: playerExist.playerId,
                playerExist: true,
                country: playerExist.country,
                playerName: playerExist.playerName
            };

            console.log(LoggingColor.valid, "☑️  Player response sended successfuly")

            return result;

        } catch {
            throw new Error(`Player doesn't exist. Please retry.`)
        }
    },
};

/**
 * This resolver contain all mutation system for
 * player management.
 */
export const playerMutationResolver: MutationResolvers = {
    /**
     * Permit to create a player. 
     * @param _
     * @param param1 userId, playerName
     * @param context 
     * @returns 
     */
    createPlayer: async (_, { input }): Promise<PlayerCreationResponse> => {
        try {
            const userUuid = input.userId;
            const playerUuid = genUuid();
            const playerName = playerUtils.isString(input.playerName);

            // Check that the request indeed gives us a UUID and not something else
            playerUtils.validateUuid(userUuid);
            playerUtils.playerDontExist(userUuid)

            const currentDate = new Date();
            currentDate.setHours(0);
            currentDate.setMinutes(0);
            currentDate.setSeconds(0);

            await prisma.player.create({
                data: {
                    userId: userUuid,
                    playerId: playerUuid,
                    playerName: playerName,
                    country: "FR",
                    inventory: {
                        create: {
                            hard_currency: 2000,
                            soft_currency: 2000,
                            energy: 2000,
                            repair_kit: 2000,
                            upgrade_kit: 2000,
                            reputation_level: 2000,
                            damage_pack: 2000
                        }
                    },
                    userStatistics: {
                        create: {
                            hardCurrencyUsed: 0,
                            softCurrencyUsed: 0,
                            timeSpentInRace: currentDate,
                            arenaModeCount: 0,
                            energyUsed: 0,
                            freeCreditCount: 0,
                            paymentRevenue: 0,
                            usedCarType: CarType.Gt,
                        }
                    },
                    carCapacities: {
                        create: [
                            {
                                carType: CarType.Gt,
                                fullyUpgraded: false,
                                capacity: {
                                    create: [
                                        {
                                            capacityName: CapacityType.Acceleration,
                                            value: PurcentGt.ACCELERATION_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.TopSpeed,
                                            value: PurcentGt.TOPSPEED_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.Shielding,
                                            value: PurcentGt.SHIELDING_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.Nitro,
                                            value: PurcentGt.NITRO_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        }
                                    ]
                                }
                            },
                            {
                                carType: CarType.Formulav,
                                fullyUpgraded: false,
                                capacity: {
                                    create: [
                                        {
                                            capacityName: CapacityType.Acceleration,
                                            value: PurcentFormulav.ACCELERATION_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.TopSpeed,
                                            value: PurcentFormulav.TOPSPEED_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.Shielding,
                                            value: PurcentFormulav.SHIELDING_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.Nitro,
                                            value: PurcentFormulav.NITRO_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        }
                                    ]
                                }
                            },
                            {
                                carType: CarType.Speeder,
                                fullyUpgraded: false,
                                capacity: {
                                    create: [
                                        {
                                            capacityName: CapacityType.Acceleration,
                                            value: PurcentSpeeder.ACCELERATION_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.TopSpeed,
                                            value: PurcentSpeeder.TOPSPEED_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.Shielding,
                                            value: PurcentSpeeder.SHIELDING_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.Nitro,
                                            value: PurcentSpeeder.NITRO_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        }
                                    ]
                                }
                            },
                            {
                                carType: CarType.Truckster,
                                fullyUpgraded: false,
                                capacity: {
                                    create: [
                                        {
                                            capacityName: CapacityType.Acceleration,
                                            value: PurcentTruckster.ACCELERATION_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.TopSpeed,
                                            value: PurcentTruckster.TOPSPEED_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                        {
                                            capacityName: CapacityType.Shielding,
                                            value: PurcentTruckster.SHIELDING_1,
                                            upgradeLevel: 1,
                                            levelMax: 6
                                        },
                                    ]
                                }
                            },
                        ]
                    },
                    carSettings: {
                        create: [
                            {
                                carType: CarType.Gt,
                                setting: {
                                    create: [
                                        {
                                            settingName: SettingType.Aerodynamics,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        },
                                        {
                                            settingName: SettingType.Chassis,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        },
                                        {
                                            settingName: SettingType.Suspension,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        }
                                    ]
                                }
                            },
                            {
                                carType: CarType.Speeder,
                                setting: {
                                    create: [
                                        {
                                            settingName: SettingType.Aerodynamics,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        },
                                        {
                                            settingName: SettingType.Chassis,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        },
                                        {
                                            settingName: SettingType.Suspension,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        }
                                    ]
                                }
                            },
                            {
                                carType: CarType.Formulav,
                                setting: {
                                    create: [
                                        {
                                            settingName: SettingType.Aerodynamics,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        },
                                        {
                                            settingName: SettingType.Chassis,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        },
                                        {
                                            settingName: SettingType.Suspension,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        }
                                    ]
                                }
                            },
                            {
                                carType: CarType.Truckster,
                                setting: {
                                    create: [
                                        {
                                            settingName: SettingType.Aerodynamics,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        },
                                        {
                                            settingName: SettingType.Chassis,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        },
                                        {
                                            settingName: SettingType.Suspension,
                                            preference: 3,
                                            upgradeLevel: 1,
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                
                select: {
                    id: true,
                    playerId: true,
                    carCapacities: {
                        select: {
                            capacity: true,
                        }
                    },
                },
            })

            const result = {
                playerId: playerUuid,
                message: 'Player creation success',
                success: true
            }

            console.log(result)

            return result;

        } catch (error) {
            console.log(`[❌] Player creation failed: ${error}`)
            throw new Error(`[❌] Player creation failed: ${error}`);
        }
    }
}