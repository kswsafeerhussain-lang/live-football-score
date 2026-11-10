/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Football Match Event Stack Manager
 * Specialized Stack implementation for sports live events, VAR rollbacks, and referee decision audit trails.
 */

import { Stack, StackOperationLog } from './Stack';

export type MatchEventType = 
  | 'goal' 
  | 'yellow_card' 
  | 'red_card' 
  | 'substitution' 
  | 'var_decision' 
  | 'penalty' 
  | 'injury_time';

export interface FootballMatchEvent {
  id: string;
  matchId: string;
  matchTitle: string;
  competition: string;
  type: MatchEventType;
  minute: number;
  extraMinute?: number;
  team: string;
  teamSide: 'home' | 'away';
  player: string;
  secondaryPlayer?: string; // Assist player or substituted-out player
  description: string;
  scoreAfter?: string;
  timestamp: string;
  isOverturnedByVAR?: boolean;
}

export interface RollbackRecord {
  id: string;
  timestamp: string;
  event: FootballMatchEvent;
  reason: string;
}

/**
 * MatchEventStack Class
 * Manages the LIFO timeline of real-time football events.
 * Crucial in professional sports technology for undoing mistakes, VAR overturns, and chronological audit trails.
 */
export class MatchEventStack {
  private stack: Stack<FootballMatchEvent>;
  private rollbackHistory: RollbackRecord[];

  constructor() {
    this.stack = new Stack<FootballMatchEvent>(200);
    this.rollbackHistory = [];
  }

  /**
   * PUSH: Add a new match event to the top of the stack
   */
  public pushEvent(event: FootballMatchEvent): void {
    this.stack.push(event);
  }

  /**
   * POP: Remove the most recent event (LIFO)
   */
  public popEvent(): FootballMatchEvent | undefined {
    return this.stack.pop();
  }

  /**
   * PEEK: Inspect the most recent event on TOP without removing it
   */
  public peekEvent(): FootballMatchEvent | undefined {
    return this.stack.peek();
  }

