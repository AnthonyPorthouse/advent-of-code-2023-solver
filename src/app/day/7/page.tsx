"use client"

import Header from "@/components/layout/header"
import { solvePart1 } from "@/lib/day7"
import { useState } from "react"

const day7Example = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`.trim()

export default function Day7() {
    const [input, setInput] = useState(day7Example)

    const [result, setResult] = useState<string | number>()

    return (
        <div>
            <div className="grid grid-cols-1 w-1/2 mx-auto gap-4">

                <Header>Day 7: Camel Cards</Header>


                <label htmlFor="input" className="text-gray-800">Input</label>
                <textarea value={input} className="rounded-md font-mono" id="input" name="input" rows={10} onChange={(e) => {
                    setInput(e.currentTarget.value)
                }} />

                <button className="border rounded-md px-4 py-2" onClick={() => {
                    setResult(solvePart1(input))
                }}>Solve Part 1</button>

                <button disabled className="border rounded-md px-4 py-2" onClick={() => {
                    setResult(0)
                }}>Solve Part 2</button>

                {result !== undefined && <div className="border-4 rounded-md border-dashed text-xl text-center px-4 py-2">
                    Result: <span className="font-bold">{result}</span>
                </div>}
            </div>

        </div>
    )
}