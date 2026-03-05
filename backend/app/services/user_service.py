import random

NAMES = [
    "Alice","Bob","Charlie","David","Eva",
    "Frank","Grace","Helen","Ivan","Julia",
    "Kevin","Leo","Mia","Noah","Olivia",
    "Paul","Quinn","Ryan","Sophia","Tom",
    "Uma","Victor","Wendy","Xavier","Yara","Zane"
]


def generate_users(count=20):

    selected = random.sample(NAMES, count)

    users = []

    for i, name in enumerate(selected, start=1):

        user = f"{name}_{str(i).zfill(2)}"

        users.append(user)

    return users