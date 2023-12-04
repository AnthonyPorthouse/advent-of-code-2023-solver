import { describe, expect, it } from "vitest";
import { solvePart1, solvePart2 } from "./day3";

const exampleInput =
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;


describe(solvePart1, async () => {
    it('should return 4361', async () => {
        expect(solvePart1(exampleInput)).toBe(4361)
    })
})

describe(solvePart2,async () => {
    it('should return 4361', async () => {
        expect(solvePart2(exampleInput)).toBe(467835)
    })
})