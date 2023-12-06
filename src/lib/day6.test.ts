import { describe, expect, it } from "vitest";
import { solvePart1, solvePart2 } from "./day6";

const exampleInput = `
Time:      7  15   30
Distance:  9  40  200
`.trim();

describe(solvePart1, async () => {
    it('should return 288', async () => {
        expect(solvePart1(exampleInput)).toBe(288)
    })

    it('should return 71503', async () => {
        expect(solvePart2(exampleInput)).toBe(71503)
    })
})