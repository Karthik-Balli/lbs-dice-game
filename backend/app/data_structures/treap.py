from app.models.treap_node import TreapNode, update_size, get_size


class Treap:

    def __init__(self):
        self.root = None


    # ---------- Rotations ----------

    def rotate_right(self, y):

        x = y.left
        y.left = x.right
        x.right = y

        update_size(y)
        update_size(x)

        return x


    def rotate_left(self, x):

        y = x.right
        x.right = y.left
        y.left = x

        update_size(x)
        update_size(y)

        return y


    # ---------- Insert ----------

    def _insert(self, node, key):

        if node is None:
            return TreapNode(key)

        if key < node.key:

            node.left = self._insert(node.left, key)

            if node.left.priority > node.priority:
                node = self.rotate_right(node)

        else:

            node.right = self._insert(node.right, key)

            if node.right.priority > node.priority:
                node = self.rotate_left(node)

        update_size(node)

        return node


    def insert(self, key):
        self.root = self._insert(self.root, key)


    # ---------- Delete ----------

    def _delete(self, node, key):

        if node is None:
            return None

        if key < node.key:
            node.left = self._delete(node.left, key)

        elif key > node.key:
            node.right = self._delete(node.right, key)

        else:

            if node.left is None:
                return node.right

            if node.right is None:
                return node.left

            if node.left.priority > node.right.priority:

                node = self.rotate_right(node)
                node.right = self._delete(node.right, key)

            else:

                node = self.rotate_left(node)
                node.left = self._delete(node.left, key)

        update_size(node)

        return node


    def delete(self, key):
        self.root = self._delete(self.root, key)


    # ---------- Kth Node ----------

    def _kth(self, node, k):

        if not node:
            return None

        left_size = get_size(node.left)

        if k <= left_size:
            return self._kth(node.left, k)

        elif k == left_size + 1:
            return node

        else:
            return self._kth(node.right, k - left_size - 1)


    def kth(self, k):
        return self._kth(self.root, k)


    # ---------- Rank ----------

    def _rank(self, node, key, rank):

        if node is None:
            return rank

        if key < node.key:
            return self._rank(node.left, key, rank)

        elif key > node.key:

            rank += get_size(node.left) + 1
            return self._rank(node.right, key, rank)

        else:

            return rank + get_size(node.left) + 1


    def rank(self, key):
        return self._rank(self.root, key, 0)