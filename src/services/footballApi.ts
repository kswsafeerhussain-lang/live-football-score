/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Football Data API Service
 * Handles live score retrieval, external API proxying, dynamic live match simulation,
 * and teacher demonstration referee actions (Simulate Goal, Card, VAR Rollback).
 */

import { Match, MatchStatus, CompetitionStandings, ApiConfig, CompetitionCode } from '../types/football';
import { COMPETITIONS, generateComprehensiveMatches, LEAGUE_STANDINGS, getDateString } from '../data/mockFootballData';
import { FootballMatchEvent } from '../dsa/MatchEventStack';

import { TournamentScheduler } from '../dsa/TournamentScheduler';

const API_CONFIG_STORAGE_KEY = 'goalpulse_api_config';

export class FootballApiService {
  private config: ApiConfig;
  private matches: Match[];
  private fullSeasonFixturesCache: Record<string, Match[]> = {};
  private onLiveEventCallback?: (event: FootballMatchEvent) => void;
  private simulationInterval?: number;

  constructor() {
    this.config = this.loadConfig();
    this.matches = generateComprehensiveMatches();
    this.startSimulationEngine();
  }

  /**
   * Retrieves all 38 (or 34) matchdays of fixtures for the given domestic league
   */
  public getFullSeasonFixtures(competitionCode: 'PL' | 'PD' | 'SA' | 'BL1' | 'FL1'): Match[] {
    if (!this.fullSeasonFixturesCache[competitionCode]) {
      this.fullSeasonFixturesCache[competitionCode] = TournamentScheduler.generateFullSeasonSchedule(competitionCode);
    }
    return this.fullSeasonFixturesCache[competitionCode];
  }

  /**
   * Retrieves matches for a specific matchday (1 to 38)
   */
  public getFixturesByMatchday(competitionCode: 'PL' | 'PD' | 'SA' | 'BL1' | 'FL1', matchday: number): Match[] {
    const all = this.getFullSeasonFixtures(competitionCode);
    return all.filter(m => m.matchday === matchday);
  }

