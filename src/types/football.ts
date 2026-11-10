/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Football Data Types & Interfaces
 */

import { FootballMatchEvent } from '../dsa/MatchEventStack';

export type MatchStatus = 'LIVE' | 'HT' | 'FT' | 'NS' | 'ET' | 'PEN' | 'PST' | 'CANC';

export type CompetitionCode = 'PL' | 'CL' | 'PD' | 'BL1' | 'SA' | 'FL1';

export interface Competition {
  id: number | string;
  code: CompetitionCode;
  name: string;
  shortName: string;
  country: string;
  flagUrl: string;
  emblemUrl: string;
  currentMatchday?: number;
  season?: string;
}

export interface Team {
  id: number | string;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  founded?: number;
  venue?: string;
  primaryColor?: string;
}

export interface MatchScore {
  home: number | null;
  away: number | null;
  halfTime?: {
    home: number | null;
    away: number | null;
  } | null;
  extraTime?: {
    home: number | null;
    away: number | null;
  } | null;
  penalties?: {
    home: number | null;
    away: number | null;
  } | null;
}

export interface MatchStatistics {
  possession: [number, number];       // [home, away] e.g. [58, 42]
  shotsTotal: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  passAccuracy: [number, number];
  offsides: [number, number];
  bigChances: [number, number];
  goalkeeperSaves: [number, number];
  xg?: [number, number];              // Expected goals e.g. [1.84, 0.92]
}

export interface PlayerLineup {
  id: string | number;
  name: string;
  number: number;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  grid: {
    x: number; // 0 to 100 on tactical pitch
    y: number; // 0 to 100 on tactical pitch
  };
  captain?: boolean;
  rating?: number;
}

export interface TeamLineup {
  formation: string; // e.g. "4-3-3", "4-2-3-1"
  coach: string;
  startingXI: PlayerLineup[];
  substitutes: PlayerLineup[];
}

export interface MatchLineups {
  home: TeamLineup;
  away: TeamLineup;
}

export interface MatchCommentaryItem {
  id: string;
  minute: number;
  extraMinute?: number;
  type: 'goal' | 'card' | 'sub' | 'chance' | 'whistle' | 'var' | 'info';
  text: string;
  isKeyMoment?: boolean;
  score?: string;
}

export interface Match {
  id: string;
  competition: Competition;
  utcDate: string;
  status: MatchStatus;
  minute?: number;
  extraMinute?: number;
  homeTeam: Team;
  awayTeam: Team;
  score: MatchScore;
  venue: string;
  referee?: string;
  matchday?: number;
  statistics?: MatchStatistics;
  lineups?: MatchLineups;
  events?: FootballMatchEvent[];
  commentary?: MatchCommentaryItem[];
}

export interface StandingRow {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: Array<'W' | 'D' | 'L'>;
}

export interface CompetitionStandings {
  competition: Competition;
  season: string;
  table: StandingRow[];
}

export interface ApiConfig {
  provider: 'football-data-org' | 'api-football' | 'demo-simulated';
  apiKey: string;
  isDemoMode: boolean;
  lastSyncTime?: string;
  refreshIntervalSeconds: number;
}
