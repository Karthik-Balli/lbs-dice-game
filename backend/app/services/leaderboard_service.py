from threading import Lock

from app.data_structures.treap import Treap


class LeaderboardService:

    def __init__(self):

        self.treap = Treap()
        self.score_map = {}

        self.lock = Lock()


    def update_score(self, user_id, delta):

        with self.lock:

            old_score = self.score_map.get(user_id, 0)

            if user_id in self.score_map:
                self.treap.delete((-old_score, user_id))

            new_score = max(0, old_score + delta)

            self.treap.insert((-new_score, user_id))

            self.score_map[user_id] = new_score


    def get_top_k(self, k):

        result = []

        for i in range(1, k + 1):

            node = self.treap.kth(i)

            if not node:
                break

            score = -node.key[0]
            user = node.key[1]

            result.append((user, score))

        return result


    def get_rank(self, user_id):

        score = self.score_map.get(user_id)

        if score is None:
            return None

        key = (-score, user_id)

        return self.treap.rank(key)


    def get_players_in_range(self, start, end):

        result = []

        for i in range(start, end + 1):

            node = self.treap.kth(i)

            if not node:
                break

            score = -node.key[0]
            user = node.key[1]

            result.append((user, score))

        return result