/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - University DSA Topic: Round-Robin Tournament Scheduling Algorithm
 * Berger Tables / Polygon Method for Generating Full Season League Fixtures (Matchdays 1 to 38)
 */

import { Competition, Match, MatchStatus, Team } from '../types/football';
import { COMPETITIONS } from '../data/mockFootballData';
import { LEAGUE_TEAMS } from '../data/leagueTeams';

export interface RoundRobinMatchday {
  matchday: number;
  competition: Competition;
  matches: Match[];
}

/**
 * TournamentScheduler Class
 * Algorithmically produces the complete 38-matchday (or 34-matchday) round-robin schedule.
 * Complexity: O(N * M) where N = number of teams, M = number of matchdays.
 */
export class TournamentScheduler {
  /**
   * Generates a deterministic pseudo-random score based on matchday and team IDs
   */
  private static generateScore(matchday: number, homeId: number | string, awayId: number | string): { home: number; away: number } {
    const seed = (Number(homeId) * 17 + Number(awayId) * 31 + matchday * 13) % 100;
    if (seed < 22) return { home: 1, away: 0 };
    if (seed < 38) return { home: 2, away: 1 };
    if (seed < 50) return { home: 1, away: 1 };
    if (seed < 62) return { home: 0, away: 0 };
    if (seed < 74) return { home: 0, away: 2 };
    if (seed < 86) return { home: 3, away: 1 };
    if (seed < 94) return { home: 2, away: 2 };
    return { home: 4, away: 2 };
  }

  /**
   * Generates all matchdays (1 to 38 for 20 teams; 1 to 34 for 18 teams) for a given league
   */
  public static generateFullSeasonSchedule(competitionCode: 'PL' | 'PD' | 'SA' | 'BL1' | 'FL1'): Match[] {
    const competition = COMPETITIONS[competitionCode];
    const teams = LEAGUE_TEAMS[competitionCode] || [];
    const n = teams.length;
    if (n < 2) return [];

    const totalRounds = (n - 1) * 2; // 38 for 20 teams; 34 for 18 teams
    const matchesPerRound = n / 2;
    const allSeasonMatches: Match[] = [];

    // Base start date: Saturday, August 17, 2024
    const seasonStartDate = new Date(Date.now() - 85 * 24 * 3600 * 1000); // ~Matchday 11 is now

    // Rotational array for Berger Polygon algorithm (keep index 0 fixed, rotate 1 .. n-1)
    const indices: number[] = Array.from({ length: n }, (_, i) => i);

    for (let round = 1; round <= totalRounds; round++) {
      const isSecondHalf = round > n - 1;
      const baseRoundIndex = isSecondHalf ? round - (n - 1) : round;

      // Approximate date for this matchday (spaced 7 days apart)
      const roundDate = new Date(seasonStartDate.getTime() + (round - 1) * 7 * 24 * 3600 * 1000);

      // Determine matchday status:
      // Round <= 10: Completed (FT)
      // Round === 11: Current round (contains LIVE or today's games)
      // Round >= 12: Upcoming (NS)
      const isCompleted = round <= 10;
      const isCurrentRound = round === 11;
      const defaultStatus: MatchStatus = isCompleted ? 'FT' : 'NS';

      for (let matchIndex = 0; matchIndex < matchesPerRound; matchIndex++) {
        let team1Index = indices[matchIndex];
        let team2Index = indices[n - 1 - matchIndex];

        // Swap home/away alternately or during second half of the season
        let homeIndex = team1Index;
        let awayIndex = team2Index;

        if (round % 2 === 1) {
          homeIndex = team2Index;
          awayIndex = team1Index;
        }

        if (isSecondHalf) {
          // Invert home/away in second half of the season
          const temp = homeIndex;
          homeIndex = awayIndex;
          awayIndex = temp;
        }

        const homeTeam = teams[homeIndex];
        const awayTeam = teams[awayIndex];

        // Kickoff times stagger across Saturday / Sunday
        const kickoffHour = 15 + ((matchIndex % 3) * 2.5); // 15:00, 17:30, 20:00
        const matchDateTime = new Date(roundDate);
        matchDateTime.setHours(Math.floor(kickoffHour), (kickoffHour % 1) * 60, 0, 0);

        let matchScore = { home: null as number | null, away: null as number | null };
        if (isCompleted) {
          const s = this.generateScore(round, homeTeam.id, awayTeam.id);
          matchScore = { home: s.home, away: s.away };
        }

        const matchId = `fixture-${competitionCode.toLowerCase()}-md${round}-${matchIndex + 1}`;

        allSeasonMatches.push({
          id: matchId,
          competition,
          utcDate: matchDateTime.toISOString(),
          status: isCurrentRound && matchIndex === 0 ? 'LIVE' : defaultStatus,
          minute: isCurrentRound && matchIndex === 0 ? 76 : undefined,
          homeTeam,
          awayTeam,
          score: matchScore,
          venue: homeTeam.venue || 'Stadium',
          referee: 'Premier League Referee',
          matchday: round,
          statistics: isCompleted ? {
            possession: [54, 46],
            shotsTotal: [14, 10],
            shotsOnTarget: [5, 4],
            corners: [6, 4],
            fouls: [10, 12],
            yellowCards: [2, 3],
            redCards: [0, 0],
            passAccuracy: [85, 82],
            offsides: [2, 1],
            bigChances: [2, 1],
            goalkeeperSaves: [3, 4]
          } : undefined
        });
      }

      // Rotate indices according to Round-Robin Polygon Method:
      // Keep index 0 fixed, rotate elements 1 .. n-1 circularly
      const last = indices.pop()!;
      indices.splice(1, 0, last);
    }

    return allSeasonMatches;
  }
}
