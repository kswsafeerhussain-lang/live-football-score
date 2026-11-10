# GoalPulse – Professional Football Live Score & Match Tracking Platform
**With Custom Stack Data Structure (LIFO) for Real-Time Match Incident Management**

> **University Project Submission**  
> **Course:** CS-201: Data Structures and Algorithms  
> **Student:** Safeer Hussain  
> **Topic:** Stack Abstract Data Type (ADT) & Last-In, First-Out (LIFO) Applied to Sports Officiating & VAR Rollbacks  

---

## ⚽ 1. Project Overview

**GoalPulse** is a high-performance football live score tracking web application inspired by FotMob, LiveScore, SofaScore, and ESPN Football. Built with React, TypeScript, and Tailwind CSS, it integrates authentic fixtures, live scores, lineups with a 2D tactical football pitch, match statistics, chronological timelines, and play-by-play commentary across Europe's top 6 competitions:

1. **English Premier League (EPL)** – 20 Clubs, 38 Matchdays, 380 Fixtures
2. **UEFA Champions League (UCL)** – 36 Clubs League Phase + Knockouts
3. **La Liga** – 20 Clubs, 38 Matchdays, 380 Fixtures
4. **Bundesliga** – 18 Clubs, 34 Matchdays, 306 Fixtures
5. **Serie A** – 20 Clubs, 38 Matchdays, 380 Fixtures
6. **Ligue 1** – 18 Clubs, 34 Matchdays, 306 Fixtures

In addition to serving as a live sports hub, **GoalPulse fulfills university Data Structures and Algorithms (DSA) requirements** through two core algorithmic foundations:
1. **The Custom Stack Data Structure (`src/dsa/Stack.ts`):** Enforces strict **Last-In, First-Out (LIFO)** semantics for real-time match events and instantaneous **VAR Decision Rollbacks** in $O(1)$ constant time.
2. **The Round-Robin Tournament Scheduling Algorithm (`src/dsa/TournamentScheduler.ts`):** Uses the canonical Berger Polygon method to deterministically generate the complete, authentic **Matchdays 1 to 38** schedule (~1,752 fixtures) with cyclic permutations and home/away phase inversions.

---

## 🧠 2. Data Structures & Algorithms (DSA) Implementation: The Stack ADT

### What is a Stack?
A **Stack** is a linear Abstract Data Type (ADT) that models a container with restricted access adhering to the **Last-In, First-Out (LIFO)** principle. The last element added to the stack is the first element to be removed.

### Why a Stack in Football Technology?
In modern sports officiating:
1. Match events occur chronologically (goals, fouls, substitutions, VAR reviews).
2. During match incidents, referees and Video Assistant Referees (VAR) often need to **review and rollback** decisions (e.g. a goal is disallowed after a handball check, or a red card is downgraded to yellow).
3. The **Stack ADT** is optimal for this because the most recent decision resides at the **TOP OF THE STACK**.
4. Performing a **POP** operation allows instantaneous, $O(1)$ constant-time decision rollback without modifying historical data lower down in the stack.

### Stack Class API & Formal Invariants

Located in `src/dsa/Stack.ts` and `src/dsa/MatchEventStack.ts`:

| Method | Signature | Time Complexity | Space Complexity | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`push(event)`** | `(element: T) => void` | $O(1)$ | $O(1)$ | Inserts item onto TOP of stack. New TOP becomes index $N-1$. |
| **`pop()`** | `() => T \| undefined` | $O(1)$ | $O(1)$ | Removes and returns item from TOP of stack (LIFO). Prevents stack underflow. |
| **`peek()`** | `() => T \| undefined` | $O(1)$ | $O(1)$ | Inspects the TOP item without mutating collection state. |
| **`isEmpty()`** | `() => boolean` | $O(1)$ | $O(1)$ | Returns `true` if size is 0, else `false`. |
| **`size()`** | `() => number` | $O(1)$ | $O(1)$ | Returns active count of items on stack. |
| **`display()`** | `() => T[]` | $O(N)$ | $O(N)$ | Returns elements formatted from TOP to BOTTOM for visual inspection. |
| **`clear()`** | `() => void` | $O(1)$ | $O(1)$ | Resets stack to 0 elements. |

---

## 🎓 3. Teacher & Evaluator Demonstration Features

To allow university evaluators and instructors to test and grade the software interactively:

