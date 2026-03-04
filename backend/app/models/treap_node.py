import random


class TreapNode:

    def __init__(self, key):

        self.key = key
        self.priority = random.random()

        self.left = None
        self.right = None

        self.size = 1


def get_size(node):
    return node.size if node else 0


def update_size(node):
    if node:
        node.size = 1 + get_size(node.left) + get_size(node.right)