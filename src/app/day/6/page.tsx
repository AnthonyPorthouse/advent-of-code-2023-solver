"use client"

import Header from "@/components/layout/header"
import { solvePart1, solvePart2 } from "@/lib/day6"
import { useState } from "react"

const day4Example = `
Time:      7  15   30
Distance:  9  40  200
`.trim()

export default function Day3() {
    const [input, setInput] = useState(day4Example)

    const [result, setResult] = useState<string | number>()

    return (
        <div>
            <div className="grid grid-cols-1 w-1/2 mx-auto gap-4">

                <Header>Day 6: Wait For It</Header>


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