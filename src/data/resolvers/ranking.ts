import { MutationResolvers, Player, PlayerPositionResponse, QueryResolvers, RankingResponse, ResolverTypeWrapper } from '../../generated/graphql';
import { prisma } from "../../libs/database/PrismaClient";
import { raceToCar } from "../../libs/utils/data/raceToCar";
import PlayerUtils from "../../libs/utils/function/PlayerUtils";
import { getBestLap, getGlobalTime } from "../../libs/utils/function/Time";

const playerUtils = new PlayerUtils;

interface RaceEntry {
    track: string;
    bestTime: number;
    bestLap: number;
    raceMode: string;
    capacity: boolean;
    player: {
        country: string;
        playerName: string;
    };
}

interface TrackGroup {
    [trackName: string]: RaceEntry[];
}

export const rankingMutationResolver: MutationResolvers = {
    /**
     * Permit to save raceResult
     * @param _ 
     * @param input 
     * @returns 
     */
    addRaceResult: async (_, input): Promise<boolean> => {
        const { lapsTimeMs, playerId, raceMode, track, ranking } = input.raceResult;

        playerUtils.playerExist(playerId);
        const bestLap = getBestLap(lapsTimeMs);
        const globalTime = getGlobalTime(lapsTimeMs);
        const carType = raceToCar[track]
        let playerUsingCapacity = false;
        
        try {

            playerUtils.playerExist(playerId)

            const usingCapacity = await prisma.carCapacities.findFirst({
                where: {
                    playerUuid: playerId,
                    carType: carType,                    
                },
                select: {
                    capacity: {
                        select: {
                            upgradeLevel: true
                        }
                    }
                }
            })

            if (usingCapacity && usingCapacity.capacity.some(cap => cap.upgradeLevel > 1)) {
                playerUsingCapacity = true;
            }

            await prisma.raceHistory.create({
                data: {
                    player: {
                        connect: {
                            playerId: playerId
                        }
                    },
                    bestLap: bestLap,
                    bestTime: globalTime,
                    raceMode: raceMode,
                    track: track,
                    capacity: playerUsingCapacity,
                }
            })

            console.log(playerUsingCapacity)
            return true
        } catch(error) {
            throw new Error(`Race result register failed. ${error}`);
        }
    },
}

export const rankingQueryResolver: QueryResolvers = {
    /**
     * Permit at frontend to get mondial ranking
     * @returns 
     * 
     * 29967e12-ae8b-428e-8576-687db4351ac9
     * f4f99837-2a43-464d-a003-e9c10caf8fa5
     * 168c3368-b222-4a57-94a9-9923ecb39723
     */
    getTrackRanking: async(): Promise<ResolverTypeWrapper<RankingResponse>[]> => {
        try {
            const races = await prisma.raceHistory.findMany({
                select: {
                    track: true,
                    bestTime: true,
                    bestLap: true,
                    raceMode: true,
                    capacity: true,
                    player: {
                        select: {
                            country: true,
                            playerName: true
                        }
                    }
                },
                orderBy: [
                    { track: 'asc' },
                    { bestTime: 'asc' }
                ]
            });
        
            const tracks = races.reduce<TrackGroup>((acc, race) => {
                if (!acc[race.track]) {
                    acc[race.track] = [];
                }
    
                acc[race.track].push(race);
    
                return acc;
            }, {});
        
            const response: RankingResponse[] = Object.entries(tracks).flatMap(([trackName, entries]) => {
                return entries.map((entry, index) => ({
                    trackName: trackName,
                    name: entry.player.playerName,
                    isUserInRanking: false,
                    totalPoints: 0,
                    posUser: index + 1,
                    bestLap: entry.bestLap.toString(),
                    bestTime: entry.bestTime.toString(),
                    countryUser: entry.player.country,
                    capacity: entry.capacity,
                }));
            });
    
            return response;
        } catch (error) {
            throw new Error(`Something wrong`)
        }
    },

    getPlayerPosition: async(_, input): Promise<ResolverTypeWrapper<PlayerPositionResponse>> => {
        const playerId = input.playerId;
        const trackName = input.trackName;

        try {
            const playerTrack = await prisma.raceHistory.findFirst({
                where: {
                    playerUuid: playerId,
                    track: trackName
                },
                orderBy: {
                    created_at: "desc"
                },
                take: 1,
                select: {
                    bestTime: true,
                }
            });

            const betterTimesCount = await prisma.raceHistory.count({
                where: {
                    track: trackName,
                    bestTime: {
                        lt: playerTrack?.bestTime
                    }
                }
            });

            const response: PlayerPositionResponse = {
                position: betterTimesCount + 1,
                totalTime: playerTrack?.bestTime as number,
            }

            return response
        } catch {
            throw new Error(``);
        }
    }
}
