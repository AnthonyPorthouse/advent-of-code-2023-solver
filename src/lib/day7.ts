type Card = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A"

type Hand = [Card, Card, Card, Card, Card]

type HandType = "FiveOfAKind" | "FourOfAKind" | "FullHouse" | "ThreeOfAKind" | "TwoPair" | "OnePair" | "HighCard"

type ParsedHand = {
    hand: Hand
    type: HandType
    firstCard: Card
    bet: number
}

function getHandValue(type: HandType) {
    switch(type) {
        case "FiveOfAKind":
            return 7
        case "FourOfAKind":
            return 6
        case "FullHouse":
            return 5
        case "ThreeOfAKind":
            return 4
        case "TwoPair":
            return 3
        case "OnePair":
            return 2
        default:
            return 1
    }
}

function getBestCard(a: ParsedHand, b: ParsedHand) {
    for (const i in a.hand) {
        if (a.hand[i] !== b.hand[i]) {
            return getCardValue(a.hand[i]) - getCardValue(b.hand[i])
        }
    }

    return 0
}

function getCardValue(card: Card) {
    switch(card) {
        case "2":
            return 2
        case "3":
            return 3
        case "4":
            return 4
        case "5":
            return 5
        case "6":
            return 6
        case "7":
            return 7
        case "8":
            return 8
        case "9":
            return 9
        case "T":
            return 10
        case "J":
            return 11
        case "Q":
            return 12
        case "K":
            return 13
        case "A":
            return 14
    }
}

function getHandType(hand: Hand, bet: number): ParsedHand {
    const firstCard = hand.at(0)!;

    const types: Partial<Record<Card, number>> = {}

    for (const card of hand) {
        types[card] = types[card] ? types[card]! + 1 : 1
    }

    const counts = Object.values(types).toSorted((a, b) => b - a).filter(n => n > 1);

    let type: HandType
    
    switch(JSON.stringify(counts)) {
        case(JSON.stringify([5])):
            type = "FiveOfAKind"
            break
        case(JSON.stringify([4])):
            type = "FourOfAKind"
            break
        case(JSON.stringify([3, 2])):
            type = "FullHouse"
            break
        case(JSON.stringify([3])):
            type = "ThreeOfAKind"
            break
        case(JSON.stringify([2, 2])):
            type = "TwoPair"
            break
        case(JSON.stringify([2])):
            type = "OnePair"
            break
        default:
            type = "HighCard"
            break
    }

    return {
        hand,
        type,
        firstCard,
        bet
    }

}

export function solvePart1(input: string) {

    let hands: ParsedHand[] = []

    for (const row of input.trim().split('\n')) {
        const [cards, bet] = row.split(' ');
        
        const hand = cards.split('', 5) as Hand

        const type = getHandType(hand, Number(bet));
        hands = [...hands, type]
    }

    const sortedHands = hands
        .toSorted(getBestCard)
        .toSorted((a, b) => getHandValue(a.type) - getHandValue(b.type))

    console.log(sortedHands)

    const total = sortedHands.reduce((total, hand, index) => total + hand.bet * (index + 1), 0)

    return total
}

export function solvePart2(input: string) {
    return 0
}