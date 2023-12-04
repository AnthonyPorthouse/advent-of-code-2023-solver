export function solvePart1(input: string) {

    let total = 0;
    for (const row of input.split('\n')) {
        if (row === '') {
            continue
        }

        const card = parseCard(row)

        let cardScore = 0
        for (const value of card.winningNumbers) {
            if (card.ourNumbers.has(value)) {
                cardScore = cardScore === 0 ? 1 : cardScore * 2
            }
        }

        total += cardScore

    }

    return total
}

type Card = {
    winningNumbers: Set<number>
    ourNumbers: Set<number>
}

function parseCard(card: string): Card {
    const numbers = card.match(/:(?<winning>(?: +\d{1,2})+) \|(?<ours>(?: +\d{1,2})+)/)

    if (!numbers) {
        throw `Invalid card: ${card}`
    }

    const winningNumbers = new Set(numbers.groups!.winning.trim().split(/ +/).map(Number))
    const ourNumbers = new Set(numbers.groups!.ours.trim().split(/ +/).map(Number))


    return {
        winningNumbers,
        ourNumbers
    }
}

export function solvePart2(input: string) {
    return 0
}