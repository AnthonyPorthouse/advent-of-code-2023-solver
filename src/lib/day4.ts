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
    id: number
    winningNumbers: Set<number>
    ourNumbers: Set<number>
    wins: number
}

function parseCard(card: string): Card {
    // Parse our card id, winning number group and our number group
    const numbers = card.match(/(?<id>\d+):(?<winning>(?: +\d{1,2})+) \|(?<ours>(?: +\d{1,2})+)/)

    if (!numbers) {
        throw `Invalid card: ${card}`
    }

    const winningNumbers = new Set(numbers.groups!.winning.trim().split(/ +/).map(Number))
    const ourNumbers = new Set(numbers.groups!.ours.trim().split(/ +/).map(Number))

    // Precalculate the number of wins on a card
    let wins = 0;
    for (const value of winningNumbers) {
        if (ourNumbers.has(value)) {
            wins += 1
        }
    }


    return {
        id: Number(numbers.groups!.id),
        winningNumbers,
        ourNumbers,
        wins
    }
}

export function solvePart2(input: string) {

    const cards: Record<number, Card> = {}

    for (const [id, row] of input.split('\n').entries()) {
        if (row === '') {
            continue
        }

        const card = parseCard(row)

        cards[card.id] = card
    }

    let total = 0

    console.log(cards)

    for (const card of Object.values(cards)) {
        total += keepGoing(cards, card.id) + 1
    }

    return total
}

function keepGoing(cards: Record<number, Card>, from: number, count: number | undefined = 1) {
    let total = 0;
    
    // Starting at our first card, check each card upto the total for wins
    for (let i = from; i < from + count; i++) {

        if (!cards[i]) {
            throw `cannot find card ${i}`
        }

        const wins = cards[i].wins
        if (wins) {
            // Increase total by the number of wins this card has
            total += wins
            
            // Check the copied cards for wins
            total += keepGoing(cards, i + 1, wins)
        }
    }

    return total
}