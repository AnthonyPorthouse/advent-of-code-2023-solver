// export type Point = {
//     x: number,
//     y: number,
//     z?: number
// }

export class Point {
    x: number
    y: number
    z: number

    private constructor(x: number, y: number, z?: number) {
        this.x = x
        this.y = y
        this.z = z || 0
    }

    static fromObject({ x, y, z }: { x: number, y: number, z?: number }) {
        return new this(x, y, z)
    }

    static fromSymbol(point: symbol) {
        const key = Symbol.keyFor(point)

        if (!key) {
            throw `invalid symbol ${point.toString()}`
        }

        const [x, y, z] = key.split(', ').map(Number);

        return new this(x, y, z)
    }

    add(point: Point) {
        return Point.fromObject({ x: this.x + point.x, y: this.y + point.y, z: this.z + point.z })
    }

    toString() {
        return `${this.x}, ${this.y}, ${this.z || 0}`
    }

    toSymbol() {
        return Symbol.for(this.toString())
    }
}

export default class Grid {
    width: number
    height: number
    depth: number

    data: Record<symbol, string>

    constructor() {
        this.width = 0
        this.height = 0
        this.depth = 0

        this.data = {}
    }

    static fromArray(input: string[][] | string[][][]) {

        const is2dInput = function (input: string[][] | string[][][]): input is string[][] {
            return !Array.isArray(input[0][0])
        }

        let input3d: string[][][]

        // If 2d Grid
        if (is2dInput(input)) {
            input3d = [input as string[][]];
        } else {
            input3d = input
        }

        const grid = new Grid();

        for (const [z, layer] of input3d.entries()) {
            for (const [y, row] of layer.entries()) {
                for (const [x, value] of row.entries()) {
                    grid.setPoint(Point.fromObject({ x, y, z }), value)
                }
            }
        }

        return grid
    }


    getPoint(point: Point): string | undefined;

    getPoint(point: { x: number, y: number, z?: number }): string | undefined;

    getPoint(point: Point | { x: number, y: number, z?: number }): string | undefined {

        let newPoint: Point

        if (point instanceof Point) {
            newPoint = point
        } else {
            newPoint = Point.fromObject(point as { x: number, y: number, z?: number })
        }

        return this.data[newPoint.toSymbol()]
    }

    setPoint(point: Point, data: string): void;

    setPoint(point: { x: number, y: number, z?: number }, data: string): void;

    setPoint(point: Point | { x: number, y: number, z?: number }, data: string) {

        let newPoint: Point

        if (point instanceof Point) {
            newPoint = point
        } else {
            newPoint = Point.fromObject(point as { x: number, y: number, z?: number })
        }

        this.width = Math.max(this.width, newPoint.x + 1);
        this.height = Math.max(this.height, newPoint.y + 1);
        this.depth = Math.max(this.depth, newPoint.z + 1);

        this.data[newPoint.toSymbol()] = data
    }

    getSurroundingPoints(point: Point) {
        let points: Point[] = [];

        for (let z = (point.z || 0) - 1; z <= (point.z || 0) + 1; z++) {
            for (let y = point.y - 1; y <= point.y + 1; y++) {
                for (let x = point.x - 1; x <= point.x + 1; x++) {
                    const newPoint = Point.fromObject(Point.fromObject({ x, y, z }))
                    if (newPoint.toSymbol() !== Point.fromObject({ ...point, z: point.z || 0 }).toSymbol()) {
                        points = [...points, newPoint]
                    }
                }
            }
        }

        return points
    }


    toString() {
        let out = ""

        for (let z = 0; z < this.depth; z++) {
            out += `Layer ${z}:\n`;

            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    out += this.getPoint(Point.fromObject({ x, y, z })) || ' '
                }

                out += `\n`;

            }

            out += `\n\n`;
        }

        return out
    }
}