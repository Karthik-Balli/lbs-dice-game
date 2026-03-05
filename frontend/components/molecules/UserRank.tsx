"use client"

import { useState } from "react"
import { getRank } from "@/lib/api"

export default function UserRank() {

  const [name,setName] = useState("")
  const [rank,setRank] = useState<number | null>(null)

  const handleSearch = async () => {

    const res = await getRank(name)

    setRank(res.rank)
  }

  return (

    <div className="neo p-4">

      <input
        className="text-black px-2"
        placeholder="Enter username"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <button onClick={handleSearch}>
        Find Rank
      </button>

      {rank && <p>Rank: {rank}</p>}

    </div>
  )
}