  /**
   * VAR Rollback: Uses Stack POP to revert the latest incident
   * e.g., Goal overturned by VAR offside or handball review
   */
  public rollbackLatestEvent(reason: string = 'Overturned by VAR review'): FootballMatchEvent | undefined {
    const popped = this.stack.pop();
    if (popped) {
      const rollback: RollbackRecord = {
        id: `rb-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        event: { ...popped, isOverturnedByVAR: true },
        reason
      };
      this.rollbackHistory.unshift(rollback);
    }
    return popped;
  }

  /**
   * Get total number of active events on the stack
   */
  public size(): number {
    return this.stack.size();
  }

  /**
   * Check if stack has no events
   */
  public isEmpty(): boolean {
    return this.stack.isEmpty();
  }

  /**
   * Clear all events
   */
  public clear(): void {
    this.stack.clear();
    this.rollbackHistory = [];
  }

  /**
   * Returns items with TOP of stack at index 0
   */
  public getEventsTopFirst(): FootballMatchEvent[] {
    return this.stack.display();
  }

  /**
   * Returns items in raw stack order (index 0 is BOTTOM)
   */
  public getEventsBottomFirst(): FootballMatchEvent[] {
    return this.stack.toArray();
  }

  /**
   * Returns the DSA operational logs
   */
  public getOperationLogs(): StackOperationLog[] {
    return this.stack.getLogs();
  }

  /**
   * Returns the rollback history
   */
  public getRollbackHistory(): RollbackRecord[] {
    return [...this.rollbackHistory];
  }

  /**
   * Seed authentic match events for instant demonstration
   */
  public loadPresetScenario(scenarioKey: 'el_clasico' | 'ucl_final' | 'premier_derby' = 'premier_derby'): void {
    this.clear();

    const now = new Date();
    const formatTime = (minusMinutes: number) => {
      const d = new Date(now.getTime() - minusMinutes * 60000);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    if (scenarioKey === 'premier_derby') {
      const derbyEvents: FootballMatchEvent[] = [
        {
          id: 'ev-1',
          matchId: 'epl-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'goal',
          minute: 9,
          team: 'Manchester City',
          teamSide: 'home',
          player: 'Erling Haaland',
          secondaryPlayer: 'Savinho',
          description: 'Haaland slots home with a left-footed strike from the centre of the box into the bottom right corner.',
          scoreAfter: '1 - 0',
          timestamp: formatTime(65)
        },
        {
          id: 'ev-2',
          matchId: 'epl-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'goal',
          minute: 22,
          team: 'Arsenal',
          teamSide: 'away',
          player: 'Riccardo Calafiori',
          secondaryPlayer: 'Gabriel Martinelli',
          description: 'Stunning curling strike from outside the box into the top right corner!',
          scoreAfter: '1 - 1',
          timestamp: formatTime(50)
        },
        {
          id: 'ev-3',
          matchId: 'epl-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'yellow_card',
          minute: 34,
          team: 'Manchester City',
          teamSide: 'home',
          player: 'Rúben Dias',
          description: 'Tactical foul halting a fast counter-attack.',
          timestamp: formatTime(40)
        },
        {
          id: 'ev-4',
          matchId: 'epl-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'goal',
          minute: 45,
          extraMinute: 1,
          team: 'Arsenal',
          teamSide: 'away',
          player: 'Gabriel Magalhães',
          secondaryPlayer: 'Bukayo Saka',
          description: 'Bullet header from Saka corner kick into the roof of the net!',
          scoreAfter: '1 - 2',
          timestamp: formatTime(30)
        },
        {
          id: 'ev-5',
          matchId: 'epl-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'red_card',
          minute: 45,
          extraMinute: 8,
          team: 'Arsenal',
          teamSide: 'away',
          player: 'Leandro Trossard',
          description: 'Second yellow card for kicking the ball away after whistle.',
          timestamp: formatTime(25)
        },
        {
          id: 'ev-6',
          matchId: 'epl-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'substitution',
          minute: 56,
          team: 'Manchester City',
          teamSide: 'home',
          player: 'Phil Foden',
          secondaryPlayer: 'Jérémy Doku',
          description: 'Tactical switch: Phil Foden replaces Jérémy Doku.',
          timestamp: formatTime(15)
        },
        {
          id: 'ev-7',
          matchId: 'epl-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'var_decision',
          minute: 88,
          team: 'Manchester City',
          teamSide: 'home',
          player: 'Mateo Kovačić',
          description: 'VAR Check Complete: Penalty appeal dismissed after pitchside monitor review.',
          timestamp: formatTime(5)
        },
        {
          id: 'ev-8',
          matchId: 'epl-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'goal',
          minute: 90,
          extraMinute: 8,
          team: 'Manchester City',
          teamSide: 'home',
          player: 'John Stones',
          secondaryPlayer: 'Mateo Kovačić',
          description: 'DRAMATIC EQUALIZER! John Stones pounces on rebound in 98th minute scrambles!',
          scoreAfter: '2 - 2',
          timestamp: formatTime(1)
        }
      ];

      // Push each event sequentially into the stack enforcing LIFO
      derbyEvents.forEach(evt => this.stack.push(evt));
    } else if (scenarioKey === 'el_clasico') {
      const clasicoEvents: FootballMatchEvent[] = [
        {
          id: 'ec-1',
          matchId: 'laliga-1',
          matchTitle: 'Real Madrid vs FC Barcelona',
          competition: 'La Liga',
          type: 'goal',
          minute: 54,
          team: 'FC Barcelona',
          teamSide: 'away',
          player: 'Robert Lewandowski',
          secondaryPlayer: 'Marc Casadó',
          description: 'Clinical low finish past Lunin into bottom corner.',
          scoreAfter: '0 - 1',
          timestamp: formatTime(40)
        },
        {
          id: 'ec-2',
          matchId: 'laliga-1',
          matchTitle: 'Real Madrid vs FC Barcelona',
          competition: 'La Liga',
          type: 'goal',
          minute: 56,
          team: 'FC Barcelona',
          teamSide: 'away',
          player: 'Robert Lewandowski',
          secondaryPlayer: 'Alejandro Balde',
          description: 'Incredible header from Balde cross!',
          scoreAfter: '0 - 2',
          timestamp: formatTime(35)
        },
        {
          id: 'ec-3',
          matchId: 'laliga-1',
          matchTitle: 'Real Madrid vs FC Barcelona',
          competition: 'La Liga',
          type: 'yellow_card',
          minute: 68,
          team: 'Real Madrid',
          teamSide: 'home',
          player: 'Vinícius Júnior',
          description: 'Caution for dissent towards fourth official.',
          timestamp: formatTime(25)
        },
        {
          id: 'ec-4',
          matchId: 'laliga-1',
          matchTitle: 'Real Madrid vs FC Barcelona',
          competition: 'La Liga',
          type: 'goal',
          minute: 77,
          team: 'FC Barcelona',
          teamSide: 'away',
          player: 'Lamine Yamal',
          secondaryPlayer: 'Raphinha',
          description: 'Rocket right-foot strike into the roof of the net by the 17-year old wonderkid!',
          scoreAfter: '0 - 3',
          timestamp: formatTime(15)
        },
        {
          id: 'ec-5',
          matchId: 'laliga-1',
          matchTitle: 'Real Madrid vs FC Barcelona',
          competition: 'La Liga',
          type: 'goal',
          minute: 84,
          team: 'FC Barcelona',
          teamSide: 'away',
          player: 'Raphinha',
          secondaryPlayer: 'Iñigo Martínez',
          description: 'Deft chip over the goalkeeper following a long clearance.',
          scoreAfter: '0 - 4',
          timestamp: formatTime(5)
        }
      ];
      clasicoEvents.forEach(evt => this.stack.push(evt));
    } else {
      // UCL Final
      const uclEvents: FootballMatchEvent[] = [
        {
          id: 'ucl-1',
          matchId: 'ucl-1',
          matchTitle: 'Real Madrid vs Borussia Dortmund',
          competition: 'UEFA Champions League',
          type: 'yellow_card',
          minute: 35,
          team: 'Real Madrid',
          teamSide: 'home',
          player: 'Vinícius Júnior',
          description: 'Late sliding tackle near touchline.',
          timestamp: formatTime(55)
        },
        {
          id: 'ucl-2',
          matchId: 'ucl-1',
          matchTitle: 'Real Madrid vs Borussia Dortmund',
          competition: 'UEFA Champions League',
          type: 'goal',
          minute: 74,
          team: 'Real Madrid',
          teamSide: 'home',
          player: 'Dani Carvajal',
          secondaryPlayer: 'Toni Kroos',
          description: 'Header from Toni Kroos corner at the near post!',
          scoreAfter: '1 - 0',
          timestamp: formatTime(20)
        },
        {
          id: 'ucl-3',
          matchId: 'ucl-1',
          matchTitle: 'Real Madrid vs Borussia Dortmund',
          competition: 'UEFA Champions League',
          type: 'goal',
          minute: 83,
          team: 'Real Madrid',
          teamSide: 'home',
          player: 'Vinícius Júnior',
          secondaryPlayer: 'Jude Bellingham',
          description: 'Composed dink past Kobel to secure the 15th European Crown!',
          scoreAfter: '2 - 0',
          timestamp: formatTime(10)
        }
      ];
      uclEvents.forEach(evt => this.stack.push(evt));
    }
  }
}
