import { CarType, Track } from "../../../generated/graphql";

export const raceToCar: Record<Track, CarType> = {
    [Track.Speedway]: CarType.Speeder,
    [Track.Truckster]: CarType.Truckster,
    [Track.Urban]: CarType.Gt,
    [Track.Vortex]: CarType.Formulav
}