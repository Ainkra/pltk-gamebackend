// import { PrismaClient } from '@prisma/client';
// import {
//     MutationResolvers,
//     SettingType,
//     CarType,
//     SettingUpgradeResponse,
// } from '../../generated/graphql';
// import { LoggingColor } from '../../libs/misc/LoggingColor';
// import PlayerUtils from '../../libs/utils/PlayerUtils';
// import { prisma } from '../../libs/database/PrismaClient';

// /**
//  * Hard coded costs
//  */
// const mecaCost: number = 10;
// const softCost: number = 200;

// /**
//  * This resolver contain all mutation system for
//  * upgrade management.
//  */
// export const upgradeSettingResolver: MutationResolvers = {
//     upgradeSetting: async (_, input): Promise<SettingUpgradeResponse> => {
//         try {

//             const playerId: string = input.playerId;
//             const settingType: SettingType = input.settingType;
//             const currentLevel: number = input.currentLevel;
//             const carType: CarType = input.carType;
//             const uuid = new PlayerUtils;

//             const playerSettings = await prisma.player.findFirst({
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
//                 },
//                 select: {
//                     inventory: true,
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
//                 },
//             });
//             const money = playerSettings?.inventory_id.soft_currency as number;
//             const mecaKit = playerSettings?.inventory.meca_kit as number;

//             uuid.validateUuid(playerId);

//             if (!playerSettings) {
//                 throw new Error(`${LoggingColor.error}[❌] Player doesn't exist. Please retry.`)
//             }

//             const targetCar = playerSettings.carSettings.find((carSetting) => carSetting.carType === carType);

//             if (!targetCar) {
//                 throw new Error(`${LoggingColor.error}[❌] carType doesn't exist. Please retry.`)
//             }

//             const targetSetting = targetCar.setting.find((setting) => setting.settingName === settingType);

//             if (!targetSetting) {
//                 throw new Error(`${LoggingColor.error}[❌] settingType doesn't exist. Please retry.`)
//             }

//             switch (settingType) {
//                 case SettingType.Aerodynamics:
//                     const aerodynamics = playerSettings?.carSettings[0]?.setting[3].upgradeLevel as number;
//                     const aTargetSettingId = playerSettings?.carSettings[0].setting[0].id;
//                     const aTargetInventoryId = playerSettings?.inventory.id;

//                     if (aerodynamics !== currentLevel) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. We don't find the same level in our datas.`);
//                     } else if (currentMecaKit !== mecaKit) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. No enough mecakits.`)
//                     } else if (currentMoney !== money) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. No enough money.`)
//                     } else if (currentMoney < softCost) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. No enough money.`)
//                     } else if (currentMecaKit < mecaCost) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. No enough mecakits.`)
//                     } else {
//                         const updateSetting = await prisma.setting.update({
//                             where: {
//                                 id: aTargetSettingId,
//                             },
//                             data: {
//                                 upgradeLevel: currentLevel + 1
//                             },
//                         });

//                         const updateInventory = await prisma.inventory.update({
//                             where: {
//                                 id: aTargetInventoryId,
//                             },
//                             data: {
//                                 soft_currency: money - softCost,
//                                 meca_kit: mecaKit - mecaCost,
//                             },
//                             select: {
//                                 meca_kit: true,
//                                 soft_currency: true
//                             }
//                         });

//                         const result = {
//                             settingType: settingType,
//                             settingBarPurcent: updateSetting.upgradeLevel,
//                             message: "Successful upgraded",
//                             success: true,
//                             carType: carType,
//                             mecaKit: updateInventory.meca_kit,
//                             softCurrency: updateInventory.soft_currency
//                         }

//                         return result;
//                     }

//                 /**
//                  * Chassis case treatment
//                  */
//                 case SettingType.Chassis:
//                     const chassis = playerSettings?.carSettings[0]?.setting[3].upgradeLevel;
//                     const cTargetSettingId = playerSettings?.carSettings[0].setting[0].id;
//                     const cTargetInventoryId = playerSettings?.inventory.id;

//                     if (chassis !== currentLevel) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. Please retry.`);
//                     } else if (currentMecaKit !== mecaKit) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. No enough mecakits.`)
//                     } else if (currentMoney !== money) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. No enough money.`)
//                     } else {

//                         const updateSetting = await prisma.setting.update({
//                             where: {
//                                 id: cTargetSettingId,
//                             },
//                             data: {
//                                 upgradeLevel: currentLevel + 1,
//                             },
//                         });

//                         const updateInventory = await prisma.inventory.update({
//                             where: {
//                                 id: cTargetInventoryId,
//                             },
//                             data: {
//                                 soft_currency: money - softCost,
//                                 meca_kit: mecaKit - mecaCost,
//                             },
//                             select: {
//                                 meca_kit: true,
//                                 soft_currency: true
//                             }
//                         });

//                         const result = {
//                             settingType: settingType,
//                             settingBarPurcent: updateSetting.upgradeLevel,
//                             message: "Successful upgraded",
//                             success: true,
//                             carType: carType,
//                             mecaKit: updateInventory.meca_kit,
//                             softCurrency: updateInventory.soft_currency
//                         }

//                         return result;
//                     }

//                 /**
//                  * Suspension case treatment
//                  */
//                 case SettingType.Suspension:
//                     const suspension = playerSettings?.carSettings[0]?.setting[3].upgradeLevel;
//                     const sTargetSettingId = playerSettings?.carSettings[0].setting[0].id;
//                     const sTargetInventoryId = playerSettings?.inventory.id;

//                     if (suspension !== currentLevel) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. Please retry.`);
//                     } else if (currentMecaKit > money) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. No enough mecakits.`)
//                     } else if (currentMoney > mecaKit) {
//                         throw new Error(`${LoggingColor.error}[❌] Update ${SettingType.Aerodynamics} failed. No enough money.`)
//                     } else {

//                         const updateSetting = await prisma.setting.update({
//                             where: {
//                                 id: sTargetSettingId,
//                             },
//                             data: {
//                                 upgradeLevel: currentLevel + 1,
//                             },
//                         });

//                         const updateInventory = await prisma.inventory.update({
//                             where: {
//                                 id: sTargetInventoryId,
//                             },
//                             data: {
//                                 soft_currency: money - softCost,
//                                 meca_kit: mecaKit - mecaCost,
//                             },
//                             select: {
//                                 meca_kit: true,
//                                 soft_currency: true
//                             }
//                         });

//                         const result = {
//                             settingType: settingType,
//                             settingBarPurcent: updateSetting.upgradeLevel,
//                             message: "Successful upgraded",
//                             success: true,
//                             carType: carType,
//                             mecaKit: updateInventory.meca_kit,
//                             softCurrency: updateInventory.soft_currency
//                         }

//                         return result;
//                     }
//             }
//         } catch (error) {
//             throw new Error(`${LoggingColor.error}[❌] Something wrong: : ${error}`)
//         }
//     }
// };
