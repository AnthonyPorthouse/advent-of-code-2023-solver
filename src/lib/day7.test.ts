import { describe, expect, it } from "vitest";
import { solvePart1, solvePart2 } from "./day7";

const exampleInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`.trim();

describe(solvePart1, async () => {
    it('should return 6440', async () => {
        expect(solvePart1(exampleInput)).toBe(6440)
    })
})

describe(solvePart2, async () => {
    it('should return 5905', async () => {
        expect(solvePart2(exampleInput)).toBe(5905)
    })
})