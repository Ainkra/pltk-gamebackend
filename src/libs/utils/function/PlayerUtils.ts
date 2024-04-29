import { validate } from "uuid";
import { prisma } from "../../database/PrismaClient";

export default class PlayerUtils {
    /**
     * Verify if player exist
     * @param playerId 
     * @returns 
     */
    async validateUuid(playerId: string): Promise<string> {
        if (!validate(playerId)) {
            throw new Error('${LoggingColor.error}[❌] playerId Invalid Input ');
        }   

        return `[☑️] Valid uuid, continue...`
    }

    /**
     * Function for verify if player doesn't exist. Please use this function only
     * in this case. if player doesnt exist => return true, else throw an error.
     * @param playerId 
     * @returns 
     */
    async playerDontExist(userId: string): Promise<boolean> {
        const player = await prisma.player.findFirst(
            {
                where: {
                    userId: userId
                }
            }
        )

        if(!player) {
            return true;
        } else {
            throw new Error(`PlayerAlreadyExistError`);
        }
    }

    /**
     * Function for verify if player exist. Please use this function only
     * in this case. if player exist => return true, else throw an error.
     * @param playerId or user
     * @returns 
     */
    async playerExist(playerId: string): Promise<boolean> {
        const player = await prisma.player.findFirst(
            {
                where: {
                    playerId: playerId
                }
            }
        )

        if(player) {
            return true;
        } else {
            throw new Error(`PlayerAlreadyExistError`);
        }
    }

    /**
     * Permit to obtain the playerName
     * @param playerId 
     * @returns 
     */
    async getUserNameById(playerId: string) {
        const player = await prisma.player.findFirst({ 
            where: {
                playerId: playerId
            },
            select: {
                playerName: true,
            }
        })

        return player?.playerName as string;
    }

    /**
     * Verify if input is really a string
     * @param input 
     * @returns 
     */
    isString(input: any): string {
        if (typeof input === 'string') {
            return input;
        } else {
            throw new Error();
        }
    }
}