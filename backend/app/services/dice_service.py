import random


class DiceService:

    def __init__(self, leaderboard, users):

        self.leaderboard = leaderboard
        self.users = users


    def roll_for_all(self):

        events = []

        for user in self.users:

            while True:

                roll = random.randint(1,6)

                self.leaderboard.update_score(user, roll)

                events.append({
                    "user": user,
                    "score": roll
                })

                if roll < 6:
                    break

        return events