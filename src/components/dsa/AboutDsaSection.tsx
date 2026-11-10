/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - University Project Documentation: Data Structures & Algorithms
 * Subject: CS-201 Data Structures & Algorithms
 * Topic: Stack Abstract Data Type (ADT) & Last-In, First-Out (LIFO) Applied to Real-Time Sports Officiating
 */

import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  Copy, 
  Download, 
  Layers, 
  Cpu, 
  Video, 
  Github, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

export const AboutDsaSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const academicReportMarkdown = `# UNIVERSITY COURSE PROJECT REPORT: GOALPULSE
**Course:** CS-201: Data Structures and Algorithms  
**Project Title:** GoalPulse – Real-Time Football Tracking & Stack Data Structure Implementation  
**Student:** Safeer Hussain  
**Date:** November 2024 / Academic Year 2024–2025  

---

### 1. ABSTRACT & PROBLEM DEFINITION
In modern professional football officiating and broadcast analytics, events occur in a continuous, chronological stream (goals, yellow/red cards, substitutions, and penalties). However, modern officiating increasingly depends on the Video Assistant Referee (VAR) protocol to review and overturn erroneous decisions. 

When a decision is overturned (e.g. a goal disallowed due to a foul earlier in the attacking phase of play, or a red card downgraded), the system must reverse the most recently recorded event without disturbing the underlying match history. 

This project explores the design, theoretical invariants, and software implementation of the **Stack Abstract Data Type (ADT)** adhering to the **Last-In, First-Out (LIFO)** principle to solve the real-time match incident and VAR rollback problem.

---

### 2. DATA STRUCTURE SPECIFICATION: STACK ADT
A **Stack** is a linear collection of elements with restricted access: elements can only be added to or removed from the top.

#### Core Operations & Time Complexities:
1. **push(event)**: Inserts an event onto the top of the stack.  
   *Time Complexity:* O(1) constant time.  
   *Space Complexity:* O(1).
2. **pop()**: Removes and returns the element at the top of the stack.  
   *Time Complexity:* O(1) constant time.  
   *Space Complexity:* O(1).
3. **peek()**: Inspects the top element without mutating the collection.  
   *Time Complexity:* O(1).
4. **isEmpty()**: Asserts if the stack contains zero elements.  
   *Time Complexity:* O(1).
5. **size()**: Returns the current cardinal count of active elements.  
   *Time Complexity:* O(1).
6. **display()**: Visualizes the internal state ordered from TOP to BOTTOM.

---

### 3. WHY STACK (LIFO) VS QUEUE (FIFO)
| Feature | Stack (LIFO) | Queue (FIFO) |
| :--- | :--- | :--- |
| **Principle** | Last-In, First-Out | First-In, First-Out |
| **Primary Sports Use** | VAR Rollback, Undo Mistaken Call, Officiating Audit Trail | Ticketing Queue, Sequential Video Playback buffer |
| **Top/Front Access** | Removes most recent incident | Removes earliest historical incident |
| **Rollback Capability** | Direct O(1) removal of latest action | Unsuitable (would delete kick-off before 90' goal) |

---

### 4. ROUND-ROBIN TOURNAMENT SCHEDULING ALGORITHM (MATCHDAYS 1 TO 38)
In addition to the Stack ADT, GoalPulse implements the canonical **Round-Robin Tournament Graph Scheduling Algorithm (Berger Polygon Method)** in \`src/dsa/TournamentScheduler.ts\` to generate the full 38-matchday calendar across the English Premier League, La Liga, and Serie A (and 34 matchdays for Bundesliga and Ligue 1).

- **Algorithm Structure:** Uses cyclic rotational permutations where index 0 remains a fixed pivot vertex while indices 1 through N-1 rotate circularly.
- **Phase Inversion:** Generates N-1 rounds in Phase 1, then swaps home/away orientations in Phase 2 so every club plays all opponents both home and away.
- **Time Complexity:** O(N × M) where N = number of clubs and M = number of rounds.
- **Total Generated Dataset:** 380 fixtures per 20-team league and 306 fixtures per 18-team league (~1,752 total fixtures).

---

### 5. METHODOLOGY & ARCHITECTURE
1. **Generic Core Class (\`Stack<T>\`):** Built from fundamental principles without reliance on high-level framework wrappers. Enforces strict capacity boundaries and tracks operational audit logs.
2. **Domain Specialization (\`MatchEventStack\`):** Adapts the Stack ADT to encapsulate football match models, including match IDs, team sides, event types, player rosters, and VAR flags.
3. **Reactive UI Visualizer:** Renders memory frames with real-time slot addresses \`Stack[N-1]\` down to \`Stack[0]\`, animating the \`TOP OF STACK\` pointer.

---

### 6. AUTOMATED TEST SUITE & VERIFICATION
The software contains an integrated verification runner testing:
- **LIFO Sequence:** Verifies that sequential pushes of [E1, E2, E3] guarantee E3 is popped first.
- **Peek Immutability:** Asserts size remains invariant before and after \`peek()\`.
- **Underflow Protection:** Guarantees no exceptions on empty stack operations.
- **O(1) Execution:** Validates constant time execution without linear array shifting.

---

### 7. VIDEO PRESENTATION SCRIPT OUTLINE
1. **Introduction (0:00 - 0:45):** Introduce student name, GoalPulse concept, and project scope.
2. **Live Scores & UI (0:45 - 1:45):** Demonstrate live scoreboards, Premier League / UCL sections, and match details center with 2D pitch lineups.
3. **Stack ADT Visualizer (1:45 - 3:00):** 
   - Demonstrate PUSH: Add Erling Haaland 9' goal.
   - Demonstrate PEEK: Verify top element is Erling Haaland.
   - Demonstrate PUSH: Add Leandro Trossard red card.
   - Demonstrate VAR ROLLBACK / POP: Show Trossard card removed from TOP, leaving Haaland intact.
4. **Full Season Fixtures (3:00 - 3:30):** Show Matchdays 1 to 38 generated by the Round-Robin algorithm across EPL, La Liga, Serie A, Bundesliga, and Ligue 1.
5. **Conclusion & Code Review (3:30 - 4:15):** Walk through \`Stack.ts\` methods, algorithmic complexity, and conclude.
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(academicReportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-blue-500/30 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider border border-blue-500/40">
                Academic Report & Documentation
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                Course: CS-201
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              Stack Data Structure in GoalPulse
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Complete theoretical breakdown, algorithm complexity analysis, and academic submission documentation 
              for the Stack ADT implementation in sports analytics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-950"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Project Report'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Concept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">LIFO Principle</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Last-In, First-Out:</strong> The most recently pushed event is placed on the top of the stack and is the first element removed during a POP operation.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">O(1) Time Complexity</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All primitive operations — <code>push()</code>, <code>pop()</code>, and <code>peek()</code> — execute in constant time <strong>O(1)</strong>, with zero element re-indexing.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Real-World VAR Application</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Simulates pitchside monitor VAR reviews. When a goal or card is overturned, the referee rolls back the event via <code>pop()</code>.
          </p>
        </div>

      </div>

      {/* Complexity Analysis Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          Algorithmic Complexity Specification
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Stack Method</th>
                <th className="p-3">Time Complexity</th>
                <th className="p-3">Space Complexity</th>
                <th className="p-3">Precondition</th>
                <th className="p-3">Postcondition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-emerald-400">push(element)</td>
                <td className="p-3 text-emerald-400">O(1)</td>
                <td className="p-3">O(1)</td>
                <td className="p-3 text-slate-400">size &lt; capacity</td>
                <td className="p-3 text-white">element becomes new TOP; size increases by 1</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-red-400">pop()</td>
                <td className="p-3 text-emerald-400">O(1)</td>
                <td className="p-3">O(1)</td>
                <td className="p-3 text-slate-400">!isEmpty()</td>
                <td className="p-3 text-white">TOP removed & returned; size decreases by 1</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-amber-400">peek()</td>
                <td className="p-3 text-emerald-400">O(1)</td>
                <td className="p-3">O(1)</td>
                <td className="p-3 text-slate-400">!isEmpty()</td>
                <td className="p-3 text-white">TOP returned; collection unmodified</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-400">isEmpty()</td>
                <td className="p-3 text-emerald-400">O(1)</td>
                <td className="p-3">O(1)</td>
                <td className="p-3 text-slate-400">None</td>
                <td className="p-3 text-white">returns boolean (size === 0)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-purple-400">size()</td>
                <td className="p-3 text-emerald-400">O(1)</td>
                <td className="p-3">O(1)</td>
                <td className="p-3 text-slate-400">None</td>
                <td className="p-3 text-white">returns integer count</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Academic Report Content Viewer */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Complete University Project Report (Markdown Document)
            </h3>
          </div>
          <button
            type="button"
            onClick={copyToClipboard}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
          >
            {copied ? '✓ Copied' : 'Copy All'}
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
          {academicReportMarkdown}
        </pre>
      </div>

      {/* Video Presentation Guide & GitHub Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Video className="w-4 h-4" />
            <span>Instructor Video Presentation Guide</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Step 1: Open the <strong>Live Matches</strong> page to highlight real-time score updates.<br/>
            Step 2: Navigate to <strong>Match Event Stack</strong> tab.<br/>
            Step 3: Point to the <strong>TOP of Stack</strong> pointer and explain LIFO semantics.<br/>
            Step 4: Push an event, click <strong>Peek()</strong>, then <strong>Pop()</strong> to illustrate Last-In, First-Out.<br/>
            Step 5: Run the <strong>Automated DSA Unit Tests</strong> to confirm all assertions pass.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <Github className="w-4 h-4" />
            <span>GitHub Repository & Submission Notes</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            All code is modularly structured under <code>src/dsa/Stack.ts</code>, <code>src/dsa/MatchEventStack.ts</code>, and <code>src/components/dsa/</code>. 
            The repository includes full TypeScript typings, zero runtime warnings, and production build verification via Vite.
          </p>
        </div>

      </div>

    </div>
  );
};
