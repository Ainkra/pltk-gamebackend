export const getBestLap = (laps: any) => {
    let bestLap = laps[0]
    for (let i = 0; i < laps.length; i++) {
        let lap = laps[i]
        if (lap < bestLap) {
            bestLap = lap
        }
    }

    return bestLap
}

export const getGlobalTime = (laps: any) => {
    let globalTime = 0
    for (let i = 0; i < laps.length; i++) {
        globalTime = globalTime + laps[i]
    }
    
    return globalTime
}