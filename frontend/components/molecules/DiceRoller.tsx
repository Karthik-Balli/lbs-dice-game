"use client"

import { useRef, useState, useCallback } from "react"
import Dice from "../atoms/Dice"
import { rollDice } from "@/lib/api"
import { Button } from "@/components/ui/button"

interface Props {
  refreshLeaderboard: () => void
}

export default function DiceRoller({ refreshLeaderboard }: Props) {

  const diceRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const animateDice = async () => {
    if (loading) return

    for (let i = 0; i < 5; i++) {

      const value = Math.floor(Math.random() * 6) + 1

      diceRef.current?.rollDice(value)

      await sleep(200)
    }
  }

  const handleRoll = useCallback(async (e?: React.MouseEvent) => {

    // prevent bubbling
    e?.stopPropagation()

    if (loading) return

    setLoading(true)

    try {

      await animateDice()

      await rollDice()

      refreshLeaderboard()

    } finally {

      setLoading(false)

    }
  }, [])

  return (

    <div className="flex flex-col items-center gap-6">

      {/* Dice clickable */}
      <div
        className="cursor-pointer"
        onClick={handleRoll}
      >
        <Dice ref={diceRef} />
      </div>

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