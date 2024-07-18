import { PrismaClient } from '@prisma/client';

/**
 * Modify this file with precaution !
 */

/**
 * Param for update capacities
 */
type UpdateParams = {
    capacityId: number;
    actualLevel: number;
    purcentValue: number;
    prisma: PrismaClient;
    targetLevel: number;
};

type UpdateResult = Promise<boolean>;

/**
 * Permit to update level one by one.
 * If you want to use <insertCapacity>All you must
 * use function updateToMaxLevelHandler()
 * @param param0 
 * @returns 
 */
async function updateLevelHandler({ capacityId, actualLevel, purcentValue, prisma, targetLevel }: UpdateParams): UpdateResult {
    if (targetLevel !== actualLevel + 1) {
        throw new Error(`You must upgrade level one by one.`);
    }

    try {
        await prisma.capacity.update({
            where: { id: capacityId },
            data: { upgradeLevel: targetLevel, value: purcentValue },
        });

        return true;
    } catch (error) {
        throw new Error(`Something wrong. Please retry.`);
    }
}

/**
 * Update capacity level at MAX
 * @param param0 
 * @returns 
 */
async function updateToMaxLevelHandler({ capacityId, purcentValue, prisma, targetLevel }: Omit<UpdateParams, 'actualLevel'>): UpdateResult {
    try {
        await prisma.capacity.update({
            where: { id: capacityId },
            data: {
                upgradeLevel: targetLevel,
                value: purcentValue
            },
        });

        return true;
    } catch (error) {
        throw new Error(`Something wrong. Please retry.`);
    }
}

/**
 * Generates a dictionary of handler functions for updating capacity levels. Each handler is tailored
 * for specific types and levels, optionally including handlers for maximum level updates.
 * 
 * @param types Array of strings representing different types of capacities (e.g., 'gt_top_speed').
 *              These are used as part of the keys in the resulting dictionary and should be unique
 *              identifiers for each capacity type.
 * @param levels Array of numbers representing the levels that each type can be updated to.
 *               These are used to generate handlers for each specified level.
 * @param isMaxLevel Boolean indicating whether to generate a special handler for updating all
 *                   levels up to the maximum level specified in the `levels` array. If true,
 *                   an additional handler for each type is added to handle maximum level updates.
 * @returns A dictionary where each key is a string combining the type and level (and potentially
 *          'to max level'), and each value is a function configured to update the capacity to that
 *          level. This structure allows for flexible and dynamic updates based on the provided
 *          types and levels.
 */

function generateUpdateHandlers(types: string[], levels: number[], isMaxLevel: boolean = false) {
    const handlers: Record<string, (params: UpdateParams) => UpdateResult> = {};

    types.forEach(type => {
        levels.forEach(level => {
            const key = `${type}_level_${level}`;
            handlers[key] = (params) => updateLevelHandler({ ...params, targetLevel: level });
        });
        
        if (isMaxLevel) {
            const maxKey = `${type}_level_1_to_${levels[levels.length - 1]}`;
            handlers[maxKey] = (params) => updateToMaxLevelHandler({ ...params, targetLevel: levels[levels.length - 1] });
        }
    });

    return handlers;
}

// Usage
export const updateCapacityValue = generateUpdateHandlers(
    [
        'gt_top_speed', 
        'gt_acceleration', 
        'gt_shielding', 
        'gt_nitro',
        'truckster_top_speed', 
        'truckster_acceleration', 
        'truckster_shielding', 
        'speeder_top_speed', 
        'speeder_acceleration', 
        'speeder_shielding', 
        'speeder_nitro',
        'formula_v_top_speed', 
        'formula_v_acceleration', 
        'formula_v_shielding', 
        'formula_v_nitro'
    ],
    [1, 2, 3, 4, 5, 6],
    true
);
