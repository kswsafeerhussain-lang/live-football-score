/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Authentic Football Competition, Team & Match Dataset
 * European Football Season: Premier League, Champions League, La Liga, Bundesliga, Serie A, Ligue 1
 */

import { Competition, Match, CompetitionStandings, Team } from '../types/football';

export const COMPETITIONS: Record<string, Competition> = {
  PL: {
    id: 2021,
    code: 'PL',
    name: 'Premier League',
    shortName: 'EPL',
    country: 'England',
    flagUrl: 'https://flagcdn.com/w40/gb-eng.png',
    emblemUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    currentMatchday: 11,
    season: '2024/25'
  },
  CL: {
    id: 2001,
    code: 'CL',
    name: 'UEFA Champions League',
    shortName: 'UCL',
    country: 'Europe',
    flagUrl: 'https://flagcdn.com/w40/eu.png',
    emblemUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Champions_League_logo_2.svg',
    currentMatchday: 4,
    season: '2024/25'
  },
  PD: {
    id: 2014,
    code: 'PD',
    name: 'La Liga',
    shortName: 'La Liga',
    country: 'Spain',
    flagUrl: 'https://flagcdn.com/w40/es.png',
    emblemUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/LaLiga_logo_2023.svg',
    currentMatchday: 12,
    season: '2024/25'
  },
  BL1: {
    id: 2002,
    code: 'BL1',
    name: 'Bundesliga',
    shortName: 'Bundesliga',
    country: 'Germany',
    flagUrl: 'https://flagcdn.com/w40/de.png',
    emblemUrl: 'https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg',
    currentMatchday: 10,
    season: '2024/25'
  },
  SA: {
    id: 2019,
    code: 'SA',
    name: 'Serie A',
    shortName: 'Serie A',
    country: 'Italy',
    flagUrl: 'https://flagcdn.com/w40/it.png',
    emblemUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Serie_A_logo_%282019%29.svg',
    currentMatchday: 12,
    season: '2024/25'
  },
  FL1: {
    id: 2015,
    code: 'FL1',
    name: 'Ligue 1',
    shortName: 'Ligue 1',
    country: 'France',
    flagUrl: 'https://flagcdn.com/w40/fr.png',
    emblemUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Ligue_1_McDonald%27s_logo.svg',
    currentMatchday: 11,
    season: '2024/25'
  }
};

export const TEAMS: Record<string, Team> = {
  // Premier League
  MCI: {
    id: 65,
    name: 'Manchester City',
    shortName: 'Man City',
    tla: 'MCI',
    crest: 'https://crests.football-data.org/65.png',
    venue: 'Etihad Stadium',
    primaryColor: '#6CABDD'
  },
  ARS: {
    id: 57,
    name: 'Arsenal FC',
    shortName: 'Arsenal',
    tla: 'ARS',
    crest: 'https://crests.football-data.org/57.png',
    venue: 'Emirates Stadium',
    primaryColor: '#EF0107'
  },
  LIV: {
    id: 64,
    name: 'Liverpool FC',
    shortName: 'Liverpool',
    tla: 'LIV',
    crest: 'https://crests.football-data.org/64.png',
    venue: 'Anfield',
    primaryColor: '#C8102E'
  },
  CHE: {
    id: 61,
    name: 'Chelsea FC',
    shortName: 'Chelsea',
    tla: 'CHE',
    crest: 'https://crests.football-data.org/61.png',
    venue: 'Stamford Bridge',
    primaryColor: '#034694'
  },
  MUN: {
    id: 66,
    name: 'Manchester United',
    shortName: 'Man United',
    tla: 'MUN',
    crest: 'https://crests.football-data.org/66.png',
    venue: 'Old Trafford',
    primaryColor: '#DA291C'
  },
  TOT: {
    id: 73,
    name: 'Tottenham Hotspur',
    shortName: 'Tottenham',
    tla: 'TOT',
    crest: 'https://crests.football-data.org/73.png',
    venue: 'Tottenham Hotspur Stadium',
    primaryColor: '#132257'
  },
  AVL: {
    id: 58,
    name: 'Aston Villa FC',
    shortName: 'Aston Villa',
    tla: 'AVL',
    crest: 'https://crests.football-data.org/58.png',
    venue: 'Villa Park',
    primaryColor: '#670E36'
  },
  NEW: {
    id: 67,
    name: 'Newcastle United',
    shortName: 'Newcastle',
    tla: 'NEW',
    crest: 'https://crests.football-data.org/67.png',
    venue: "St. James' Park",
    primaryColor: '#241F20'
  },
  BHA: {
    id: 397,
    name: 'Brighton & Hove Albion',
    shortName: 'Brighton',
    tla: 'BHA',
    crest: 'https://crests.football-data.org/397.png',
    venue: 'Amex Stadium',
    primaryColor: '#0057B8'
  },

  // La Liga
  RMA: {
    id: 86,
    name: 'Real Madrid CF',
    shortName: 'Real Madrid',
    tla: 'RMA',
    crest: 'https://crests.football-data.org/86.png',
    venue: 'Santiago Bernabéu',
    primaryColor: '#EEEEEF'
  },
  BAR: {
    id: 81,
    name: 'FC Barcelona',
    shortName: 'Barcelona',
    tla: 'BAR',
    crest: 'https://crests.football-data.org/81.png',
    venue: 'Estadi Olímpic Lluís Companys',
    primaryColor: '#004D98'
  },
  ATM: {
    id: 78,
    name: 'Atlético de Madrid',
    shortName: 'Atlético',
    tla: 'ATM',
    crest: 'https://crests.football-data.org/78.png',
    venue: 'Cívitas Metropolitano',
    primaryColor: '#CB3524'
  },
  ATH: {
    id: 77,
    name: 'Athletic Club',
    shortName: 'Athletic Club',
    tla: 'ATH',
    crest: 'https://crests.football-data.org/77.png',
    venue: 'San Mamés',
    primaryColor: '#EE2524'
  },
  RSO: {
    id: 92,
    name: 'Real Sociedad',
    shortName: 'Real Sociedad',
    tla: 'RSO',
    crest: 'https://crests.football-data.org/92.png',
    venue: 'Reale Arena',
    primaryColor: '#0067B1'
  },

  // Bundesliga
  BAY: {
    id: 5,
    name: 'FC Bayern München',
    shortName: 'Bayern Munich',
    tla: 'BAY',
    crest: 'https://crests.football-data.org/5.png',
    venue: 'Allianz Arena',
    primaryColor: '#DC052D'
  },
  B04: {
    id: 3,
    name: 'Bayer 04 Leverkusen',
    shortName: 'Leverkusen',
    tla: 'B04',
    crest: 'https://crests.football-data.org/3.png',
    venue: 'BayArena',
    primaryColor: '#E32221'
  },
  BVB: {
    id: 4,
    name: 'Borussia Dortmund',
    shortName: 'Dortmund',
    tla: 'BVB',
    crest: 'https://crests.football-data.org/4.png',
    venue: 'Signal Iduna Park',
    primaryColor: '#FDE100'
  },
  RBL: {
    id: 721,
    name: 'RB Leipzig',
    shortName: 'RB Leipzig',
    tla: 'RBL',
    crest: 'https://crests.football-data.org/721.png',
    venue: 'Red Bull Arena',
    primaryColor: '#001F48'
  },
  STP: {
    id: 19,
    name: 'FC St. Pauli',
    shortName: 'St. Pauli',
    tla: 'STP',
    crest: 'https://crests.football-data.org/19.png',
    venue: 'Millerntor-Stadion',
    primaryColor: '#5B371F'
  },

  // Serie A
  INT: {
    id: 108,
    name: 'FC Internazionale Milano',
    shortName: 'Inter',
    tla: 'INT',
    crest: 'https://crests.football-data.org/108.png',
    venue: 'San Siro',
    primaryColor: '#010E80'
  },
  JUV: {
    id: 109,
    name: 'Juventus FC',
    shortName: 'Juventus',
    tla: 'JUV',
    crest: 'https://crests.football-data.org/109.png',
    venue: 'Allianz Stadium',
    primaryColor: '#000000'
  },
  MIL: {
    id: 98,
    name: 'AC Milan',
    shortName: 'AC Milan',
    tla: 'MIL',
    crest: 'https://crests.football-data.org/98.png',
    venue: 'San Siro',
    primaryColor: '#FB090B'
  },
  NAP: {
    id: 113,
    name: 'SSC Napoli',
    shortName: 'Napoli',
    tla: 'NAP',
    crest: 'https://crests.football-data.org/113.png',
    venue: 'Stadio Diego Armando Maradona',
    primaryColor: '#12A0DE'
  },
  TOR: {
    id: 586,
    name: 'Torino FC',
    shortName: 'Torino',
    tla: 'TOR',
    crest: 'https://crests.football-data.org/586.png',
    venue: 'Stadio Olimpico Grande Torino',
    primaryColor: '#800000'
  },

  // Ligue 1
  PSG: {
    id: 524,
    name: 'Paris Saint-Germain FC',
    shortName: 'PSG',
    tla: 'PSG',
    crest: 'https://crests.football-data.org/524.png',
    venue: 'Parc des Princes',
    primaryColor: '#004170'
  },
  ASM: {
    id: 548,
    name: 'AS Monaco FC',
    shortName: 'Monaco',
    tla: 'ASM',
    crest: 'https://crests.football-data.org/548.png',
    venue: 'Stade Louis II',
    primaryColor: '#E2001A'
  },
  OM: {
    id: 516,
    name: 'Olympique de Marseille',
    shortName: 'Marseille',
    tla: 'OM',
    crest: 'https://crests.football-data.org/516.png',
    venue: 'Orange Vélodrome',
    primaryColor: '#2FAEE0'
  },
  ANG: {
    id: 532,
    name: 'Angers SCO',
    shortName: 'Angers',
    tla: 'ANG',
    crest: 'https://crests.football-data.org/532.png',
    venue: 'Stade Raymond Kopa',
    primaryColor: '#000000'
  },

  // Champions League Opponents
  SCP: {
    id: 498,
    name: 'Sporting Clube de Portugal',
    shortName: 'Sporting CP',
    tla: 'SCP',
    crest: 'https://crests.football-data.org/498.png',
    venue: 'Estádio José Alvalade',
    primaryColor: '#008057'
  },
  BEN: {
    id: 1903,
    name: 'SL Benfica',
    shortName: 'Benfica',
    tla: 'BEN',
    crest: 'https://crests.football-data.org/1903.png',
    venue: 'Estádio da Luz',
    primaryColor: '#E11B22'
  }
};

