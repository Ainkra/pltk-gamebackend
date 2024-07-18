/**
 * If we have an itemId who's permit to jump X level directly at 6,
 * we return true of all 
 * @param itemId (string)
 * @param ownerItems (Set<string>)
 * @returns 
 */
export const parseAndExpandOwnedItems = (itemId: string, ownedItems: Set<string>) => {
    const segments = itemId.split('_');
    let carType = segments[0];
    let capacity = segments[1];

    if (carType === "formula" && segments[1] === "v") {
        carType = "formula_v";
        capacity = segments[2];

        if (segments[2] === "top" && segments[3] === "speed") {
            capacity = "top_speed";
        }
    } else if (capacity === "top" && segments[2] === "speed") {
        capacity = "top_speed";
    }

    let baseIndex;
    
    if (carType === "formula_v" && capacity === "top_speed") {
        baseIndex = 5;
    } else if (carType === "formula_v" || capacity === "top_speed") {
        baseIndex = 3;
    } else {
        baseIndex = 2;
    }

    const levelPart = segments.slice(baseIndex).join('_');

    if (levelPart.includes('to')) {
        const levels = levelPart.match(/\d+/g);
        if (levels && levels.length === 2) {
            const startLevel = parseInt(levels[0], 10);
            const endLevel = parseInt(levels[1], 10);

            for (let level = startLevel; level <= endLevel; level++) {
                ownedItems.add(`${carType}_${capacity}_level_${level}`);
            }

            for (let level = startLevel; level < endLevel; level++) {
                for (let subEndLevel = level + 1; subEndLevel <= endLevel; subEndLevel++) {
                    ownedItems.add(`${carType}_${capacity}_level_${level}_to_${subEndLevel}`);
                }
            }
        }
    } else {
        ownedItems.add(`${carType}_${capacity}_${levelPart}`);
    }
}

