import Grid from "./utils/grid";

function populateGridFromInput(input: string) {
    const grid = new Grid();

    for (const [y, row] of input.split('\n').entries()) {
        for (const [x, char] of row.split('').entries()) {

            if (char != '.') {
                grid.setPoint({x, y}, char)
            }
        }
    }

    return grid;
}

function findNumber(grid: Grid, position: {x: number, y: number}) {
    let value = ''

    let startPos = {...position}

    const alphaRegex = /[a-z]/

    // go left to find start
    let curValue: string | undefined
    do {
        curValue = grid.getPoint(startPos)
        
        if (curValue && curValue.match(alphaRegex)) {
            startPos.x -= 1
        }

    } while (curValue && curValue.match(alphaRegex))
    // read number in
}

export function solvePart1(input: string) {


    let total = 0;

    // Populate grid
    const grid = populateGridFromInput(input);

    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {

            // Get our value
            let value = grid.getPoint({x, y});

            // If no value, then lets just not process anything
            if (!value) {
                continue;
            }

            // We're looking specifically for digits
            if (!value?.match(/\d/)) {
                continue;
            }

            let spans = [{x, y}];

            // We've found a digit, lets look for further sequential numbers
            let offset = 0;
            const digitRegex = /\d/;
            let nextValue: string|undefined
            do {
                offset += 1
                const nextPoint = {x: x + offset, y}
                nextValue = grid.getPoint(nextPoint);

                if (!nextValue) {
                    break;
                }

                if (nextValue.match(digitRegex)) {
                    value += nextValue

                    spans = [...spans, nextPoint]
                }
            } while (nextValue.match(digitRegex))
            
            let match = false;
            
            // Check if we're a match
            for (const point of spans) {
                const points = grid.getSurroundingPoints(point);
                points.map((point) => {
                    const val = grid.getPoint(point)
                    
                    if (val && !val.match(digitRegex)) {
                        match = true;
                    }
                })
            }

            if (match) {
                total += Number(value)
            }

            x += offset - 1
        }
    }

    return total;
}

/**
 * @param input [string] 
 * @returns [number]
 * @todo
 */
export function solvePart2(input: string) {
    const grid = populateGridFromInput(input);

    let total = 0

    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {

            // Get our value
            let value = grid.getPoint({x, y});

            // If no value, then lets just not process anything
            if (!value) {
                continue;
            }

            // We're looking specifically for *
            if (value !== '*') {
                continue;
            }

            let spans = [{x, y}];

            // We've found a digit, lets look for further sequential numbers
            let offset = 0;
            const digitRegex = /\d/;
            let nextValue: string|undefined
            do {
                offset += 1
                const nextPoint = {x: x + offset, y}
                nextValue = grid.getPoint(nextPoint);

                if (!nextValue) {
                    break;
                }

                if (nextValue.match(digitRegex)) {
                    value += nextValue

                    spans = [...spans, nextPoint]
                }
            } while (nextValue.match(digitRegex))
            
            let match = false;
            
            // Check if we're a match
            for (const point of spans) {
                const points = grid.getSurroundingPoints(point);
                points.map((point) => {
                    const val = grid.getPoint(point)
                    
                    if (val && !val.match(digitRegex)) {
                        match = true;
                    }
                })
            }

            if (match) {
                total += Number(value)
            }

            x += offset - 1
        }
    }

    return total
}