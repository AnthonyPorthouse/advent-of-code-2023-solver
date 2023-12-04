export type Point = {
    x: number,
    y: number,
    z?: number
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

        const is2dInput = function(input: string[][] | string[][][]): input is string[][] {
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
                    grid.setPoint({x,y,z}, value)
                }
            }
        }

        return grid
    }



    getPoint(point: Point): string | undefined {
        return this.data[this.formatPoint(point)]
    }

    getSurroundingPoints(point: Point) {
        let points: Point[] = [];

        for (let z = (point.z || 0) - 1; z <= (point.z || 0) + 1; z++) {
            for (let y = point.y - 1; y <= point.y + 1; y++) {
                for (let x = point.x - 1; x <= point.x + 1; x++) {
                    if (this.formatPoint({ x, y, z }) !== this.formatPoint({ ...point, z: point.z || 0 })) {
                        points = [...points, { x, y, z }]
                    }
                }
            }
        }

        return points
    }

    setPoint(point: Point, data: string) {

        this.width = Math.max(this.width, point.x + 1);
        this.height = Math.max(this.height, point.y + 1);
        this.depth = Math.max(this.depth, (point.z || 0) + 1);

        this.data[this.formatPoint(point)] = data
    }

    private formatPoint({ x, y, z }: Point) {
        return Symbol.for(`${x},${y},${z || 0}`)
    }

    toString() {
        let out = ""

        for (let z = 0; z < this.depth; z++) {
            out += `Layer ${z}:\n`;

            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    out += this.getPoint({ x, y, z }) || ' '
                }

                out += `\n`;

            }

            out += `\n\n`;
        }

        return out
    }
}