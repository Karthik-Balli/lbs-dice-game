import DiceRoller from "../molecules/DiceRoller"
import LeaderboardTable from "../organisms/LeaderboardTable"

export default function GameLayout() {

  const refresh = () => {
    window.location.reload()
  }

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-10">

      <h1 className="text-3xl font-bold text-center">
        🎲 Dice Leaderboard Game
      </h1>

      <div className="flex justify-center">
        <DiceRoller user={{ id: "alice", name: "Alice" }} refresh={refresh} />
      </div>

      <LeaderboardTable />

    </div>
  )
}