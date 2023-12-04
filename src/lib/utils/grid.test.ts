import { describe, expect, it } from "vitest";
import Grid from "./grid";

describe('Grid', async () => {
    it ('works in a 2d structure',async () => {
        const grid = new Grid();

        grid.setPoint({x: 0, y: 0}, 'O');
        grid.setPoint({x: 1, y: 1}, 'O');

        expect(grid.toString()).toBe(
            `Layer 0:\n` +
            `O \n` +
            ` O\n` +
            `\n\n`
        )
    })

    it ('works in a 3d structure',async () => {
        const grid = new Grid(3, 3, 3);

        // Top
        grid.setPoint({x: 0, y: 0, z: 0}, 'O');
        grid.setPoint({x: 1, y: 0, z: 0}, 'O');
        grid.setPoint({x: 2, y: 0, z: 0}, 'O');
        grid.setPoint({x: 0, y: 1, z: 0}, 'O');
        grid.setPoint({x: 1, y: 1, z: 0}, 'O');
        grid.setPoint({x: 2, y: 1, z: 0}, 'O');
        grid.setPoint({x: 0, y: 2, z: 0}, 'O');
        grid.setPoint({x: 1, y: 2, z: 0}, 'O');
        grid.setPoint({x: 2, y: 2, z: 0}, 'O');

        // Center
        grid.setPoint({x: 0, y: 0, z: 1}, 'O');
        grid.setPoint({x: 1, y: 0, z: 1}, 'O');
        grid.setPoint({x: 2, y: 0, z: 1}, 'O');
        grid.setPoint({x: 0, y: 1, z: 1}, 'O');
        grid.setPoint({x: 2, y: 1, z: 1}, 'O');
        grid.setPoint({x: 0, y: 2, z: 1}, 'O');
        grid.setPoint({x: 1, y: 2, z: 1}, 'O');
        grid.setPoint({x: 2, y: 2, z: 1}, 'O');

        // Bottom
        grid.setPoint({x: 0, y: 0, z: 2}, 'O');
        grid.setPoint({x: 1, y: 0, z: 2}, 'O');
        grid.setPoint({x: 2, y: 0, z: 2}, 'O');
        grid.setPoint({x: 0, y: 1, z: 2}, 'O');
        grid.setPoint({x: 1, y: 1, z: 2}, 'O');
        grid.setPoint({x: 2, y: 1, z: 2}, 'O');
        grid.setPoint({x: 0, y: 2, z: 2}, 'O');
        grid.setPoint({x: 1, y: 2, z: 2}, 'O');
        grid.setPoint({x: 2, y: 2, z: 2}, 'O');
        grid.setPoint({x: 1, y: 1}, 'O');

        expect(grid.toString()).toBe(
            `Layer 0:\n` +
            `OOO\n` +
            `OOO\n` +
            `OOO\n` +
            `\n\n` +
            `Layer 1:\n` +
            `OOO\n` +
            `O O\n` +
            `OOO\n` +
            `\n\n` +
            `Layer 2:\n` +
            `OOO\n` +
            `OOO\n` +
            `OOO\n` +
            `\n\n`
        )
    })

    it ('gets surrounding points', async () => {
        const grid = new Grid();

        expect(grid.getSurroundingPoints({x: 1, y: 1, z: 1})).toEqual(
            [
                {z: 0, y:0, x: 0},
                {z: 0, y:0, x: 1},
                {z: 0, y:0, x: 2},
                {z: 0, y:1, x: 0},
                {z: 0, y:1, x: 1},
                {z: 0, y:1, x: 2},
                {z: 0, y:2, x: 0},
                {z: 0, y:2, x: 1},
                {z: 0, y:2, x: 2},
                {z: 1, y:0, x: 0},
                {z: 1, y:0, x: 1},
                {z: 1, y:0, x: 2},
                {z: 1, y:1, x: 0},
                {z: 1, y:1, x: 2},
                {z: 1, y:2, x: 0},
                {z: 1, y:2, x: 1},
                {z: 1, y:2, x: 2},
                {z: 2, y:0, x: 0},
                {z: 2, y:0, x: 1},
                {z: 2, y:0, x: 2},
                {z: 2, y:1, x: 0},
                {z: 2, y:1, x: 1},
                {z: 2, y:1, x: 2},
                {z: 2, y:2, x: 0},
                {z: 2, y:2, x: 1},
                {z: 2, y:2, x: 2},
            ]
        )
    })

    it ('can be initialized with a 2d array', async () => {
        const grid = Grid.fromArray([
            ['1', '2'],
            ['3', '4', '5'],
            ['6']
        ])

        expect(grid.toString()).toBe(
            `Layer 0:\n` + 
            `12 \n`+
            `345\n`+
            `6  \n`+
            `\n\n`
        )

    })
})