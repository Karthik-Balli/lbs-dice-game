import random


class DiceService:

    def __init__(self, leaderboard):

        self.leaderboard = leaderboard


    def roll_dice(self, user_id):

        rolls = []

        while True:

            dice = random.randint(1, 6)

            rolls.append(dice)

            self.leaderboard.update_score(user_id, dice)

            if dice < 6:
                break

        return {
            "user": user_id,
            "rolls": rolls,
            "total_added": sum(rolls)
        }