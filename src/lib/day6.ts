type Score = {
    time: number,
    distance: number,
    validHoldTimes: number[]
} 

function parseInput(input: string) {
    const data: [number[], number[]] = input.trim().split('\n').map(line => line.split(':')[1].split(' ').filter(val => val).map(Number)) as [number[], number[]]

    const scores: Score[] = []

    for (let i = 0; i < (data.at(0)?.length || 0); i++) {
        scores[i] = {time: data[0][i], distance: data[1][i], validHoldTimes: []}
    }

    return scores
}

function calculateValidHoldTimes(score: Score) {

    let firstFound = false

    for (let i = 1; i < score.time; i++) {
        if (i * (score.time - i) > score.distance) {
            firstFound = true
            score.validHoldTimes = [...score.validHoldTimes, i]
            continue
        }

        if (firstFound) {
            break
        }
    }

    return score
}

export function solvePart1 (input: string) {

    const scores = parseInput(input).map(calculateValidHoldTimes)

    const total = scores.reduce((total, score) => {
        if (total === 0) {
            return score.validHoldTimes.length
        }

        return total * score.validHoldTimes.length
    }, 0)

    return total
}