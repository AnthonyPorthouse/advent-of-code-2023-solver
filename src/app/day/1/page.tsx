"use client"

import Header from "@/components/layout/header"
import { useState } from "react"

function solvePart1(input: string) {
    let total = 0

    for (const line of input.split('\n')) {
        if (line === '') {
            continue;
        }

        const chars = line.split('');

        const first = chars.find((char) => char.match(/\d/) !== null)
        const last = chars.toReversed().find((char) => char.match(/\d/) !== null)

        if (!first || !last) {
            throw `Unmatched value in line: ${line}`
        }

        const number = Number(`${first}${last}`);

        total += number
    }

    return total
}

function solvePart2(input: string) {
    const numberRegex = /\d/

    let total = 0

    for (const line of input.split('\n')) {
        if (line === '') {
            continue;
        }

        let newline = '';

        for (let i = 0; i < line.length; i++) {
            const substr = line.substring(i);

            if (substr.startsWith('one')) {
                newline += '1'
                continue
            }
            if (substr.startsWith('two')) {
                newline += '2'
                continue
            }

            if (substr.startsWith('three')) {
                newline += '3'
                continue
            }

            if (substr.startsWith('four')) {
                newline += '4'
                continue
            }

            if (substr.startsWith('five')) {
                newline += '5'
                continue
            }

            if (substr.startsWith('six')) {
                newline += '6'
                continue
            }

            if (substr.startsWith('seven')) {
                newline += '7'
                continue
            }

            if (substr.startsWith('eight')) {
                newline += '8'
                continue
            }

            if (substr.startsWith('nine')) {
                newline += '9'
                continue
            }

            newline += substr.at(0) ?? ''

        }

        const chars = newline.split('');

        const digits = chars.filter((char) => char.match(numberRegex) !== null)

        if (digits.length === 0) {
            throw `Unmatched value in line: ${line}`
        }

        const number = Number(`${digits.at(0)}${digits.at(-1)}`)

        total += number
    }

    return total
}


export default function Day1() {
    const [input, setInput] = useState(`1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet`)

    const [result, setResult] = useState<string | number>()

    return (
        <div>

            <div className="grid grid-cols-1 w-1/2 mx-auto gap-4">

                <Header>Day 1</Header>

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