  /**
   * Load API configuration from local storage or defaults
   */
  public loadConfig(): ApiConfig {
    try {
      const stored = localStorage.getItem(API_CONFIG_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // LocalStorage unavailable fallback
    }

    return {
      provider: 'demo-simulated',
      apiKey: '',
      isDemoMode: true,
      refreshIntervalSeconds: 30,
      lastSyncTime: new Date().toLocaleTimeString()
    };
  }

  /**
   * Save API Configuration
   */
  public saveConfig(newConfig: Partial<ApiConfig>): ApiConfig {
    this.config = {
      ...this.config,
      ...newConfig,
      isDemoMode: !newConfig.apiKey || newConfig.apiKey.trim().length === 0,
      lastSyncTime: new Date().toLocaleTimeString()
    };

    try {
      localStorage.setItem(API_CONFIG_STORAGE_KEY, JSON.stringify(this.config));
    } catch {
      // Ignore
    }

    return this.config;
  }

  public getConfig(): ApiConfig {
    return { ...this.config };
  }

  /**
   * Register a listener for new live events (to push directly to Stack)
   */
  public setLiveEventListener(callback: (event: FootballMatchEvent) => void): void {
    this.onLiveEventCallback = callback;
  }

  /**
   * Retrieve matches with filtering by competition, status, date, or search query
   */
  public async getMatches(params?: {
    competition?: CompetitionCode | string;
    status?: MatchStatus | 'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED';
    date?: string; // YYYY-MM-DD
    searchQuery?: string;
  }): Promise<{ matches: Match[]; isDemoMode: boolean; lastSyncTime: string }> {
    let result = [...this.matches];

    // 1. Filter by Specific Date (YYYY-MM-DD)
    if (params?.date && params.date.trim().length > 0) {
      result = result.filter(m => {
        try {
          const matchDateStr = new Date(m.utcDate).toISOString().split('T')[0];
          return matchDateStr === params.date;
        } catch {
          return true;
        }
      });
    }

    // 2. Filter by competition
    if (params?.competition && params.competition !== 'ALL') {
      result = result.filter(m => m.competition.code === params.competition);
    }

    // 3. Filter by status category
    if (params?.status && params.status !== 'ALL') {
      if (params.status === 'LIVE') {
        result = result.filter(m => ['LIVE', 'HT', 'ET', 'PEN'].includes(m.status));
      } else if (params.status === 'UPCOMING') {
        result = result.filter(m => m.status === 'NS');
      } else if (params.status === 'FINISHED') {
        result = result.filter(m => m.status === 'FT');
      } else {
        result = result.filter(m => m.status === params.status);
      }
    }

    // 4. Filter by search query
    if (params?.searchQuery && params.searchQuery.trim().length > 0) {
      const q = params.searchQuery.toLowerCase();
      result = result.filter(m => 
        m.homeTeam.name.toLowerCase().includes(q) ||
        m.awayTeam.name.toLowerCase().includes(q) ||
        m.competition.name.toLowerCase().includes(q) ||
        m.venue.toLowerCase().includes(q)
      );
    }

    // If an external API key is present and configured for live fetching:
    if (!this.config.isDemoMode && this.config.apiKey) {
      try {
        const liveApiMatches = await this.fetchFromExternalApi();
        if (liveApiMatches && liveApiMatches.length > 0) {
          return {
            matches: liveApiMatches,
            isDemoMode: false,
            lastSyncTime: new Date().toLocaleTimeString()
          };
        }
      } catch (err) {
        console.warn('Real API failed, fallback to local synchronized cache:', err);
      }
    }

    return {
      matches: result,
      isDemoMode: this.config.isDemoMode,
      lastSyncTime: new Date().toLocaleTimeString()
    };
  }

  /**
   * Get single match by ID
   */
  public async getMatchById(id: string): Promise<Match | undefined> {
    return this.matches.find(m => m.id === id);
  }

  /**
   * Get competition standings
   */
  public async getStandings(competitionCode: CompetitionCode | string): Promise<CompetitionStandings | undefined> {
    return LEAGUE_STANDINGS[competitionCode] || LEAGUE_STANDINGS.PL;
  }

  /**
   * Get all supported competitions
   */
  public getCompetitions() {
    return Object.values(COMPETITIONS);
  }

  /**
   * TEACHER DEMONSTRATION ACTION 1: Trigger Live Goal
   * Increments score, pushes event to Stack, updates commentary, and alerts subscribers.
   */
  public simulateGoal(
    matchId: string, 
    side: 'home' | 'away' = 'home', 
    customPlayer?: string
  ): FootballMatchEvent | undefined {
    const matchIndex = this.matches.findIndex(m => m.id === matchId);
    if (matchIndex === -1) return undefined;

    const match = this.matches[matchIndex];
    const currentHome = match.score.home ?? 0;
    const currentAway = match.score.away ?? 0;

    const newHome = side === 'home' ? currentHome + 1 : currentHome;
    const newAway = side === 'away' ? currentAway + 1 : currentAway;
    match.score.home = newHome;
    match.score.away = newAway;

    const currentMin = match.minute || 75;
    const scoringTeam = side === 'home' ? match.homeTeam : match.awayTeam;
    const defaultScorer = side === 'home' ? (match.homeTeam.shortName === 'Man City' ? 'Erling Haaland' : 'Kylian Mbappé') : 'Bukayo Saka';
    const player = customPlayer || defaultScorer;

    const event: FootballMatchEvent = {
      id: `live-goal-${Date.now()}`,
      matchId: match.id,
      matchTitle: `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
      competition: match.competition.name,
      type: 'goal',
      minute: currentMin,
      team: scoringTeam.name,
      teamSide: side,
      player,
      description: `GOAL! ${player} strikes decisively in the ${currentMin}' minute to make it ${newHome}-${newAway}!`,
      scoreAfter: `${newHome} - ${newAway}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (!match.events) match.events = [];
    match.events.unshift(event);

    if (!match.commentary) match.commentary = [];
    match.commentary.unshift({
      id: `comm-${Date.now()}`,
      minute: currentMin,
      type: 'goal',
      text: `GOOOAAALLL! ${scoringTeam.name} score! ${player} finds the back of the net with an exquisite strike!`,
      isKeyMoment: true,
      score: `${newHome}-${newAway}`
    });

    if (this.onLiveEventCallback) {
      this.onLiveEventCallback(event);
    }

    return event;
  }

  /**
   * TEACHER DEMONSTRATION ACTION 2: Trigger Live Card (Yellow / Red)
   */
  public simulateCard(
    matchId: string, 
    type: 'yellow_card' | 'red_card', 
    side: 'home' | 'away' = 'away',
    customPlayer?: string
  ): FootballMatchEvent | undefined {
    const match = this.matches.find(m => m.id === matchId);
    if (!match) return undefined;

    const team = side === 'home' ? match.homeTeam : match.awayTeam;
    const currentMin = match.minute || 65;
    const player = customPlayer || (side === 'home' ? 'Center Back' : 'Midfielder');

    const event: FootballMatchEvent = {
      id: `live-card-${Date.now()}`,
      matchId: match.id,
      matchTitle: `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
      competition: match.competition.name,
      type,
      minute: currentMin,
      team: team.name,
      teamSide: side,
      player,
      description: `${type === 'red_card' ? 'RED CARD' : 'Yellow Card'}: ${player} penalised by referee in the ${currentMin}' minute.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (!match.events) match.events = [];
    match.events.unshift(event);

    if (!match.commentary) match.commentary = [];
    match.commentary.unshift({
      id: `comm-${Date.now()}`,
      minute: currentMin,
      type: 'card',
      text: `${type === 'red_card' ? 'RED CARD!' : 'BOOKING:'} ${player} (${team.name}) is shown the ${type === 'red_card' ? 'red' : 'yellow'} card.`,
      isKeyMoment: type === 'red_card'
    });

    if (this.onLiveEventCallback) {
      this.onLiveEventCallback(event);
    }

    return event;
  }

  /**
   * TEACHER DEMONSTRATION ACTION 3: VAR Overturn & Rollback
   * Reverts the most recent goal, decrements score, and adds VAR overturn record.
   */
  public simulateVarOverturn(matchId: string, reason: string = 'Offside confirmed by VAR review'): boolean {
    const match = this.matches.find(m => m.id === matchId);
    if (!match || !match.events || match.events.length === 0) return false;

    // Find latest goal event in this match
    const latestGoalIndex = match.events.findIndex(e => e.type === 'goal' && !e.isOverturnedByVAR);
    if (latestGoalIndex !== -1) {
      const goalEvent = match.events[latestGoalIndex];
      goalEvent.isOverturnedByVAR = true;

      // Revert score!
      if (goalEvent.teamSide === 'home' && (match.score.home ?? 0) > 0) {
        match.score.home = (match.score.home ?? 1) - 1;
      } else if (goalEvent.teamSide === 'away' && (match.score.away ?? 0) > 0) {
        match.score.away = (match.score.away ?? 1) - 1;
      }

      // Add commentary
      if (!match.commentary) match.commentary = [];
      match.commentary.unshift({
        id: `var-comm-${Date.now()}`,
        minute: match.minute || 80,
        type: 'var',
        text: `VAR DECISION OVERRULED: ${goalEvent.player}'s goal has been CANCELLED! ${reason}. Score reverts to ${match.score.home}-${match.score.away}.`,
        isKeyMoment: true,
        score: `${match.score.home}-${match.score.away}`
      });

      return true;
    }

