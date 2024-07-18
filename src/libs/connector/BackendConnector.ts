import { ApolloClient, ApolloQueryResult, gql, InMemoryCache } from "@apollo/client";

// EXAMPLE OF QUERY
//
// const gqlClient = this.usersManagerConnector.getGqlClient();
// const response = await gqlClient.mutate({
//   mutation: gql`
//     mutation AddRaceResult($raceResult: RaceResult) {
//       addRaceResult(raceResult: $raceResult)
//     }
//   `,
//   variables: {
//     raceResult: {
//       playerId: car.playerId,
//       carId: car.carId,
//       lapsTimeMs: car.lapsDurationMs,
//       ranking: car.ranking,
//       numberPlayers: this.arrivedCars.length,
//       raceMode: this.raceMode,
//       track: trackName
//     },
//   },
// });


export class BackendConnector {
    private client: ApolloClient<any>;
    constructor(uri: string) {
        this.client = new ApolloClient({
            uri,
            cache: new InMemoryCache(),
        })
    }

    public async query<T>(query: string): Promise<T> {
        try {
            const result: ApolloQueryResult<T> = await this.client.query({
                query: gql(query),
            });
            return result.data as T;
        } catch (error) {
            throw new Error(`Request error : ${error}`);
        }
    }

    public async mutate<T>(mutation: string): Promise<T> {
        try {
            const result = await this.client.mutate({
                mutation: gql(mutation),
            });
            
            return result.data as T;
        } catch (error) {
            throw new Error(`Erreur lors de la mutation : ${error}`);
        }
    }
}