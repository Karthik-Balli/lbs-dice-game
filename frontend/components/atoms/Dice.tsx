"use client"

import { motion } from "framer-motion"

interface Props {
  value: number
}

export default function Dice({ value }: Props) {

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
      className="w-24 h-24 neo flex items-center justify-center text-4xl font-bold"
    >
      {value}
    </motion.div>
  )
}