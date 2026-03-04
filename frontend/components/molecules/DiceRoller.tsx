"use client"

import { useRef, useState } from "react"
import Dice from "../atoms/Dice"
import { rollDice } from "@/lib/api"
import { Button } from "@/components/ui/button"

export default function DiceRoller({ user, refresh }: any) {

  const diceRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const handleRoll = async () => {

    setLoading(true)

    const result = await rollDice(user)

    const rolls = result.rolls

    for (const r of rolls) {

      diceRef.current.rollDice(r)

      await sleep(900)
    }

    refresh()

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-6">

      <Dice ref={diceRef} />

      <Button
        className="bg-[#bee800] text-black px-6 py-2"
        onClick={handleRoll}
        disabled={loading}
      >
        {loading ? "Rolling..." : "Roll Dice"}
      </Button>

    </div>
  )
}