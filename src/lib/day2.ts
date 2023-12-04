type Stats = { id: number, maxRed: number, maxGreen: number, maxBlue: number, isImpossible: boolean }
type Stats2 = { id: number, maxRed: number, maxGreen: number, maxBlue: number, power: number }
type Colors = "red" | "green" | "blue"

export function solvePart1(input: string) {
    const counts = {
        red: 12,
        green: 13,
        blue: 14
    }


    const games: Stats[] = []


    for (const row of input.split('\n')) {

        if (row === '') {
            continue;
        }

        const [gameId, rounds] = row.split(': ')

        const [_, id] = gameId.split(' ');

        const stats: Stats = {
            id: Number(id),
            maxRed: 0,
            maxGreen: 0,
            maxBlue: 0,
            isImpossible: false
        }

        rounds.split('; ').map((round) => {
            round.split(', ').map((value) => {
                const [count, color] = value.split(' ');

                switch (color as Colors) {
                    case "red":
                        stats.maxRed = Math.max(stats.maxRed, Number(count))
                        return
                    case "green":
                        stats.maxGreen = Math.max(stats.maxGreen, Number(count))
                        return
                    case "blue":
                        stats.maxBlue = Math.max(stats.maxBlue, Number(count))
                        return
                }
            })
        })

        stats.isImpossible = stats.maxRed > counts.red || stats.maxGreen > counts.green || stats.maxBlue > counts.blue

        games.push(stats)
    }

    const total = games.reduce((prev, stats) => {
        if (stats.isImpossible) {
            return prev
        }

        return prev + stats.id
    }, 0)

    return total
}

export function solvePart2(input: string) {
    const games: Stats2[] = []

    for (const row of input.split('\n')) {
        if (row === '') {
            continue;
        }

        const [gameId, rounds] = row.split(': ')

        const [_, id] = gameId.split(' ');

        const stats: Stats2 = {
            id: Number(id),
            maxRed: 0,
            maxGreen: 0,
            maxBlue: 0,
            power: 0
        }

        rounds.split('; ').map((round) => {
            round.split(', ').map((value) => {
                const [count, color] = value.split(' ');

                switch (color as Colors) {
                    case "red":
                        stats.maxRed = Math.max(stats.maxRed, Number(count))
                        return
                    case "green":
                        stats.maxGreen = Math.max(stats.maxGreen, Number(count))
                        return
                    case "blue":
                        stats.maxBlue = Math.max(stats.maxBlue, Number(count))
                        return
                }
            })
        })

        stats.power = stats.maxRed * stats.maxGreen * stats.maxBlue

        games.push(stats)
    }

    const total = games.reduce((prev, stats) => {
        return prev + stats.power
    }, 0)

    return total
}