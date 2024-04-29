import { Resolvers } from "../generated/graphql";
import { trackQueryResolver } from './resolvers/track';
import { playerMutationResolver, playerQueryResolver } from "./resolvers/player";
import { garageDataResolver } from "./resolvers/garage";
import { playerCarDataResolver } from "./resolvers/playerCarData";
import { upgradePreviewResolver } from "./resolvers/upgradePreview";
import { googleUpgradeCapacityResolver } from "./resolvers/payment/Google/googleUpgradeCap";
import { appleUpgradeCapacityResolver } from "./resolvers/payment/Apple/appleUpgradeCap";
import { stripeMutationResolvers } from "./resolvers/payment/Stripe/stripeUpgradeCap";
import { rankingMutationResolver, rankingQueryResolver } from "./resolvers/ranking";
import { testUpgradeCapacityResolver } from "../test/testUpgradeCapacity";

/**
 * This file allows you to link the resolvers together. 
 * Useful if a resolver is for example in another file.
 */
export const resolverLinker: Resolvers  = {
    Mutation: {
        createPlayer: playerMutationResolver.createPlayer,
        googleUpgradeCapacity: googleUpgradeCapacityResolver.googleUpgradeCapacity,
        appleUpgradeCapacity: appleUpgradeCapacityResolver.appleUpgradeCapacity,
        stripeUpgradeCapacity: stripeMutationResolvers.stripeUpgradeCapacity,
        addRaceResult: rankingMutationResolver.addRaceResult,
        // testUpgradeCapacity: testUpgradeCapacityResolver.testUpgradeCapacity,
    },

    Query: {
        getPlayer: playerQueryResolver.getPlayer,
        getPlayerInventory: playerQueryResolver.getPlayerInventory,
        playerTrack: trackQueryResolver.playerTrack,
        getGarageData: garageDataResolver.getGarageData,
        getPlayerAssociatedCarData: playerCarDataResolver.getPlayerAssociatedCarData,
        getUpgradePreview: upgradePreviewResolver.getUpgradePreview,
        getGaragePrices: garageDataResolver.getGaragePrices,
        getTrackRanking: rankingQueryResolver.getTrackRanking
    }
}