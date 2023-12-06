type Score = {
    time: number,
    distance: number,
    validHoldTimesTotal: number
} 

function parseInput(input: string) {
    const data: [number[], number[]] = input.trim().split('\n').map(line => line.split(':')[1].split(' ').filter(val => val).map(Number)) as [number[], number[]]

    const scores: Score[] = []

    for (let i = 0; i < (data.at(0)?.length || 0); i++) {
        scores[i] = {time: data[0][i], distance: data[1][i], validHoldTimesTotal: 0}
    }

    return scores
}

function parseInputPart2(input: string) {
    const data: [number[], number[]] = input.trim().split('\n').map(line => [Number(line.split(':')[1].replaceAll(' ', ''))]) as [number[], number[]]

    const scores: Score[] = []

    for (let i = 0; i < (data.at(0)?.length || 0); i++) {
        scores[i] = {time: data[0][i], distance: data[1][i], validHoldTimesTotal: 0}
    }

    return scores
}

function calculateValidHoldTimes(score: Score) {
    let min: number = 0

    let max: number = score.time

    for (let i = 1; i < max; i++) {
        if (i * (score.time - i) > score.distance) {
            min = i
            break
        }
    }

    for (let i = score.time; i > min; i--) {
        if (i * (score.time - i) > score.distance) {
            max = i
            break
        }
    }

    score.validHoldTimesTotal = max - min + 1;

    return score
}

export function solvePart1 (input: string) {

    const scores = parseInput(input).map(calculateValidHoldTimes)

    const total = scores.reduce((total, score) => {
        if (total === 0) {
            return score.validHoldTimesTotal
        }

        return total * score.validHoldTimesTotal
    }, 0)

    return total
}

export function solvePart2(input: string) {

    const scores = parseInputPart2(input).map(calculateValidHoldTimes)

    const total = scores.reduce((total, score) => {
        if (total === 0) {
            return score.validHoldTimesTotal
        }

        return total * score.validHoldTimesTotal
    }, 0)

    return total
}