/**
 * Helpers to generate dynamic relative dates for Yesterday, Today, Tomorrow
 */
export const getDateString = (offsetDays: number = 0): string => {
  const d = new Date(Date.now() + offsetDays * 24 * 3600 * 1000);
  return d.toISOString().split('T')[0];
};

export const getIsoDateTime = (offsetDays: number, hour: number, minute: number): string => {
  const d = new Date(Date.now() + offsetDays * 24 * 3600 * 1000);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

/**
 * GENERATE COMPREHENSIVE MATCHES ACROSS YESTERDAY, TODAY, AND TOMORROW
 */
export const generateComprehensiveMatches = (): Match[] => {
  return [
    // ==========================================================
    // YESTERDAY MATCHES (All Finished Results - Status: FT)
    // ==========================================================
    {
      id: 'match-yest-1',
      competition: COMPETITIONS.PL,
      utcDate: getIsoDateTime(-1, 20, 0),
      status: 'FT',
      homeTeam: TEAMS.LIV,
      awayTeam: TEAMS.AVL,
      score: {
        home: 2,
        away: 0,
        halfTime: { home: 1, away: 0 }
      },
      venue: 'Anfield, Liverpool',
      referee: 'David Coote',
      matchday: 11,
      statistics: {
        possession: [63, 37],
        shotsTotal: [14, 9],
        shotsOnTarget: [5, 2],
        corners: [4, 4],
        fouls: [10, 12],
        yellowCards: [1, 3],
        redCards: [0, 0],
        passAccuracy: [88, 81],
        offsides: [1, 2],
        bigChances: [3, 1],
        goalkeeperSaves: [2, 3],
        xg: [1.95, 0.72]
      },
      events: [
        {
          id: 'ev-yest-1-1',
          matchId: 'match-yest-1',
          matchTitle: 'Liverpool vs Aston Villa',
          competition: 'Premier League',
          type: 'goal',
          minute: 20,
          team: 'Liverpool',
          teamSide: 'home',
          player: 'Darwin Núñez',
          secondaryPlayer: 'Mohamed Salah',
          description: 'Lightning-fast counter-attack! Salah slips Núñez who rounds Martinez and scores.',
          scoreAfter: '1 - 0',
          timestamp: 'Yesterday 20:20'
        },
        {
          id: 'ev-yest-1-2',
          matchId: 'match-yest-1',
          matchTitle: 'Liverpool vs Aston Villa',
          competition: 'Premier League',
          type: 'goal',
          minute: 84,
          team: 'Liverpool',
          teamSide: 'home',
          player: 'Mohamed Salah',
          description: 'Salah bursts into the box and dinks delicately over the goalkeeper to seal victory!',
          scoreAfter: '2 - 0',
          timestamp: 'Yesterday 21:44'
        }
      ],
      commentary: [
        { id: 'c-y1-1', minute: 90, type: 'whistle', text: 'Full Time at Anfield! Liverpool maintain their grip at the Premier League summit with a composed 2-0 win over Aston Villa.' },
        { id: 'c-y1-2', minute: 84, type: 'goal', text: 'GOAL! Liverpool 2, Aston Villa 0. Mohamed Salah seals all 3 points!', isKeyMoment: true, score: '2-0' }
      ]
    },
    {
      id: 'match-yest-2',
      competition: COMPETITIONS.PD,
      utcDate: getIsoDateTime(-1, 21, 0),
      status: 'FT',
      homeTeam: TEAMS.RSO,
      awayTeam: TEAMS.BAR,
      score: {
        home: 1,
        away: 0,
        halfTime: { home: 1, away: 0 }
      },
      venue: 'Reale Arena, San Sebastián',
      referee: 'Guillermo Cuadra Fernández',
      matchday: 13,
      statistics: {
        possession: [38, 62],
        shotsTotal: [14, 11],
        shotsOnTarget: [6, 0],
        corners: [7, 5],
        fouls: [17, 13],
        yellowCards: [3, 2],
        redCards: [0, 0],
        passAccuracy: [79, 87],
        offsides: [2, 4],
        bigChances: [4, 0],
        goalkeeperSaves: [0, 5],
        xg: [2.1, 0.58]
      },
      events: [
        {
          id: 'ev-yest-2-1',
          matchId: 'match-yest-2',
          matchTitle: 'Real Sociedad vs FC Barcelona',
          competition: 'La Liga',
          type: 'var_decision',
          minute: 13,
          team: 'FC Barcelona',
          teamSide: 'away',
          player: 'Robert Lewandowski',
          description: 'VAR Review: Goal disallowed for a marginal offside in the buildup.',
          timestamp: 'Yesterday 21:14'
        },
        {
          id: 'ev-yest-2-2',
          matchId: 'match-yest-2',
          matchTitle: 'Real Sociedad vs FC Barcelona',
          competition: 'La Liga',
          type: 'goal',
          minute: 33,
          team: 'Real Sociedad',
          teamSide: 'home',
          player: 'Sheraldo Becker',
          secondaryPlayer: 'Luka Sučić',
          description: 'Becker pounces on a flicked header and slides it into the bottom far corner!',
          scoreAfter: '1 - 0',
          timestamp: 'Yesterday 21:34'
        }
      ]
    },
    {
      id: 'match-yest-3',
      competition: COMPETITIONS.PL,
      utcDate: getIsoDateTime(-1, 17, 30),
      status: 'FT',
      homeTeam: TEAMS.BHA,
      awayTeam: TEAMS.MCI,
      score: {
        home: 2,
        away: 1,
        halfTime: { home: 0, away: 1 }
      },
      venue: 'Amex Stadium, Brighton',
      referee: 'Robert Jones',
      matchday: 11,
      statistics: {
        possession: [40, 60],
        shotsTotal: [15, 15],
        shotsOnTarget: [4, 6],
        corners: [3, 8],
        fouls: [11, 7],
        yellowCards: [2, 2],
        redCards: [0, 0],
        passAccuracy: [82, 89],
        offsides: [1, 2],
        bigChances: [3, 2],
        goalkeeperSaves: [5, 2],
        xg: [1.88, 1.45]
      },
      events: [
        {
          id: 'ev-yest-3-1',
          matchId: 'match-yest-3',
          matchTitle: 'Brighton vs Manchester City',
          competition: 'Premier League',
          type: 'goal',
          minute: 23,
          team: 'Manchester City',
          teamSide: 'away',
          player: 'Erling Haaland',
          secondaryPlayer: 'Mateo Kovačić',
          description: 'Haaland pounces on a rebound and prods past Verbruggen.',
          scoreAfter: '0 - 1',
          timestamp: 'Yesterday 17:53'
        },
        {
          id: 'ev-yest-3-2',
          matchId: 'match-yest-3',
          matchTitle: 'Brighton vs Manchester City',
          competition: 'Premier League',
          type: 'goal',
          minute: 78,
          team: 'Brighton',
          teamSide: 'home',
          player: 'João Pedro',
          description: 'Chaotic goalmouth scramble ends with Pedro firing into the net!',
          scoreAfter: '1 - 1',
          timestamp: 'Yesterday 19:08'
        },
        {
          id: 'ev-yest-3-3',
          matchId: 'match-yest-3',
          matchTitle: 'Brighton vs Manchester City',
          competition: 'Premier League',
          type: 'goal',
          minute: 83,
          team: 'Brighton',
          teamSide: 'home',
          player: "Matt O'Riley",
          secondaryPlayer: 'João Pedro',
          description: "Sensational comeback! O'Riley clips coolly past Ederson for the winner!",
          scoreAfter: '2 - 1',
          timestamp: 'Yesterday 19:13'
        }
      ]
    },
    {
      id: 'match-yest-4',
      competition: COMPETITIONS.BL1,
      utcDate: getIsoDateTime(-1, 15, 30),
      status: 'FT',
      homeTeam: TEAMS.STP,
      awayTeam: TEAMS.BAY,
      score: {
        home: 0,
        away: 1,
        halfTime: { home: 0, away: 1 }
      },
      venue: 'Millerntor-Stadion, Hamburg',
      referee: 'Timo Gerach',
      matchday: 10,
      statistics: {
        possession: [29, 71],
        shotsTotal: [3, 16],
        shotsOnTarget: [0, 6],
        corners: [2, 10],
        fouls: [10, 8],
        yellowCards: [2, 1],
        redCards: [0, 0],
        passAccuracy: [72, 92],
        offsides: [0, 1],
        bigChances: [0, 3],
        goalkeeperSaves: [5, 0],
        xg: [0.12, 1.85]
      },
      events: [
        {
          id: 'ev-yest-4-1',
          matchId: 'match-yest-4',
          matchTitle: 'St. Pauli vs Bayern Munich',
          competition: 'Bundesliga',
          type: 'goal',
          minute: 22,
          team: 'Bayern Munich',
          teamSide: 'away',
          player: 'Jamal Musiala',
          description: 'WORLDIE! Musiala robs possession and sends a 30-yard dipping rocket off the underside of the crossbar!',
          scoreAfter: '0 - 1',
          timestamp: 'Yesterday 15:52'
        }
      ]
    },
    {
      id: 'match-yest-5',
      competition: COMPETITIONS.SA,
      utcDate: getIsoDateTime(-1, 20, 45),
      status: 'FT',
      homeTeam: TEAMS.JUV,
      awayTeam: TEAMS.TOR,
      score: {
        home: 2,
        away: 0,
        halfTime: { home: 1, away: 0 }
      },
      venue: 'Allianz Stadium, Turin',
      referee: 'Simone Sozza',
      matchday: 12,
      statistics: {
        possession: [55, 45],
        shotsTotal: [13, 6],
        shotsOnTarget: [4, 1],
        corners: [5, 2],
        fouls: [12, 14],
        yellowCards: [1, 3],
        redCards: [0, 0],
        passAccuracy: [87, 82],
        offsides: [1, 0],
        bigChances: [2, 0],
        goalkeeperSaves: [1, 2],
        xg: [1.62, 0.38]
      },
      events: [
        {
          id: 'ev-yest-5-1',
          matchId: 'match-yest-5',
          matchTitle: 'Juventus vs Torino',
          competition: 'Serie A',
          type: 'goal',
          minute: 18,
          team: 'Juventus',
          teamSide: 'home',
          player: 'Timothy Weah',
          description: 'Weah reacts quickest to tap home after Cambiaso’s surging run and parried shot.',
          scoreAfter: '1 - 0',
          timestamp: 'Yesterday 21:03'
        },
        {
          id: 'ev-yest-5-2',
          matchId: 'match-yest-5',
          matchTitle: 'Juventus vs Torino',
          competition: 'Serie A',
          type: 'goal',
          minute: 84,
          team: 'Juventus',
          teamSide: 'home',
          player: 'Kenan Yıldız',
          secondaryPlayer: 'Francisco Conceição',
          description: 'Diving header at the back post from Conceição’s exquisite cross!',
          scoreAfter: '2 - 0',
          timestamp: 'Yesterday 22:29'
        }
      ]
    },
    {
      id: 'match-yest-6',
      competition: COMPETITIONS.FL1,
      utcDate: getIsoDateTime(-1, 21, 0),
      status: 'FT',
      homeTeam: TEAMS.ANG,
      awayTeam: TEAMS.PSG,
      score: {
        home: 2,
        away: 4,
        halfTime: { home: 0, away: 4 }
      },
      venue: 'Stade Raymond Kopa, Angers',
      referee: 'Benoît Millot',
      matchday: 11,
      statistics: {
        possession: [30, 70],
        shotsTotal: [10, 26],
        shotsOnTarget: [3, 12],
        corners: [3, 7],
        fouls: [9, 6],
        yellowCards: [0, 2],
        redCards: [0, 0],
        passAccuracy: [77, 93],
        offsides: [0, 2],
        bigChances: [2, 6],
        goalkeeperSaves: [8, 1],
        xg: [0.95, 3.8]
      },
      events: [
        {
          id: 'ev-yest-6-1',
          matchId: 'match-yest-6',
          matchTitle: 'Angers vs PSG',
          competition: 'Ligue 1',
          type: 'goal',
          minute: 17,
          team: 'PSG',
          teamSide: 'away',
          player: 'Lee Kang-in',
          description: 'First-time finish crossing the goal-line.',
          scoreAfter: '0 - 1',
          timestamp: 'Yesterday 21:17'
        },
        {
          id: 'ev-yest-6-2',
          matchId: 'match-yest-6',
          matchTitle: 'Angers vs PSG',
          competition: 'Ligue 1',
          type: 'goal',
          minute: 20,
          team: 'PSG',
          teamSide: 'away',
          player: 'Lee Kang-in',
          secondaryPlayer: 'Marco Asensio',
          description: 'Second goal in 3 minutes for Lee!',
          scoreAfter: '0 - 2',
          timestamp: 'Yesterday 21:20'
        },
        {
          id: 'ev-yest-6-3',
          matchId: 'match-yest-6',
          matchTitle: 'Angers vs PSG',
          competition: 'Ligue 1',
          type: 'goal',
          minute: 31,
          team: 'PSG',
          teamSide: 'away',
          player: 'Bradley Barcola',
          secondaryPlayer: 'Marco Asensio',
          description: 'Barcola slots past Fofana with ease.',
          scoreAfter: '0 - 3',
          timestamp: 'Yesterday 21:31'
        },
        {
          id: 'ev-yest-6-4',
          matchId: 'match-yest-6',
          matchTitle: 'Angers vs PSG',
          competition: 'Ligue 1',
          type: 'goal',
          minute: 45,
          extraMinute: 2,
          team: 'PSG',
          teamSide: 'away',
          player: 'Bradley Barcola',
          secondaryPlayer: 'Lee Kang-in',
          description: 'Barcola heads home Lee cross for a 4-0 first-half rampage.',
          scoreAfter: '0 - 4',
          timestamp: 'Yesterday 21:47'
        }
      ]
    },

    // ==========================================================
    // TODAY MATCHES (Live In-Play, Earlier FT, and Scheduled Tonight)
    // ==========================================================
    {
      id: 'match-today-live-1',
      competition: COMPETITIONS.PL,
      utcDate: getIsoDateTime(0, 16, 30),
      status: 'LIVE',
      minute: 76,
      homeTeam: TEAMS.MCI,
      awayTeam: TEAMS.ARS,
      score: {
        home: 2,
        away: 2,
        halfTime: { home: 1, away: 2 }
      },
      venue: 'Etihad Stadium, Manchester',
      referee: 'Michael Oliver',
      matchday: 11,
      statistics: {
        possession: [68, 32],
        shotsTotal: [22, 6],
        shotsOnTarget: [10, 3],
        corners: [12, 2],
        fouls: [7, 13],
        yellowCards: [2, 4],
        redCards: [0, 1],
        passAccuracy: [91, 74],
        offsides: [2, 1],
        bigChances: [4, 2],
        goalkeeperSaves: [1, 8],
        xg: [2.55, 1.15]
      },
      lineups: {
        home: {
          formation: '4-3-3',
          coach: 'Pep Guardiola',
          startingXI: [
            { id: 'p-mci-31', name: 'Ederson', number: 31, position: 'GK', grid: { x: 50, y: 92 } },
            { id: 'p-mci-2', name: 'Kyle Walker', number: 2, position: 'DEF', grid: { x: 88, y: 72 }, captain: true },
            { id: 'p-mci-3', name: 'Rúben Dias', number: 3, position: 'DEF', grid: { x: 64, y: 76 } },
            { id: 'p-mci-25', name: 'Manuel Akanji', number: 25, position: 'DEF', grid: { x: 36, y: 76 } },
            { id: 'p-mci-24', name: 'Josko Gvardiol', number: 24, position: 'DEF', grid: { x: 12, y: 72 } },
            { id: 'p-mci-16', name: 'Rodri', number: 16, position: 'MID', grid: { x: 50, y: 55 } },
            { id: 'p-mci-17', name: 'Kevin De Bruyne', number: 17, position: 'MID', grid: { x: 72, y: 44 } },
            { id: 'p-mci-8', name: 'Mateo Kovačić', number: 8, position: 'MID', grid: { x: 28, y: 44 } },
            { id: 'p-mci-26', name: 'Savinho', number: 26, position: 'FWD', grid: { x: 85, y: 22 } },
            { id: 'p-mci-9', name: 'Erling Haaland', number: 9, position: 'FWD', grid: { x: 50, y: 15 } },
            { id: 'p-mci-11', name: 'Jérémy Doku', number: 11, position: 'FWD', grid: { x: 15, y: 22 } }
          ],
          substitutes: [
            { id: 'p-mci-5', name: 'John Stones', number: 5, position: 'DEF', grid: { x: 0, y: 0 } },
            { id: 'p-mci-47', name: 'Phil Foden', number: 47, position: 'MID', grid: { x: 0, y: 0 } },
            { id: 'p-mci-20', name: 'Bernardo Silva', number: 20, position: 'MID', grid: { x: 0, y: 0 } }
          ]
        },
        away: {
          formation: '4-3-3',
          coach: 'Mikel Arteta',
          startingXI: [
            { id: 'p-ars-22', name: 'David Raya', number: 22, position: 'GK', grid: { x: 50, y: 8 } },
            { id: 'p-ars-4', name: 'Ben White', number: 4, position: 'DEF', grid: { x: 88, y: 28 } },
            { id: 'p-ars-2', name: 'William Saliba', number: 2, position: 'DEF', grid: { x: 64, y: 24 } },
            { id: 'p-ars-6', name: 'Gabriel Magalhães', number: 6, position: 'DEF', grid: { x: 36, y: 24 } },
            { id: 'p-ars-33', name: 'Riccardo Calafiori', number: 33, position: 'DEF', grid: { x: 12, y: 28 } },
            { id: 'p-ars-41', name: 'Declan Rice', number: 41, position: 'MID', grid: { x: 50, y: 45 } },
            { id: 'p-ars-5', name: 'Thomas Partey', number: 5, position: 'MID', grid: { x: 70, y: 48 } },
            { id: 'p-ars-29', name: 'Kai Havertz', number: 29, position: 'MID', grid: { x: 30, y: 48 } },
            { id: 'p-ars-7', name: 'Bukayo Saka', number: 7, position: 'FWD', grid: { x: 85, y: 72 }, captain: true },
            { id: 'p-ars-11', name: 'Gabriel Martinelli', number: 11, position: 'FWD', grid: { x: 15, y: 72 } },
            { id: 'p-ars-19', name: 'Leandro Trossard', number: 19, position: 'FWD', grid: { x: 50, y: 78 } }
          ],
          substitutes: [
            { id: 'p-ars-12', name: 'Jurriën Timber', number: 12, position: 'DEF', grid: { x: 0, y: 0 } },
            { id: 'p-ars-20', name: 'Jorginho', number: 20, position: 'MID', grid: { x: 0, y: 0 } },
            { id: 'p-ars-9', name: 'Gabriel Jesus', number: 9, position: 'FWD', grid: { x: 0, y: 0 } }
          ]
        }
      },
      events: [
        {
          id: 'epl-ev-1',
          matchId: 'match-today-live-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'goal',
          minute: 9,
          team: 'Manchester City',
          teamSide: 'home',
          player: 'Erling Haaland',
          secondaryPlayer: 'Savinho',
          description: 'Erling Haaland races through and pokes cleanly past Raya!',
          scoreAfter: '1 - 0',
          timestamp: 'Today 16:39'
        },
        {
          id: 'epl-ev-2',
          matchId: 'match-today-live-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'goal',
          minute: 22,
          team: 'Arsenal',
          teamSide: 'away',
          player: 'Riccardo Calafiori',
          secondaryPlayer: 'Gabriel Martinelli',
          description: 'Wonder strike from 25 yards curled into the far top corner!',
          scoreAfter: '1 - 1',
          timestamp: 'Today 16:52'
        },
        {
          id: 'epl-ev-3',
          matchId: 'match-today-live-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'goal',
          minute: 45,
          extraMinute: 1,
          team: 'Arsenal',
          teamSide: 'away',
          player: 'Gabriel Magalhães',
          secondaryPlayer: 'Bukayo Saka',
          description: 'Dominant bullet header from Bukayo Saka corner delivery.',
          scoreAfter: '1 - 2',
          timestamp: 'Today 17:16'
        },
        {
          id: 'epl-ev-4',
          matchId: 'match-today-live-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'red_card',
          minute: 45,
          extraMinute: 8,
          team: 'Arsenal',
          teamSide: 'away',
          player: 'Leandro Trossard',
          description: 'Second caution: Deliberately kicking ball away after whistle.',
          timestamp: 'Today 17:23'
        },
        {
          id: 'epl-ev-5',
          matchId: 'match-today-live-1',
          matchTitle: 'Manchester City vs Arsenal',
          competition: 'Premier League',
          type: 'goal',
          minute: 68,
          team: 'Manchester City',
          teamSide: 'home',
          player: 'John Stones',
          secondaryPlayer: 'Mateo Kovačić',
          description: 'DRAMA! Stones bundles home the rebound in the 68th minute!',
          scoreAfter: '2 - 2',
          timestamp: 'Today 17:50'
        }
      ],
      commentary: [
        { id: 'c-t1-1', minute: 76, type: 'chance', text: 'Phil Foden drills a low swerving effort towards the near post! Raya drops down to hold securely.', isKeyMoment: true },
        { id: 'c-t1-2', minute: 68, type: 'goal', text: 'GOAL! Manchester City 2, Arsenal 2. John Stones levels the scoreline!', isKeyMoment: true, score: '2-2' }
      ]
    },
    {
      id: 'match-today-live-2',
      competition: COMPETITIONS.PD,
      utcDate: getIsoDateTime(0, 20, 0),
      status: 'LIVE',
      minute: 41,
      homeTeam: TEAMS.RMA,
      awayTeam: TEAMS.BAR,
      score: {
        home: 1,
        away: 2,
        halfTime: null
      },
      venue: 'Santiago Bernabéu, Madrid',
      referee: 'José María Sánchez Martínez',
      matchday: 11,
      statistics: {
        possession: [46, 54],
        shotsTotal: [9, 11],
        shotsOnTarget: [4, 6],
        corners: [4, 5],
        fouls: [7, 8],
        yellowCards: [1, 2],
        redCards: [0, 0],
        passAccuracy: [86, 89],
        offsides: [5, 1],
        bigChances: [2, 3],
        goalkeeperSaves: [4, 3],
        xg: [1.22, 1.78]
      },
      events: [
        {
          id: 'el-ev-1',
          matchId: 'match-today-live-2',
          matchTitle: 'Real Madrid vs FC Barcelona',
          competition: 'La Liga',
          type: 'goal',
          minute: 12,
          team: 'Real Madrid',
          teamSide: 'home',
          player: 'Kylian Mbappé',
          secondaryPlayer: 'Vinícius Júnior',
          description: 'Clinical counter-attack finished by Mbappé past Peña.',
          scoreAfter: '1 - 0',
          timestamp: 'Today 20:12'
        },
        {
          id: 'el-ev-2',
          matchId: 'match-today-live-2',
          matchTitle: 'Real Madrid vs FC Barcelona',
          competition: 'La Liga',
          type: 'goal',
          minute: 26,
          team: 'FC Barcelona',
          teamSide: 'away',
          player: 'Robert Lewandowski',
          secondaryPlayer: 'Marc Casadó',
          description: 'Lewandowski beats the offside line and curls into bottom right corner!',
          scoreAfter: '1 - 1',
          timestamp: 'Today 20:26'
        },
        {
          id: 'el-ev-3',
          matchId: 'match-today-live-2',
          matchTitle: 'Real Madrid vs FC Barcelona',
          competition: 'La Liga',
          type: 'goal',
          minute: 34,
          team: 'FC Barcelona',
          teamSide: 'away',
          player: 'Lamine Yamal',
          secondaryPlayer: 'Raphinha',
          description: 'Sensational finish from the teenage maestro Yamal into the top corner!',
          scoreAfter: '1 - 2',
          timestamp: 'Today 20:34'
        }
      ]
    },
    {
      id: 'match-today-live-3',
      competition: COMPETITIONS.BL1,
      utcDate: getIsoDateTime(0, 18, 30),
      status: 'LIVE',
      minute: 58,
      homeTeam: TEAMS.BAY,
      awayTeam: TEAMS.B04,
      score: {
        home: 1,
        away: 1,
        halfTime: { home: 1, away: 1 }
      },
      venue: 'Allianz Arena, Munich',
      referee: 'Felix Zwayer',
      matchday: 10,
      statistics: {
        possession: [65, 35],
        shotsTotal: [15, 4],
        shotsOnTarget: [5, 2],
        corners: [9, 1],
        fouls: [9, 11],
        yellowCards: [1, 3],
        redCards: [0, 0],
        passAccuracy: [90, 78],
        offsides: [1, 2],
        bigChances: [3, 1],
        goalkeeperSaves: [1, 4],
        xg: [1.75, 0.45]
      },
      events: [
        {
          id: 'bl-ev-1',
          matchId: 'match-today-live-3',
          matchTitle: 'FC Bayern München vs Bayer 04 Leverkusen',
          competition: 'Bundesliga',
          type: 'goal',
          minute: 31,
          team: 'Bayer 04 Leverkusen',
          teamSide: 'away',
          player: 'Robert Andrich',
          description: 'First-time driven shot from 22 yards after corner clearance.',
          scoreAfter: '0 - 1',
          timestamp: 'Today 19:01'
        },
        {
          id: 'bl-ev-2',
          matchId: 'match-today-live-3',
          matchTitle: 'FC Bayern München vs Bayer 04 Leverkusen',
          competition: 'Bundesliga',
          type: 'goal',
          minute: 39,
          team: 'FC Bayern München',
          teamSide: 'home',
          player: 'Aleksandar Pavlović',
          description: 'WONDERSTRIKE! Pavlović chests down and volleys from 30 yards into top bin!',
          scoreAfter: '1 - 1',
          timestamp: 'Today 19:09'
        }
      ]
    },
    {
      id: 'match-today-live-4',
      competition: COMPETITIONS.SA,
      utcDate: getIsoDateTime(0, 18, 0),
      status: 'LIVE',
      minute: 88,
      homeTeam: TEAMS.INT,
      awayTeam: TEAMS.JUV,
      score: {
        home: 4,
        away: 4,
        halfTime: { home: 3, away: 2 }
      },
      venue: 'San Siro, Milan',
      referee: 'Marco Guida',
      matchday: 9,
      statistics: {
        possession: [56, 44],
        shotsTotal: [18, 12],
        shotsOnTarget: [9, 6],
        corners: [8, 4],
        fouls: [12, 14],
        yellowCards: [3, 2],
        redCards: [0, 0],
        passAccuracy: [88, 83],
        offsides: [1, 2],
        bigChances: [5, 4],
        goalkeeperSaves: [2, 5],
        xg: [2.95, 2.15]
      },
      events: [
        {
          id: 'sa-ev-1',
          matchId: 'match-today-live-4',
          matchTitle: 'Inter vs Juventus',
          competition: 'Serie A',
          type: 'goal',
          minute: 15,
          team: 'Inter',
          teamSide: 'home',
          player: 'Piotr Zieliński',
          description: 'Penalty converted into bottom corner.',
          scoreAfter: '1 - 0',
          timestamp: 'Today 18:15'
        },
        {
          id: 'sa-ev-8',
          matchId: 'match-today-live-4',
          matchTitle: 'Inter vs Juventus',
          competition: 'Serie A',
          type: 'goal',
          minute: 82,
          team: 'Juventus',
          teamSide: 'away',
          player: 'Kenan Yıldız',
          description: '4-4 EQUALIZER! Historic 8-goal thriller at San Siro!',
          scoreAfter: '4 - 4',
          timestamp: 'Today 19:37'
        }
      ]
    },
    {
      id: 'match-today-ft-1',
      competition: COMPETITIONS.PL,
      utcDate: getIsoDateTime(0, 14, 0),
      status: 'FT',
      homeTeam: TEAMS.CHE,
      awayTeam: TEAMS.NEW,
      score: {
        home: 2,
        away: 1,
        halfTime: { home: 1, away: 1 }
      },
      venue: 'Stamford Bridge, London',
      referee: 'Simon Hooper',
      matchday: 9,
      statistics: {
        possession: [51, 49],
        shotsTotal: [17, 11],
        shotsOnTarget: [7, 3],
        corners: [6, 4],
        fouls: [14, 13],
        yellowCards: [4, 4],
        redCards: [0, 0],
        passAccuracy: [84, 82],
        offsides: [2, 1],
        bigChances: [3, 2],
        goalkeeperSaves: [2, 5],
        xg: [1.88, 1.25]
      },
      events: [
        {
          id: 'che-ev-1',
          matchId: 'match-today-ft-1',
          matchTitle: 'Chelsea vs Newcastle',
          competition: 'Premier League',
          type: 'goal',
          minute: 18,
          team: 'Chelsea',
          teamSide: 'home',
          player: 'Nicolas Jackson',
          secondaryPlayer: 'Pedro Neto',
          description: 'Neto darts down the wing and crosses for Jackson to sweep in.',
          scoreAfter: '1 - 0',
          timestamp: 'Today 14:18'
        },
        {
          id: 'che-ev-2',
          matchId: 'match-today-ft-1',
          matchTitle: 'Chelsea vs Newcastle',
          competition: 'Premier League',
          type: 'goal',
          minute: 32,
          team: 'Newcastle',
          teamSide: 'away',
          player: 'Alexander Isak',
          secondaryPlayer: 'Lewis Hall',
          description: 'Tap-in at the back post confirmed after brief VAR check.',
          scoreAfter: '1 - 1',
          timestamp: 'Today 14:32'
        },
        {
          id: 'che-ev-3',
          matchId: 'match-today-ft-1',
          matchTitle: 'Chelsea vs Newcastle',
          competition: 'Premier League',
          type: 'goal',
          minute: 47,
          team: 'Chelsea',
          teamSide: 'home',
          player: 'Cole Palmer',
          description: 'Palmer drives from halfway and drills an angled left-foot rocket!',
          scoreAfter: '2 - 1',
          timestamp: 'Today 15:02'
        }
      ]
    },
    {
      id: 'match-today-ft-2',
      competition: COMPETITIONS.FL1,
      utcDate: getIsoDateTime(0, 15, 0),
      status: 'FT',
      homeTeam: TEAMS.OM,
      awayTeam: TEAMS.ASM,
      score: {
        home: 2,
        away: 1,
        halfTime: { home: 1, away: 1 }
      },
      venue: 'Orange Vélodrome, Marseille',
      referee: 'Clément Turpin',
      matchday: 11,
      statistics: {
        possession: [53, 47],
        shotsTotal: [14, 10],
        shotsOnTarget: [5, 3],
        corners: [5, 4],
        fouls: [13, 15],
        yellowCards: [3, 4],
        redCards: [0, 0],
        passAccuracy: [85, 81],
        offsides: [1, 2],
        bigChances: [3, 1],
        goalkeeperSaves: [2, 3],
        xg: [1.72, 1.1]
      }
    },
    {
      id: 'match-today-ns-1',
      competition: COMPETITIONS.PL,
      utcDate: getIsoDateTime(0, 20, 0),
      status: 'NS',
      homeTeam: TEAMS.TOT,
      awayTeam: TEAMS.AVL,
      score: { home: null, away: null },
      venue: 'Tottenham Hotspur Stadium, London',
      referee: 'Craig Pawson',
      matchday: 11
    },
    {
      id: 'match-today-ns-2',
      competition: COMPETITIONS.SA,
      utcDate: getIsoDateTime(0, 20, 45),
      status: 'NS',
      homeTeam: TEAMS.MIL,
      awayTeam: TEAMS.NAP,
      score: { home: null, away: null },
      venue: 'San Siro, Milan',
      referee: 'Andrea Colombo',
      matchday: 12
    },
    {
      id: 'match-today-ns-3',
      competition: COMPETITIONS.PD,
      utcDate: getIsoDateTime(0, 21, 0),
      status: 'NS',
      homeTeam: TEAMS.ATM,
      awayTeam: TEAMS.ATH,
      score: { home: null, away: null },
      venue: 'Cívitas Metropolitano, Madrid',
      referee: 'Juan Martínez Munuera',
      matchday: 12
    },
    {
      id: 'match-today-ns-4',
      competition: COMPETITIONS.BL1,
      utcDate: getIsoDateTime(0, 20, 30),
      status: 'NS',
      homeTeam: TEAMS.BVB,
      awayTeam: TEAMS.RBL,
      score: { home: null, away: null },
      venue: 'Signal Iduna Park, Dortmund',
      referee: 'Daniel Siebert',
      matchday: 10
    },

    // ==========================================================
    // TOMORROW MATCHES (All Scheduled Upcoming Fixtures - Status: NS)
    // ==========================================================
    {
      id: 'match-tom-1',
      competition: COMPETITIONS.CL,
      utcDate: getIsoDateTime(1, 20, 0),
      status: 'NS',
      homeTeam: TEAMS.INT,
      awayTeam: TEAMS.ARS,
      score: { home: null, away: null },
      venue: 'San Siro, Milan',
      referee: 'István Kovács',
      matchday: 4
    },
    {
      id: 'match-tom-2',
      competition: COMPETITIONS.CL,
      utcDate: getIsoDateTime(1, 20, 0),
      status: 'NS',
      homeTeam: TEAMS.RMA,
      awayTeam: TEAMS.BVB,
      score: { home: null, away: null },
      venue: 'Santiago Bernabéu, Madrid',
      referee: 'Szymon Marciniak',
      matchday: 4
    },
    {
      id: 'match-tom-3',
      competition: COMPETITIONS.CL,
      utcDate: getIsoDateTime(1, 20, 0),
      status: 'NS',
      homeTeam: TEAMS.LIV,
      awayTeam: TEAMS.B04,
      score: { home: null, away: null },
      venue: 'Anfield, Liverpool',
      referee: 'Danny Makkelie',
      matchday: 4
    },
    {
      id: 'match-tom-4',
      competition: COMPETITIONS.CL,
      utcDate: getIsoDateTime(1, 20, 0),
      status: 'NS',
      homeTeam: TEAMS.SCP,
      awayTeam: TEAMS.MCI,
      score: { home: null, away: null },
      venue: 'Estádio José Alvalade, Lisbon',
      referee: 'Daniel Siebert',
      matchday: 4
    },
    {
      id: 'match-tom-5',
      competition: COMPETITIONS.CL,
      utcDate: getIsoDateTime(1, 20, 0),
      status: 'NS',
      homeTeam: TEAMS.PSG,
      awayTeam: TEAMS.ATM,
      score: { home: null, away: null },
      venue: 'Parc des Princes, Paris',
      referee: 'Slavko Vinčić',
      matchday: 4
    },
    {
      id: 'match-tom-6',
      competition: COMPETITIONS.CL,
      utcDate: getIsoDateTime(1, 20, 0),
      status: 'NS',
      homeTeam: TEAMS.BAY,
      awayTeam: TEAMS.BEN,
      score: { home: null, away: null },
      venue: 'Allianz Arena, Munich',
      referee: 'Davide Massa',
      matchday: 4
    }
  ];
};

export const INITIAL_MATCHES: Match[] = generateComprehensiveMatches();

// Standings for each competition
export const LEAGUE_STANDINGS: Record<string, CompetitionStandings> = {
  PL: {
    competition: COMPETITIONS.PL,
    season: '2024/25',
    table: [
      { position: 1, team: TEAMS.LIV, playedGames: 11, won: 9, draw: 1, lost: 1, points: 28, goalsFor: 21, goalsAgainst: 6, goalDifference: 15, form: ['W', 'W', 'D', 'W', 'W'] },
      { position: 2, team: TEAMS.MCI, playedGames: 11, won: 7, draw: 2, lost: 2, points: 23, goalsFor: 22, goalsAgainst: 13, goalDifference: 9, form: ['W', 'W', 'W', 'L', 'L'] },
      { position: 3, team: TEAMS.CHE, playedGames: 11, won: 5, draw: 4, lost: 2, points: 19, goalsFor: 21, goalsAgainst: 13, goalDifference: 8, form: ['D', 'W', 'L', 'D', 'D'] },
      { position: 4, team: TEAMS.ARS, playedGames: 11, won: 5, draw: 4, lost: 2, points: 19, goalsFor: 18, goalsAgainst: 12, goalDifference: 6, form: ['W', 'L', 'D', 'L', 'D'] },
      { position: 5, team: TEAMS.TOT, playedGames: 11, won: 5, draw: 1, lost: 5, points: 16, goalsFor: 23, goalsAgainst: 13, goalDifference: 10, form: ['W', 'L', 'W', 'W', 'L'] },
      { position: 6, team: TEAMS.AVL, playedGames: 11, won: 5, draw: 3, lost: 3, points: 18, goalsFor: 17, goalsAgainst: 17, goalDifference: 0, form: ['D', 'W', 'D', 'L', 'L'] },
      { position: 7, team: TEAMS.NEW, playedGames: 11, won: 5, draw: 3, lost: 3, points: 18, goalsFor: 13, goalsAgainst: 11, goalDifference: 2, form: ['D', 'L', 'L', 'W', 'W'] },
      { position: 8, team: TEAMS.MUN, playedGames: 11, won: 4, draw: 3, lost: 4, points: 15, goalsFor: 12, goalsAgainst: 12, goalDifference: 0, form: ['D', 'W', 'L', 'D', 'W'] }
    ]
  },
  PD: {
    competition: COMPETITIONS.PD,
    season: '2024/25',
    table: [
      { position: 1, team: TEAMS.BAR, playedGames: 13, won: 11, draw: 0, lost: 2, points: 33, goalsFor: 40, goalsAgainst: 12, goalDifference: 28, form: ['W', 'W', 'W', 'W', 'L'] },
      { position: 2, team: TEAMS.RMA, playedGames: 12, won: 8, draw: 3, lost: 1, points: 27, goalsFor: 25, goalsAgainst: 11, goalDifference: 14, form: ['W', 'W', 'W', 'L', 'W'] },
      { position: 3, team: TEAMS.ATM, playedGames: 13, won: 7, draw: 5, lost: 1, points: 26, goalsFor: 19, goalsAgainst: 7, goalDifference: 12, form: ['D', 'W', 'L', 'W', 'W'] },
      { position: 4, team: TEAMS.ATH, playedGames: 13, won: 5, draw: 5, lost: 3, points: 20, goalsFor: 19, goalsAgainst: 13, goalDifference: 6, form: ['L', 'W', 'D', 'D', 'D'] }
    ]
  },
  BL1: {
    competition: COMPETITIONS.BL1,
    season: '2024/25',
    table: [
      { position: 1, team: TEAMS.BAY, playedGames: 10, won: 8, draw: 2, lost: 0, points: 26, goalsFor: 33, goalsAgainst: 7, goalDifference: 26, form: ['D', 'D', 'W', 'W', 'W'] },
      { position: 2, team: TEAMS.RBL, playedGames: 10, won: 6, draw: 3, lost: 1, points: 21, goalsFor: 15, goalsAgainst: 5, goalDifference: 10, form: ['W', 'W', 'W', 'L', 'D'] },
      { position: 3, team: TEAMS.B04, playedGames: 10, won: 4, draw: 5, lost: 1, points: 17, goalsFor: 21, goalsAgainst: 16, goalDifference: 5, form: ['D', 'W', 'D', 'D', 'D'] },
      { position: 4, team: TEAMS.BVB, playedGames: 10, won: 5, draw: 1, lost: 4, points: 16, goalsFor: 18, goalsAgainst: 18, goalDifference: 0, form: ['L', 'W', 'L', 'W', 'L'] }
    ]
  },
  SA: {
    competition: COMPETITIONS.SA,
    season: '2024/25',
    table: [
      { position: 1, team: TEAMS.NAP, playedGames: 12, won: 8, draw: 2, lost: 2, points: 26, goalsFor: 19, goalsAgainst: 9, goalDifference: 10, form: ['W', 'W', 'W', 'L', 'D'] },
      { position: 2, team: TEAMS.INT, playedGames: 12, won: 7, draw: 4, lost: 1, points: 25, goalsFor: 26, goalsAgainst: 14, goalDifference: 12, form: ['W', 'W', 'D', 'W', 'D'] },
      { position: 3, team: TEAMS.JUV, playedGames: 12, won: 6, draw: 6, lost: 0, points: 24, goalsFor: 21, goalsAgainst: 7, goalDifference: 14, form: ['W', 'W', 'D', 'W', 'W'] },
      { position: 4, team: TEAMS.MIL, playedGames: 11, won: 5, draw: 3, lost: 3, points: 18, goalsFor: 20, goalsAgainst: 14, goalDifference: 6, form: ['W', 'W', 'L', 'W', 'D'] }
    ]
  },
  FL1: {
    competition: COMPETITIONS.FL1,
    season: '2024/25',
    table: [
      { position: 1, team: TEAMS.PSG, playedGames: 11, won: 9, draw: 2, lost: 0, points: 29, goalsFor: 33, goalsAgainst: 10, goalDifference: 23, form: ['D', 'W', 'W', 'W', 'W'] },
      { position: 2, team: TEAMS.ASM, playedGames: 11, won: 7, draw: 2, lost: 2, points: 23, goalsFor: 18, goalsAgainst: 8, goalDifference: 10, form: ['D', 'D', 'L', 'L', 'W'] },
      { position: 3, team: TEAMS.OM, playedGames: 11, won: 6, draw: 2, lost: 3, points: 20, goalsFor: 24, goalsAgainst: 15, goalDifference: 9, form: ['D', 'W', 'L', 'W', 'L'] }
    ]
  },
  CL: {
    competition: COMPETITIONS.CL,
    season: '2024/25 (League Phase)',
    table: [
      { position: 1, team: TEAMS.LIV, playedGames: 4, won: 4, draw: 0, lost: 0, points: 12, goalsFor: 10, goalsAgainst: 1, goalDifference: 9, form: ['W', 'W', 'W', 'W'] },
      { position: 2, team: TEAMS.MCI, playedGames: 4, won: 2, draw: 1, lost: 1, points: 7, goalsFor: 10, goalsAgainst: 4, goalDifference: 6, form: ['D', 'W', 'W', 'L'] },
      { position: 3, team: TEAMS.BAR, playedGames: 4, won: 3, draw: 0, lost: 1, points: 9, goalsFor: 15, goalsAgainst: 5, goalDifference: 10, form: ['L', 'W', 'W', 'W'] },
      { position: 4, team: TEAMS.B04, playedGames: 4, won: 2, draw: 1, lost: 1, points: 7, goalsFor: 6, goalsAgainst: 5, goalDifference: 1, form: ['W', 'W', 'D', 'L'] },
      { position: 5, team: TEAMS.INT, playedGames: 4, won: 3, draw: 1, lost: 0, points: 10, goalsFor: 6, goalsAgainst: 0, goalDifference: 6, form: ['D', 'W', 'W', 'W'] },
      { position: 6, team: TEAMS.BVB, playedGames: 4, won: 3, draw: 0, lost: 1, points: 9, goalsFor: 13, goalsAgainst: 6, goalDifference: 7, form: ['W', 'W', 'L', 'W'] },
      { position: 7, team: TEAMS.RMA, playedGames: 4, won: 2, draw: 0, lost: 2, points: 6, goalsFor: 9, goalsAgainst: 7, goalDifference: 2, form: ['W', 'L', 'W', 'L'] },
      { position: 8, team: TEAMS.BAY, playedGames: 4, won: 2, draw: 0, lost: 2, points: 6, goalsFor: 11, goalsAgainst: 7, goalDifference: 4, form: ['W', 'L', 'L', 'W'] }
    ]
  }
};