1. **Distinct Relative Match Calendars (Yesterday / Today / Tomorrow):**
   - **Yesterday:** 6 Authentic **Full-Time Results (FT)** (e.g. Liverpool 2-0 Aston Villa, Real Sociedad 1-0 Barcelona, Brighton 2-1 Man City, Juventus 2-0 Torino) complete with goalscorers, minute timestamps, and final match statistics.
   - **Today:** 4 In-Play **LIVE Matches** (Man City vs Arsenal 76', Real Madrid vs Barcelona 41', Bayern vs Leverkusen 58', Inter vs Juventus 88') with live pulsing indicators, 2 Completed Results earlier today, and 4 Tonight Fixtures.
   - **Tomorrow:** 6 Scheduled **Upcoming Fixtures (NS)** across the UEFA Champions League (e.g. Arsenal vs Inter Milan, Real Madrid vs Dortmund, Liverpool vs Leverkusen) with kickoff countdowns and venue data.
2. **Interactive Referee Simulator & Live Event Trigger:**
   - Evaluators can click `⚽ + Goal (Home)` or `⚽ + Goal (Away)` on any in-play match to watch the scoreline change dynamically, add commentary, and **push the event directly onto the LIFO Stack** with toast notifications.
   - Evaluators can click `📺 VAR Rollback (Pop)`: The system automatically invokes `pop()` on the Stack, **cancelling the goal and rolling the score back by 1**, demonstrating the real-world utility of the Stack ADT!

---

## 🧪 4. Automated DSA Verification Test Cases

The application includes an integrated unit test runner in the **Match Event Stack** panel. Test cases include:

1. **LIFO Ordering Verification:**
   - Push `Event A` (Erling Haaland 9' Goal)
   - Push `Event B` (Leandro Trossard 45+8' Red Card)
   - Call `pop()` $\rightarrow$ asserts that `Event B` is returned first.
2. **PEEK Immutability:**
   - Call `peek()` $\rightarrow$ asserts top element matches without decrementing `size()`.
3. **Underflow Protection:**
   - Clear stack $\rightarrow$ call `pop()` and `peek()` $\rightarrow$ asserts graceful `undefined` return without crashing.
4. **Time Complexity Audit:**
   - Verifies all operations execute in constant time $O(1)$.

---

## 🚀 4. Installation & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Steps to Run
```bash
# 1. Clone the repository
git clone https://github.com/your-username/goalpulse-football-live-tracker.git
cd goalpulse-football-live-tracker

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

---

## 🔑 5. Football API Integration & Configuration

GoalPulse provides two operational modes:

### Mode A: Demo & Live Simulation Mode (Default)
- No API key required.
- High-fidelity authentic 2024/2025 match data for Premier League, Champions League, La Liga, Serie A, Bundesliga, and Ligue 1.
- Built-in simulation engine increments live match minutes and generates dynamic match events (goals, cards, substitutions, VAR reviews) that push in real-time onto the DSA Stack.

### Mode B: Real Football-Data.org API
1. Register for a free API token at [https://www.football-data.org/client/register](https://www.football-data.org/client/register).
2. Click the **Demo Mode / Live API** button in the top navigation bar.
3. Paste your API token in the modal and click **Save & Connect API**.
4. GoalPulse will immediately synchronize with live match feeds.

---

## 📹 6. Video Presentation Guide (For University Evaluators)

When demonstrating GoalPulse for grading:
1. **Introduction (0:00 - 0:45):**
   - State your name, course (CS-201 Data Structures and Algorithms), and project name (**GoalPulse**).
2. **Scoreboards & UI Walkthrough (0:45 - 1:45):**
   - Showcase the Premier League and UEFA Champions League tabs.
   - Click a live match card (e.g. *Manchester City vs Arsenal*) to open the **Match Details Center**.
   - Show the 5 tabs: Overview, Statistics comparison bars, 2D Tactical Pitch Lineups, Match Events timeline, and Commentary.
3. **DSA Stack Visualizer Demonstration (1:45 - 3:00):**
   - Click the **Match Event Stack** sidebar navigation.
   - Point to the **TOP OF STACK** pointer with glowing arrow.
   - Demonstrate `PEEK()` to inspect the latest incident without mutation.
   - Demonstrate `PUSH()` by adding a custom goal or card with player name and minute.
   - Demonstrate `POP()` and **VAR DECISION ROLLBACK** to prove LIFO behavior.
   - Click **Run DSA Unit Tests** to display 5/5 PASSED assertions.
4. **Conclusion (3:00 - 3:30):**
   - Conclude with the $O(1)$ complexity analysis and summary of the codebase.

---

## 📦 7. GitHub Upload Instructions

```bash
git init
git add .
git commit -m "feat: complete GoalPulse football tracker with DSA Stack ADT"
git branch -M main
git remote add origin https://github.com/your-username/goalpulse-football-tracker.git
git push -u origin main
```

---

## 📄 License
This project is open-source under the Apache-2.0 License.
