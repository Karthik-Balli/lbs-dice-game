from fastapi import APIRouter

from app.services.leaderboard_service import LeaderboardService
from app.services.dice_service import DiceService
from app.services.user_service import generate_users

router = APIRouter()

# Create leaderboard instance
leaderboard = LeaderboardService()

# Generate mock users
users = generate_users(20)

# Initialize leaderboard with users
for u in users:
    leaderboard.score_map[u] = 0
    leaderboard.treap.insert((0, u))   # score = 0


# Dice service needs leaderboard + users
dice = DiceService(leaderboard, users)


@router.post("/roll-dice")
def roll_dice():
    return dice.roll_for_all()


@router.get("/top-k/{k}")
def get_top_k(k: int):
    return leaderboard.get_top_k(k)


@router.get("/rank/{user}")
def get_rank(user: str):
    return {"rank": leaderboard.get_rank(user)}


@router.get("/range")
def get_range(start: int, end: int):
    return leaderboard.get_players_in_range(start, end)