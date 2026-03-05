import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8000"
})

/* -----------------------------
   TYPES
------------------------------ */

export interface DiceEvent {
  user: string
  score: number
}

export interface LeaderboardPlayer {
  rank: number
  user: string
  score: number
}

export interface RankResponse {
  user: string
  rank: number
}

/* -----------------------------
   API CALLS
------------------------------ */

// roll dice for all players
export const rollDice = async (): Promise<DiceEvent[]> => {
  const res = await API.post("/roll-dice")
  return res.data
}

// fetch top k leaderboard
export const getTopK = async (k: number): Promise<LeaderboardPlayer[]> => {
  const res = await API.get(`/top-k/${k}`)
  return res.data
}

// fetch player rank
export const getRank = async (user: string): Promise<RankResponse> => {
  const res = await API.get(`/rank/${user}`)
  return res.data
}

// fetch leaderboard range
export const getRange = async (
  start: number,
  end: number
): Promise<LeaderboardPlayer[]> => {
  const res = await API.get(`/range?start=${start}&end=${end}`)
  return res.data
}

// fetch all users
export const getUsers = async (): Promise<string[]> => {
  const res = await API.get(`/users`)
  return res.data
}