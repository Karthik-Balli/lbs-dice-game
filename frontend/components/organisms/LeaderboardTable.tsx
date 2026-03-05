"use client"

import { useState } from "react"
import { getRank, getRange } from "@/lib/api"

type Player = {
  rank: number
  user: string
  score: number
}

export default function LeaderboardTable({
  players,
  setPlayers,
  k,
  setK,
  refreshLeaderboard
}: {
  players: Player[]
  setPlayers: (players: Player[]) => void
  k: number
  setK: (k: number) => void
  refreshLeaderboard: () => void
}) {

  const [username, setUsername] = useState("")
  const [rankResult, setRankResult] = useState<number | null>(null)

  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(5)

  const findRank = async () => {

    if (!username) return

    const res = await getRank(username)

    setRankResult(res.rank)
  }

  const fetchRange = async () => {

    const data = await getRange(start, end)

    setPlayers(data)
  }

  return (

    <div className="neo p-6 space-y-6">

      <h2 className="text-2xl font-bold">
        Leaderboard Dashboard
      </h2>

      {/* TOP K */}

      <div className="flex gap-2 items-center">

        <label>Top K:</label>

        <input
          type="number"
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          className="bg-gray-200 text-black px-2 py-1 w-16"
        />

        <button
          className="bg-[#bee800] text-black px-3 py-1"
          onClick={refreshLeaderboard}
        >
          Fetch
        </button>

      </div>

      {/* FIND RANK */}

      <div className="flex gap-2 items-center">

        <label>Find Rank:</label>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-200 text-black px-2 py-1"
        />

        <button
          className="bg-[#bee800] text-black px-3 py-1"
          onClick={findRank}
        >
          Search
        </button>

        {rankResult !== null && (
          <span>
            Rank: <b>{rankResult}</b>
          </span>
        )}

      </div>

      {/* RANGE */}

      <div className="flex gap-2 items-center">

        <label>Range:</label>

        <input
          type="number"
          value={start}
          onChange={(e) => setStart(Number(e.target.value))}
          className="bg-gray-200 text-black px-2 py-1 w-16"
        />

        <span>to</span>

        <input
          type="number"
          value={end}
          onChange={(e) => setEnd(Number(e.target.value))}
          className="bg-gray-200 text-black px-2 py-1 w-16"
        />

        <button
          className="bg-[#bee800] text-black px-3 py-1"
          onClick={fetchRange}
        >
          Fetch
        </button>

      </div>

      {/* TABLE */}

      <table className="w-full">

        <thead>
          <tr className="text-left border-b border-gray-600">
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>

          {players.map((p) => (

            <tr
              key={p.user}
              className="border-t border-gray-700"
            >
              <td>{p.rank}</td>
              <td>{p.user}</td>
              <td>{p.score}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}