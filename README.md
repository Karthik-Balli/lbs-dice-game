# 🎲 Dice Game with a Real-Time Leaderboard System

A full-stack application that demonstrates a **real-time leaderboard system** powered by an efficient in-memory data structure.

The project visualizes leaderboard updates using a **dice game**, where players gain points by rolling a dice. The leaderboard updates immediately after every score event.

This project was built to demonstrate:

* Efficient ranking systems
* Real-time score updates
* Scalable backend design
* Interactive frontend visualization

---

# 📌 Project Overview

The system simulates a game with multiple players.

Each player can roll a dice to earn points.

Rules:

* Dice values range from **1 → 6**
* Players **start with score = 0**
* If a player rolls **6**, they get **another roll**
* The score update is sent as a **stream event**

Example:

```
{ user_id: "alice", delta: 6 }
{ user_id: "alice", delta: 3 }
```

Alice's score increases by:

```
6 + 3 = 9
```

The leaderboard updates immediately after each event.

---

# 🧠 Core Idea

The backend maintains a **real-time global leaderboard**.

The system must efficiently support:

* Score updates
* Top-K players
* Rank lookup
* Rank range queries

Sorting the entire dataset for each request would be expensive, so the system uses a **balanced tree data structure**.

---

# ⚙️ Technology Stack

## Frontend

* **Next.js**
* **TypeScript**
* **TailwindCSS**
* **ShadCN UI**
* **Framer Motion**
* **react-dice-roll**

Design style:

* **Neumorphism UI**
* Dark theme

Color palette:

| Element    | Color     |
| ---------- | --------- |
| Background | `#101210` |
| Text       | `#ffffff` |
| Primary    | `#bee800` |

---

## Backend

* **FastAPI**
* **Python**
* Custom **Treap (Randomized Balanced BST)**

---

# 🏗 System Architecture

```
Frontend (Next.js)
        │
        │ REST API
        ▼
FastAPI Backend
        │
        │ Leaderboard Engine
        ▼
Treap + HashMap
```

Workflow:

```
Roll Dice
   ↓
Frontend calls API
   ↓
Backend generates score event
   ↓
Leaderboard updates
   ↓
Frontend fetches updated leaderboard
```

---

# 📂 Repository Structure

```
leaderboard-dice-game
│
├── apps
│
│   ├── frontend
│   │   ├── components
│   │   │   ├── atoms
│   │   │   ├── molecules
│   │   │   ├── organisms
│   │   │   └── templates
│   │   ├── app
│   │   └── lib
│   │
│   └── backend
│       ├── app
│       │   ├── api
│       │   ├── services
│       │   ├── data_structures
│       │   ├── models
│       │   └── schemas
│
├── package.json
└── README.md
```

---

# ⚡ Leaderboard Data Structure

The leaderboard uses a combination of:

```
HashMap + Treap + Lock
```

### HashMap

Stores:

```
user_id → score
```

This provides **O(1) lookup** during updates.

---

### Treap

A **Randomized Balanced Binary Search Tree** that maintains sorted ranking.

Players are stored using:

```
(-score, user_id)
```

This ensures:

1. Higher scores rank first
2. Ties break alphabetically

Treap operations:

| Operation   | Complexity |
| ----------- | ---------- |
| Insert      | O(log n)   |
| Delete      | O(log n)   |
| Rank        | O(log n)   |
| Kth Element | O(log n)   |

---

### Thread Safety

Score updates are protected with:

```
threading.Lock
```

This ensures safe concurrent updates.

---

# 🎲 Dice Game Logic

Dice rolls generate score events.

Example:

```
User rolls dice
→ result = 6
→ update_score(user, 6)
→ roll again

Next roll = 3
→ update_score(user, 3)
→ stop
```

Final score increase:

```
6 + 3 = 9
```

The backend returns:

```
{
  "user": "alice",
  "rolls": [6,3],
  "total_added": 9
}
```

---

# 🚀 API Endpoints

### Roll Dice

```
POST /roll-dice/{user_id}
```

Example:

```
POST /roll-dice/alice
```

---

### Get Top Players

```
GET /top-k/{k}
```

Example:

```
GET /top-k/10
```

---

### Get Player Rank

```
GET /rank/{user_id}
```

---

### Get Players in Rank Range

```
GET /range?start=1&end=10
```

---

# 🎨 Frontend UI

The frontend follows **Atomic Design**:

### Atoms

* Dice component
* Button

### Molecules

* DiceRoller

### Organisms

* LeaderboardTable

### Templates

* GameLayout

---

# 🎲 Dice Animation

Dice animation uses:

```
react-dice-roll
```

To produce realistic rolling animations.

The dice component stays mounted, and the animation is triggered using a **ref** to avoid unnecessary React re-renders.

---

# ▶️ Running the Project

## 1. Install dependencies

From root:

```
npm install
```

Backend:

```
pip install -r apps/backend/requirements.txt
```

---

## 2. Start both apps

```
npm run dev
```

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:8000
```

API docs:

```
http://localhost:8000/docs
```

---

# 📊 Performance Characteristics

The system supports large player bases because:

* Score updates are **O(log n)**
* Rank queries are **O(log n)**
* Top-K queries are **O(k log n)**

This approach avoids sorting the entire leaderboard.

---

# 🔮 Possible Improvements

If this project were extended further, the following improvements could be implemented:

### Real-Time Updates

Use **WebSockets** to push leaderboard changes instantly.

---

### Distributed Leaderboard

Use:

```
Redis Sorted Sets
```

for distributed leaderboard storage.

---

### Event Streaming

Use:

```
Kafka
```

to process score update streams.

---

### Snapshot Support

To support historical queries:

```
get_top_k_at(timestamp)
```

Use:

* event sourcing
* periodic snapshots

---

# 🎯 Summary

This project demonstrates how to build a **scalable real-time leaderboard system** and visualize it through an interactive dice game.

It combines:

* efficient algorithms
* backend architecture
* modern frontend design
* real-time game simulation

---

# 👤 Author

**Karthik**

---
