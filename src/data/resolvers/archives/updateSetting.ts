// import { PrismaClient } from '@prisma/client';
// import {
//     MutationResolvers,
//     SettingType,
//     CarType,
//     SettingUpdateResponse,
// } from '../../generated/graphql';
// import { LoggingColor } from '../../libs/misc/LoggingColor';
// import PlayerUtils from '../../libs/utils/PlayerUtils';
// import { prisma } from '../../libs/database/PrismaClient';

// /**
//  * Hard coded costs
//  */
// const defaultCapacitiesPurcent = {
//     TopSpeed: 50,
//     Acceleration: 50,
//     Shielding: 50,
//     Nitro: 50,
// }

// const upgradeCapacitiesPurcent = {
//     TopSpeed: 10,
//     Acceleration: 10,
//     Shielding: 10,
//     Nitro: 8,
// }

// /**
//  * This resolver contain all mutation system for
//  * upgrade management.
//  */
// export const upgradeSettingResolver: MutationResolvers = {
//     updateSetting: async (_, input): Promise<SettingUpdateResponse> => {

//         const playerId: string = input.playerId;
//         const settingType: SettingType = input.settingType;
//         const currentLevel: number = input.currentLevel;
//         const desiredLevel: number = input.desiredLevel;
//         const carType: CarType = input.carType;
//         const uuid = new PlayerUtils;
//         const minLevel = 1;
//         const maxLevel = 6;

//         try {

//             const dbPlayerValues = await prisma.player.findFirst({
//                 where: {
//                     playerId: playerId,
//                     carSettings: {
//                         some: {
//                             carType: carType,
//                             setting: {
//                                 some: {
//                                     settingName: settingType,
//                                 }
//                             }
//                         },
//                     },
//                     carCapacities: {
//                         some: {
//                             carType: carType,
//                         }
//                     }
//                 },
//                 select: {
//                     carSettings: {
//                         where: { carType: carType },
//                         select: {
//                             setting: {
//                                 select: {
//                                     id: true,
//                                     settingName: true,
//                                     upgradeLevel: true,
//                                     preference: true,
//                                 }
//                             },
//                             carType: true,

//                         },
//                     },
//                     carCapacities: {
//                         where: { carType: carType },
//                         select: {
//                             capacity: {
//                                 select: {
//                                     id: true,
//                                     capacityName: true,
//                                     capacityValue: true,
//                                 }
//                             }
//                         }
//                     }
//                 },
//             });

//             uuid.validateUuid(playerId);

//             if (!dbPlayerValues) {
//                 throw new Error(`${LoggingColor.error}[❌] Player doesn't exist. Please retry.`)
//             }

//             const targetCar = dbPlayerValues.carSettings.find((carSetting) => carSetting.carType === carType);

//             if (!targetCar) {
//                 throw new Error(`${LoggingColor.error}[❌] carType doesn't exist. Please retry.`)
//             }

//             const targetSetting = targetCar.setting.find((setting) => setting.settingName === settingType);

//             if (!targetSetting) {
//                 throw new Error(`${LoggingColor.error}[❌] settingType doesn't exist. Please retry.`)
//             }

//             /**
//              * TODO: Verify if player don't try to upgrade another.
//              */
//             switch (settingType) {

//                 /**
//                  * Aerodynamics case treatment
//                  */
//                 case SettingType.Aerodynamics:
//                     const aerodynamics = dbPlayerValues?.carSettings[0]?.setting[3].preference;
//                     const aTargetSettingId = dbPlayerValues?.carSettings[0].setting[0].id;

//                     if (aerodynamics !== currentLevel) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. Please upgrade your setting first !`);
//                     } else if(desiredLevel < minLevel || desiredLevel > maxLevel) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. Please choose a valid value.`);
//                     } else if(desiredLevel === aerodynamics) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. You have already this setting value !`);
//                     } else {
//                         const updateSetting = await prisma.setting.update({
//                             where: {
//                                 id: aTargetSettingId,
//                             },
//                             data: {
//                                 preference: desiredLevel,
//                             },
//                         });

//                         // switch(settingType) {
//                         //     case SettingType.Aerodynamics:
//                         //         if(desiredLevel < 3) {
                                    
//                         //         }    
//                         //         break;
//                         //     case SettingType.Chassis:
//                         //         if(desiredLevel < 3) {
                                    
//                         //         }
//                         //         break;
//                         //     case SettingType.Suspension:
//                         //         if(desiredLevel < 3) {
                                    
//                         //         }

//                         //         break;
//                         // }

//                         const result: SettingUpdateResponse = {
//                             settingType: updateSetting.settingName as SettingType,
//                             message: "Successful upgraded",
//                             success: true,
//                             settingPreference: desiredLevel
//                         }

//                         return result;
//                     }

//                 /**
//                  * Chassis case treatment
//                  */
//                 case SettingType.Chassis:
//                     const chassis = dbPlayerValues?.carSettings[0]?.setting[3].upgradeLevel;
//                     const cTargetSettingId = dbPlayerValues?.carSettings[0].setting[0].id;

//                     if (chassis !== currentLevel) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Chassis} failed. Please retry.`);
//                     } else if(desiredLevel < minLevel || desiredLevel > maxLevel) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Chassis} failed. Please choose a valid value.`);
//                     } else if(desiredLevel === chassis) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Chassis} failed. You have already this setting value !`);
//                     } else {

//                         const updateSetting = await prisma.setting.update({
//                             where: {
//                                 id: cTargetSettingId,
//                             },
//                             data: {
//                                 preference: desiredLevel,
//                             },
//                         });

//                         const result: SettingUpdateResponse = {
//                             settingType: updateSetting.settingName as SettingType,
//                             message: "Successful upgraded",
//                             success: true,
//                             settingPreference: desiredLevel,
//                         }

//                         return result;
//                     }

//                 /**
//                  * Suspension case treatment
//                  */
//                 case SettingType.Suspension:
//                     const suspension = dbPlayerValues?.carSettings[0]?.setting[3].preference;
//                     const sTargetSettingId = dbPlayerValues?.carSettings[0].setting[0].id;

//                     if (suspension !== currentLevel) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Suspension} failed. Please retry.`);
//                     } else if(desiredLevel < minLevel || desiredLevel > maxLevel) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Suspension} failed. Please choose a valid value.`);
//                     } else if(desiredLevel === suspension) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Suspension} failed. You have already this setting value !`);
//                     } else {

//                         const updateSetting = await prisma.setting.update({
//                             where: {
//                                 id: sTargetSettingId,
//                             },
//                             data: {
//                                 preference: desiredLevel,
//                             },
//                         });

//                         const result: SettingUpdateResponse = {
//                             settingType: updateSetting.settingName as SettingType,
//                             message: "Successful upgraded",
//                             success: true,
//                             settingPreference: desiredLevel
//                         }

//                         return result;
//                     }
//             }
//         } catch (error) {
//             throw new Error(`${LoggingColor.error}[❌] Something wrong: : ${error}`)
//         }
//     }
// };
