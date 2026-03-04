"use client"

import { useEffect, useState } from "react"
import { getTopK } from "@/lib/api"

type Player = [string, number]

export default function LeaderboardTable() {

  const [players, setPlayers] = useState<Player[]>([])

  const fetchLeaderboard = async () => {
    const data = await getTopK(10)
    setPlayers(data)
  }

  useEffect(() => {
    const loadLeaderboard = async () => {
      await fetchLeaderboard()
    }
    loadLeaderboard()
  }, [])

  return (
    <div className="neo p-6">

      <h2 className="text-xl mb-4 font-bold">Leaderboard</h2>

      <table className="w-full">

        <thead>
          <tr className="text-left">
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>

          {players.map((p, i) => (
            <tr key={i} className="border-t border-gray-700">

              <td>{i + 1}</td>
              <td>{p[0]}</td>
              <td>{p[1]}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}