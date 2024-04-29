import { validate } from 'uuid';
import {  
    QueryResolvers, 
    ResolverTypeWrapper,   
    PlayerTrackResponse,
} from '../../generated/graphql';
import { LoggingColor } from '../../libs/misc/LoggingColor';
import { prisma } from '../../libs/database/PrismaClient';

/**
 * This resolver contain all query system for
 * track management. This resolver should not be confused 
 * with the track backend. There we only manages player stuff 
 * when a race is started/finished
 */
export const trackQueryResolver: QueryResolvers = {
    /**
     * Allows you to update the player's 
     * inventory after each race (race price, addition/removal of currencies, etc.)
     * @param _ 
     * @param args 
     * @param context 
     * @returns 
     */
    playerTrack: async(_, args, context): Promise<ResolverTypeWrapper<PlayerTrackResponse>> => {
        try {
            const playerId = args.playerId;
            const trackId = args.trackId;

            if (!validate(playerId)) {
                throw new Error('playerId Invalid Input ');
            }

            const existingPlayer = await prisma.player.findUnique({
                where: {
                    playerId: playerId
                },
                include: {
                    inventory: true,
                    userStatistics: true
                }
            });
    
            if (!existingPlayer) {
                throw new Error('Player not found');
            }
            
            /**
             * Hard coded reducers/increasers
             */
            const HardCurrencyFactor = 10;
            const SoftCurFactor = 30;
            const EnergyFactor = 30;
            const UpgradeKitFactor = 1;
            const RepairKitFactor = 1;
            const ReputationLevelFactor = 1;
            const DamagePackFactor = 1;

            /**
             * Store current values from database
             */
            const currentHardCur = existingPlayer.inventory.hard_currency;
            const currentSoftCur = existingPlayer.inventory.soft_currency;
            const currentEnergy = existingPlayer.inventory.energy;
            const currentUpgradeKit = existingPlayer.inventory.upgrade_kit;
            const currentRepairKit = existingPlayer.inventory.repair_kit;
            const currentReputationLevel = existingPlayer.inventory.reputation_level;
            const currentDamagePack = existingPlayer.inventory.damage_pack;

            /**
             * Front values storage
             */
            let frontHardCur: number = 0;
            let frontSoftCur: number = 0;
            let frontEnergy: number = 0;
            let frontUpgradeKit: number = 0;
            let frontRepairKit: number = 0;
            let frontReputationLevel: number = 0;
            let frontDamagePack: number = 0;

            /**
             * DB values storage
             */
            let dbHardCur: number = 0;
            let dbSoftCur: number = 0;
            let dbEnergy: number = 0;
            let dbUpgradeKit: number = 0;
            let dbRepairKit: number = 0;
            let dbReputationLevel: number = 0;
            let dbDamagePack: number = 0;

            /**
             * Send true if currency (or other) ar taked, and false if not
             */
            let isTrueHardCur: boolean;
            let isTrueSoftCur: boolean;
            let isTrueEnergy: boolean;
            let isTrueUpgradeKit: boolean;
            let isTrueRepairKit: boolean;
            let isTrueReputationLevel: boolean;
            let isTrueDamagePack: boolean;

            /** front = to send to the front end
             *  db = to send to the DB */
            if(currentHardCur >= HardCurrencyFactor) {
                const hardCurResult = currentHardCur - HardCurrencyFactor;

                frontHardCur = hardCurResult;
                dbHardCur = hardCurResult;
                isTrueHardCur = true;
            } else {
                frontHardCur = currentHardCur;
                dbHardCur = currentHardCur;
                isTrueHardCur = false;
            }
            
            if(currentSoftCur >= SoftCurFactor) {
                const softCurrResult = currentSoftCur - SoftCurFactor;

                frontSoftCur = softCurrResult;
                dbSoftCur = softCurrResult;
                isTrueSoftCur = true;
            } else {
                frontSoftCur = currentSoftCur;
                dbSoftCur = currentSoftCur;
                isTrueSoftCur = false;
            }
            
            if(currentEnergy >= EnergyFactor) {
                const energyResult = currentEnergy - EnergyFactor;

                frontEnergy = energyResult;
                dbEnergy = energyResult;
                isTrueEnergy = true;
            } else {
                frontEnergy = currentEnergy;
                dbEnergy = currentEnergy;
                isTrueEnergy = false;
            }
            
            if(currentUpgradeKit >= UpgradeKitFactor) {
                const upgradeKitResult = currentUpgradeKit - UpgradeKitFactor;

                frontUpgradeKit = upgradeKitResult;
                dbUpgradeKit = upgradeKitResult;
                isTrueUpgradeKit = true;
            } else {
                frontUpgradeKit = 0;
                dbUpgradeKit = currentUpgradeKit;
                isTrueUpgradeKit = false;
            }
            
            if(currentRepairKit >= RepairKitFactor) {
                const repairKitResult = currentRepairKit - RepairKitFactor;

                frontUpgradeKit = repairKitResult;
                dbRepairKit = repairKitResult;
                isTrueRepairKit = true;
            } else {
                frontUpgradeKit = currentRepairKit;
                dbRepairKit = currentRepairKit;
                isTrueRepairKit = false;
            }
            
            if(currentReputationLevel >= ReputationLevelFactor) {
                const reputationLevelResult = currentReputationLevel - ReputationLevelFactor;

                frontReputationLevel = reputationLevelResult;
                dbReputationLevel = reputationLevelResult;
                isTrueReputationLevel = true;
            } else {
                frontReputationLevel = currentReputationLevel;
                dbReputationLevel = currentReputationLevel;
                isTrueReputationLevel = false;
            }
            
            if(currentDamagePack >= DamagePackFactor) {
                const damagePackResult = currentDamagePack - DamagePackFactor;

                frontDamagePack = damagePackResult;
                dbDamagePack = damagePackResult;
                isTrueDamagePack = true;
            } else {
                frontDamagePack = currentDamagePack;
                dbDamagePack = currentDamagePack;
                isTrueDamagePack = false;
            }

            /**
             * Permit to update player inventory (and user statistics in future)
             * If the player does not have enough of a currency or other, we put 
             * the same initial value back into the database with the others. 
             * If the player has enough, we update the value. In all cases we update all the data at once.
             */
            const updatedPlayer = await prisma.player.update({
                where: {
                    playerId: playerId,
                },
                data: {
                    inventory: {
                        update: {
                            hard_currency: dbHardCur,
                            soft_currency: dbSoftCur,
                            energy: dbEnergy,
                            repair_kit: dbRepairKit,
                            upgrade_kit: dbUpgradeKit,
                            reputation_level: dbReputationLevel,
                            damage_pack: dbDamagePack,
                        }
                    },
                    // TODO: To be defined via a spec
                    // userStatistics: {
                    //     update: {
                    //         energyUsed: 10,
                    //         usedCarType: 'GT',
                    //     }
                    // }
                },
                select: {
                    userId: false,
                    inventory: {
                        select: {
                            id: false,
                            hard_currency: true,
                            soft_currency: true,
                            energy: true,
                            upgrade_kit: true,
                            damage_pack: true,
                            reputation_level: true,
                            repair_kit: true
                        }
                    }
                }
            });
    
            /**
             * We need to parse all data for apollo.
             * (Mandatory)
             */
            const result = {
                playerId: existingPlayer.playerId,
                updatedPlayer,
                frontValues: {
                    frontHardCur,
                    frontSoftCur,
                    frontEnergy,
                    frontUpgradeKit,
                    frontRepairKit,
                    frontReputationLevel,
                    frontDamagePack,
                },
                isTrueValues: {
                    isTrueHardCur,
                    isTrueSoftCur,
                    isTrueEnergy,
                    isTrueUpgradeKit,
                    isTrueRepairKit,
                    isTrueReputationLevel,
                    isTrueDamagePack,
                },
            };

            console.log("[☑️] playerTrack request sended successfully");
            console.log(result);

            return result;
    
        } catch (error) {
            throw new Error(`${LoggingColor.error}[❌] Player inventory update failed: : ${error}`);
        }
    },
};


