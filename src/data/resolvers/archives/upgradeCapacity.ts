// import {
//     MutationResolvers,
//     CapacityResponse,
// } from '../../../generated/graphql';
// import { LoggingColor } from '../../../libs/misc/LoggingColor';
// import { prisma } from '../../../libs/database/PrismaClient';
// import PlayerUtils from '../../../libs/utils/function/PlayerUtils';
// import { getCapacityLevelNumber, getCapacityType } from '../../../libs/utils/function/capacities/capacityValHandler';
// import { giveCapacityPurcent } from '../../../libs/utils/function/PurcentUtils';
// require('dotenv').config();

// const verifyUuid = new PlayerUtils;

// export const upgradeCarCapacitiesResolver: MutationResolvers = {
//     upgradeCapacities: async (_, input): Promise<CapacityResponse> => {
//         try {
//             const playerId = input.playerId;
//             verifyUuid.validateUuid(playerId);

//             const existingPlayer = await prisma.player.findFirst({
//                 where: {
//                     playerId: playerId,
//                 }
//             })

//             if (!existingPlayer) {
//                 throw new Error(`${LoggingColor.error}[❌] player don't exist ! Actual level`);
//             }

//             const carType = input.carType;
//             const currentLevel = input.currentLevel;
//             const itemId = input.itemId;
//             const capacityType = getCapacityType(input.itemId);
//             const targetLevel = getCapacityLevelNumber(input.itemId);

//             const getRealLevel = await prisma.player.findFirst({
//                 where: {
//                     playerId: playerId,
//                     carCapacities: {
//                         some: {
//                             carType: carType,
//                             capacity: {
//                                 some: {
//                                     capacityName: capacityType,
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 select: {
//                     carCapacities: {
//                         where: { carType: carType },
//                         select: {
//                             capacity: {
//                                 where: { capacityName: capacityType },
//                                 select: {
//                                     id: true,
//                                     upgradeLevel: true,
//                                     value: true,
//                                     capacityName: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             })

//             const actualLevel = getRealLevel?.carCapacities[0].capacity[0].upgradeLevel;
//             const capacityId = getRealLevel?.carCapacities[0].capacity[0].id;
//             const purcentValue = giveCapacityPurcent(carType, capacityType, targetLevel);

//             const levelJumpHandler = () => {
//                 if (targetLevel !== currentLevel + 1) {
//                     throw new Error(`You can only upgrade to a higher level one by one. Actual level: ${actualLevel}`);
//                 } else if (currentLevel !== getRealLevel?.carCapacities[0].capacity[0].upgradeLevel) {
//                     throw new Error(`You don't have the same level we have registered for your data. Actual level: ${actualLevel}`);
//                 } else if (targetLevel <= currentLevel) {
//                     throw new Error(`You can only upgrade to a higher level one by one. Actual level: ${actualLevel}`);
//                 }
//             }

//             const updateLevel = async (levelTargeted: number) => {

//                 if (levelTargeted === actualLevel) {
//                     console.log(`You have the same level you give in input`);
//                 }

//                 const updateValue = await prisma.capacity.update({
//                     where: {
//                         id: capacityId
//                     },
//                     data: {
//                         upgradeLevel: levelTargeted,
//                         value: purcentValue as number,
//                     }
//                 })

//                 return updateValue
//             }

//             /**
//              * TODO: 
//              */

//             let result;

//             switch (itemId) {
//                 case 'Acceleration_2':
//                     levelJumpHandler();
//                     updateLevel(2);

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 2 !`,
//                     };

//                     break;

//                 case 'Acceleration_3':
//                     levelJumpHandler();
//                     updateLevel(3)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 3 !`,
//                     };

//                     break;

//                 case 'Acceleration_4':
//                     levelJumpHandler();
//                     updateLevel(4)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 4 !`,
//                     };

//                     break;

//                 case 'Acceleration_5':
//                     levelJumpHandler();
//                     updateLevel(5)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 5 !`,
//                     };

//                     break;

//                 case 'Acceleration_6':
//                     levelJumpHandler();
//                     updateLevel(6)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 6 !`,
//                     };

//                     break;

//                 case 'AccelerationAll':
//                     updateLevel(6)

//                     result = {
//                         success: true,
//                         message: `You get all levels !`,
//                     };

//                     break;

//                 case 'Topspeed_2':
//                     levelJumpHandler();
//                     updateLevel(2)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 2 !`,
//                     };

//                     break;

//                 case 'Topspeed_3':
//                     levelJumpHandler();
//                     updateLevel(3)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 3 !`,
//                     };

//                     break;

//                 case 'Topspeed_4':
//                     levelJumpHandler();
//                     updateLevel(4)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 4 !`,
//                     };

//                     break;

//                 case 'Topspeed_5':
//                     levelJumpHandler();
//                     updateLevel(5)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 5 !`,
//                     };

//                     break;

//                 case 'Topspeed_6':
//                     levelJumpHandler();
//                     updateLevel(6)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 6 !`,
//                     };

//                     break;
//                 case 'TopspeedAll':
//                     updateLevel(6)

//                     result = {
//                         success: true,
//                         message: `You get all levels !`,
//                     };

//                     break;

//                 case 'Shielding_2':
//                     levelJumpHandler();
//                     updateLevel(2)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 2 !`,
//                     };

//                     break;

//                 case 'Shielding_3':
//                     levelJumpHandler();
//                     updateLevel(3)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 3 !`,
//                     };

//                     break;

//                 case 'Shielding_4':
//                     levelJumpHandler();
//                     updateLevel(4)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 4 !`,
//                     };

//                     break;

//                 case 'Shielding_5':
//                     levelJumpHandler();
//                     updateLevel(5)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 5 !`,
//                     };

//                     break;

//                 case 'Shielding_6':
//                     levelJumpHandler();
//                     updateLevel(6)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 6 !`,
//                     };

//                     break;

//                 case 'ShieldingAll':
//                     updateLevel(6)

//                     result = {
//                         success: true,
//                         message: `You get all levels !`,
//                     };

//                     break;

//                 case 'Nitro_2':
//                     levelJumpHandler();
//                     updateLevel(2)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 2 !`,
//                     };

//                     break;
//                 case 'Nitro_3':
//                     levelJumpHandler();
//                     updateLevel(3)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 3 !`,
//                     };

//                     break;
//                 case 'Nitro_4':
//                     levelJumpHandler();
//                     updateLevel(4)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 4 !`,
//                     };

//                     break;

//                 case 'Nitro_5':
//                     levelJumpHandler();
//                     updateLevel(5)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 5 !`,
//                     };

//                     break;

//                 case 'Nitro_6':
//                     levelJumpHandler();
//                     updateLevel(6)

//                     result = {
//                         success: true,
//                         message: `Successfuly update acceleration at level 6 !`,
//                     };

//                     break;

//                 case 'NitroAll':
//                     updateLevel(6)

//                     result = {
//                         success: true,
//                         message: `You get all levels !`,
//                     };

//                     break;
//                 default:
//                     result = {
//                         success: false,
//                         message: "Unknown error occurred. Please contact an administrator"
//                     }
//             }
//             return result;

//         } catch (error) {
//             throw new Error(`${error}`)
//         }
//     }
// }