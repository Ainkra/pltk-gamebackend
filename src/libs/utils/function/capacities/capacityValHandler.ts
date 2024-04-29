import { CapacityType } from "../../../../generated/graphql";
import { itemLevelValues } from "../../data/ItemValuesUtils";
import { capacityLevelMap, capacityNameMap } from "../../data/productLevelsType";
require('dotenv').config();

/**
 * Permit to get product capacity type
 * @param productId 
 * @returns CapacityType
 */
export const getCapacityType = (productId: string): CapacityType => {
    if (!productId) {
        throw new Error("Invalid product ID.");
    }

    for (const key in capacityNameMap) {
        if (productId.includes(key)) {
            return capacityNameMap[key];
        }
    }

    throw new Error("No capacity type found for this product ID.");
};

/**
 * Permit to get product capacity level
 * @param productId 
 * @returns CapacityType
 */
export const getProductCapacityLevel = (productId: string): number => {
    if (!productId) {
        throw new Error("Invalid product ID.");
    }

    for (const key in capacityLevelMap) {
        if (productId.includes(key)) {
            return capacityLevelMap[key];
        }
    }
    
    throw new Error("No capacity type found for this product ID.");
};

/**
 * Get item value 
 * @param itemId 
 * @returns 
 */
export const getCapacityLevelNumber = (itemId: string): number => {
    const capacityValue = itemLevelValues[itemId];

    if (capacityValue === undefined) {
        throw new Error(`Item non-recognized please retry.`);
    }

    return capacityValue;
};

/**
 * Permit to get only product name inside the string
 * @param productId 
 * @returns 
 */
export const getProductName = (productId: string): string => {
    const prefix = process.env.GLOBAL_PACKAGE_NAME;
    const parts = productId.split(prefix as string);
    
    if (parts.length > 1) {
        return parts[1];
    } else {
        throw new Error("Invalid product ID format");
    }
} 