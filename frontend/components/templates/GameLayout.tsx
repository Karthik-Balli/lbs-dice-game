"use client"

import { useEffect, useState } from "react"
import DiceRoller from "../molecules/DiceRoller"
import LeaderboardTable from "../organisms/LeaderboardTable"
import { getTopK } from "@/lib/api"

type Player = {
  rank: number
  user: string
  score: number
}

export default function GameLayout() {

  const [players, setPlayers] = useState<Player[]>([])
  const [k, setK] = useState(10)

  const fetchTopK = async () => {
    const data = await getTopK(k)
    setPlayers(data)
  }

  useEffect(() => {
    fetchTopK()
  }, [])

  return (

    <div className="max-w-5xl mx-auto py-12 space-y-10">

      <h1 className="text-3xl font-bold text-center">
        🎲 Dice Leaderboard Game
      </h1>

      {/* Dice */}
      <div className="flex justify-center">
        <DiceRoller refreshLeaderboard={fetchTopK} />
      </div>

      {/* Leaderboard */}
      <LeaderboardTable
        players={players}
        setPlayers={setPlayers}
        k={k}
        setK={setK}
        refreshLeaderboard={fetchTopK}
      />

    </div>
  )
}