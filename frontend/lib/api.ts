import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8000"
})

export const rollDice = async (user: string) => {
  const res = await API.post(`/roll-dice/${user}`)
  return res.data
}

export const getTopK = async (k: number) => {
  const res = await API.get(`/top-k/${k}`)
  return res.data
}

export const getRank = async (user: string) => {
  const res = await API.get(`/rank/${user}`)
  return res.data
}

export const getRange = async (start: number, end: number) => {
  const res = await API.get(`/range?start=${start}&end=${end}`)
  return res.data
}