"use client"

import Header from "@/components/layout/header"
import { useState } from "react"

type Stats = { id: number, maxRed: number, maxGreen: number, maxBlue: number, isImpossible: boolean }
type Stats2 = { id: number, maxRed: number, maxGreen: number, maxBlue: number, power: number }
type Colors = "red" | "green" | "blue"

function solvePart1(input: string) {
    const counts = {
        red: 12,
        green: 13,
        blue: 14
    }


    const games: Stats[] = []


    for (const row of input.split('\n')) {

        if (row === '') {
            continue;
        }

        const [gameId, rounds] = row.split(': ')

        const [_, id] = gameId.split(' ');

        const stats: Stats = {
            id: Number(id),
            maxRed: 0,
            maxGreen: 0,
            maxBlue: 0,
            isImpossible: false
        }

        rounds.split('; ').map((round) => {
            round.split(', ').map((value) => {
                const [count, color] = value.split(' ');

                switch (color as Colors) {
                    case "red":
                        stats.maxRed = Math.max(stats.maxRed, Number(count))
                        return
                    case "green":
                        stats.maxGreen = Math.max(stats.maxGreen, Number(count))
                        return
                    case "blue":
                        stats.maxBlue = Math.max(stats.maxBlue, Number(count))
                        return
                }
            })
        })

        stats.isImpossible = stats.maxRed > counts.red || stats.maxGreen > counts.green || stats.maxBlue > counts.blue

        games.push(stats)
    }

    const total = games.reduce((prev, stats) => {
        if (stats.isImpossible) {
            return prev
        }

        return prev + stats.id
    }, 0)

    return total
}

function solvePart2(input: string) {
    const games: Stats2[] = []

    for (const row of input.split('\n')) {
        if (row === '') {
            continue;
        }

        const [gameId, rounds] = row.split(': ')

        const [_, id] = gameId.split(' ');

        const stats: Stats2 = {
            id: Number(id),
            maxRed: 0,
            maxGreen: 0,
            maxBlue: 0,
            power: 0
        }

        rounds.split('; ').map((round) => {
            round.split(', ').map((value) => {
                const [count, color] = value.split(' ');

                switch (color as Colors) {
                    case "red":
                        stats.maxRed = Math.max(stats.maxRed, Number(count))
                        return
                    case "green":
                        stats.maxGreen = Math.max(stats.maxGreen, Number(count))
                        return
                    case "blue":
                        stats.maxBlue = Math.max(stats.maxBlue, Number(count))
                        return
                }
            })
        })

        stats.power = stats.maxRed * stats.maxGreen * stats.maxBlue

        games.push(stats)
    }

    const total = games.reduce((prev, stats) => {
        return prev + stats.power
    }, 0)

    return total
}


export default function Day2() {
    const [input, setInput] = useState(
        `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n` +
        `Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n` +
        `Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n` +
        `Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n` +
        `Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`)

    const [result, setResult] = useState<string | number>()

    return (
        <div>

            <div className="grid grid-cols-1 w-1/2 mx-auto gap-4">
                <Header>Day 2</Header>


                <label htmlFor="input" className="text-gray-800">Input</label>
                <textarea value={input} className="rounded-md font-mono" id="input" name="input" rows={10} onChange={(e) => {
                    setInput(e.currentTarget.value)
                }} />

                <button className="border rounded-md px-4 py-2" onClick={() => {
                    setResult(solvePart1(input))
                }}>Solve Part 1</button>

                <button className="border rounded-md px-4 py-2" onClick={() => {
                    setResult(solvePart2(input))
                }}>Solve Part 2</button>

                {result !== undefined && <div className="border-4 rounded-md border-dashed text-xl text-center px-4 py-2">
                    Result: <span className="font-bold">{result}</span>
                </div>}
            </div>

        </div>
    )
}