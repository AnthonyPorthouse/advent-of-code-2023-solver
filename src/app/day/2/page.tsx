"use client"

import Header from "@/components/layout/header"
import { solvePart1, solvePart2 } from "@/lib/day2"
import { useState } from "react"

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
                <Header>Day 2: Cube Conundrum</Header>

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