"use client"

import { useState } from "react"
import Dice from "../atoms/Dice"
import { rollDice } from "@/lib/api"
import { Button } from "@/components/ui/button"

interface DiceRollerProps {
  user: { id: string; name: string }
  refresh: () => void
}

export default function DiceRoller({ user, refresh }: DiceRollerProps) {

  const [dice, setDice] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleRoll = async () => {

    setLoading(true)

    const res = await rollDice(user.id)

    const rolls = res.rolls

    for (const r of rolls) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setDice(r)
    }

    refresh()
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">

      <Dice value={dice} />

      <Button
        className="bg-primary text-black"
        disabled={loading}
        onClick={handleRoll}
      >
        Roll Dice
      </Button>

    </div>
  )
}