    return false;
  }

  /**
   * Real Football-Data.org API fetcher (when user inputs their token)
   */
  private async fetchFromExternalApi(): Promise<Match[] | null> {
    try {
      const response = await fetch('https://api.football-data.org/v4/matches', {
        headers: {
          'X-Auth-Token': this.config.apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.matches || !Array.isArray(data.matches)) {
        return null;
      }

      return data.matches.map((item: any) => ({
        id: `fd-${item.id}`,
        competition: {
          id: item.competition.id,
          code: item.competition.code || 'PL',
          name: item.competition.name,
          shortName: item.competition.name,
          country: item.area?.name || 'International',
          flagUrl: item.area?.flag || 'https://flagcdn.com/w40/eu.png',
          emblemUrl: item.competition.emblem || 'https://crests.football-data.org/2021.png',
          currentMatchday: item.matchday
        },
        utcDate: item.utcDate,
        status: this.mapExternalStatus(item.status),
        minute: item.minute || (item.status === 'IN_PLAY' ? 50 : undefined),
        homeTeam: {
          id: item.homeTeam.id,
          name: item.homeTeam.name,
          shortName: item.homeTeam.shortName || item.homeTeam.name,
          tla: item.homeTeam.tla || 'HOM',
          crest: item.homeTeam.crest || 'https://crests.football-data.org/65.png'
        },
        awayTeam: {
          id: item.awayTeam.id,
          name: item.awayTeam.name,
          shortName: item.awayTeam.shortName || item.awayTeam.name,
          tla: item.awayTeam.tla || 'AWY',
          crest: item.awayTeam.crest || 'https://crests.football-data.org/57.png'
        },
        score: {
          home: item.score?.fullTime?.home ?? item.score?.halfTime?.home ?? 0,
          away: item.score?.fullTime?.away ?? item.score?.halfTime?.away ?? 0,
          halfTime: {
            home: item.score?.halfTime?.home ?? 0,
            away: item.score?.halfTime?.away ?? 0
          }
        },
        venue: item.venue || 'Stadium'
      }));
    } catch {
      return null;
    }
  }

  private mapExternalStatus(status: string): MatchStatus {
    switch (status) {
      case 'IN_PLAY':
        return 'LIVE';
      case 'PAUSED':
        return 'HT';
      case 'FINISHED':
        return 'FT';
      case 'TIMED':
      case 'SCHEDULED':
        return 'NS';
      case 'EXTRA_TIME':
        return 'ET';
      case 'PENALTY_SHOOTOUT':
        return 'PEN';
      default:
        return 'NS';
    }
  }

  /**
   * Dynamic Football Simulation Engine:
   * Increments match minutes for LIVE games, periodically creates realistic shots,
   * cards, and dramatic goals, and triggers stack events in real-time.
   */
  private startSimulationEngine(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }

    // Tick every 20 seconds to simulate live match progression
    this.simulationInterval = window.setInterval(() => {
      let eventGenerated = false;

      this.matches = this.matches.map(match => {
        if (match.status !== 'LIVE' || !match.minute) return match;

        const nextMinute = match.minute + 1;

        // If match reaches 45' -> Half Time
        if (nextMinute === 45 && !match.score.halfTime) {
          return {
            ...match,
            status: 'HT' as MatchStatus,
            minute: 45,
            score: {
              ...match.score,
              halfTime: { home: match.score.home, away: match.score.away }
            }
          };
        }

        // If match reaches 90+ -> Full Time
        if (nextMinute >= 93) {
          return {
            ...match,
            status: 'FT' as MatchStatus,
            minute: 90,
            extraMinute: 3
          };
        }

        // Occasional live occurrence generator (approx 20% chance per tick)
        const randomRoll = Math.random();
        if (randomRoll < 0.20 && !eventGenerated) {
          eventGenerated = true;
          this.triggerSimulatedEvent(match, nextMinute);
        }

        return {
          ...match,
          minute: nextMinute
        };
      });
    }, 20000);
  }

  /**
   * Simulates a live event (Goal, Yellow Card, Sub, or VAR) and notifies subscribers
   */
  private triggerSimulatedEvent(match: Match, minute: number): void {
    const isHome = Math.random() > 0.45;
    const team = isHome ? match.homeTeam : match.awayTeam;
    const teamSide: 'home' | 'away' = isHome ? 'home' : 'away';

    const rand = Math.random();
    const type = rand < 0.35 ? 'yellow_card' : rand < 0.7 ? 'substitution' : rand < 0.9 ? 'goal' : 'var_decision';

    let description = '';
    let player = 'Team Player';

    if (type === 'goal') {
      const currentHome = match.score.home ?? 0;
      const currentAway = match.score.away ?? 0;
      if (isHome) {
        match.score.home = currentHome + 1;
      } else {
        match.score.away = currentAway + 1;
      }
      player = isHome ? (match.homeTeam.shortName === 'Man City' ? 'Phil Foden' : 'Kylian Mbappé') : 'Lamine Yamal';
      description = `GOAL! ${player} scores with a clinical finish in the ${minute}' minute!`;
    } else if (type === 'yellow_card') {
      player = isHome ? 'Defensive Midfielder' : 'Center Back';
      description = `Yellow card shown to ${player} for a tactical foul in the ${minute}' minute.`;
    } else if (type === 'substitution') {
      player = 'Impact Sub';
      description = `Substitution for ${team.name} in the ${minute}' minute.`;
    } else {
      player = 'Referee & VAR';
      description = `VAR Review in the ${minute}' minute: Penalty check completed - play resumes.`;
    }

    const event: FootballMatchEvent = {
      id: `sim-${Date.now()}`,
      matchId: match.id,
      matchTitle: `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
      competition: match.competition.name,
      type,
      minute,
      team: team.name,
      teamSide,
      player,
      description,
      scoreAfter: `${match.score.home ?? 0} - ${match.score.away ?? 0}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (!match.events) match.events = [];
    match.events.unshift(event);

    if (this.onLiveEventCallback) {
      this.onLiveEventCallback(event);
    }
  }

  public cleanup(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
  }
}

// Global Singleton Instance
export const footballApi = new FootballApiService();
