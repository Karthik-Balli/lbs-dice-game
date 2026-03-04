from fastapi import APIRouter

from app.services.leaderboard_service import LeaderboardService
from app.services.dice_service import DiceService

router = APIRouter()

leaderboard = LeaderboardService()
dice = DiceService(leaderboard)


@router.post("/roll-dice/{user_id}")
def roll_dice(user_id: str):

    return dice.roll_dice(user_id)


@router.get("/top-k/{k}")
def get_top_k(k: int):

    return leaderboard.get_top_k(k)


@router.get("/rank/{user_id}")
def get_rank(user_id: str):

    return {
        "rank": leaderboard.get_rank(user_id)
    }


@router.get("/range")
def get_range(start: int, end: int):

    return leaderboard.get_players_in_range(start, end)