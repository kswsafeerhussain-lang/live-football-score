/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Comprehensive League Rosters (EPL, La Liga, Serie A, Bundesliga, Ligue 1)
 * Authentic teams, crests, venues, and abbreviations for all 5 domestic leagues.
 */

import { Team } from '../types/football';

export const LEAGUE_TEAMS: Record<string, Team[]> = {
  // English Premier League (20 Teams - 38 Matchdays)
  PL: [
    { id: 57, name: 'Arsenal FC', shortName: 'Arsenal', tla: 'ARS', crest: 'https://crests.football-data.org/57.png', venue: 'Emirates Stadium' },
    { id: 58, name: 'Aston Villa FC', shortName: 'Aston Villa', tla: 'AVL', crest: 'https://crests.football-data.org/58.png', venue: 'Villa Park' },
    { id: 1044, name: 'AFC Bournemouth', shortName: 'Bournemouth', tla: 'BOU', crest: 'https://crests.football-data.org/1044.png', venue: 'Vitality Stadium' },
    { id: 402, name: 'Brentford FC', shortName: 'Brentford', tla: 'BRE', crest: 'https://crests.football-data.org/402.png', venue: 'Gtech Community Stadium' },
    { id: 397, name: 'Brighton & Hove Albion', shortName: 'Brighton', tla: 'BHA', crest: 'https://crests.football-data.org/397.png', venue: 'Amex Stadium' },
    { id: 61, name: 'Chelsea FC', shortName: 'Chelsea', tla: 'CHE', crest: 'https://crests.football-data.org/61.png', venue: 'Stamford Bridge' },
    { id: 354, name: 'Crystal Palace FC', shortName: 'Crystal Palace', tla: 'CRY', crest: 'https://crests.football-data.org/354.png', venue: 'Selhurst Park' },
    { id: 62, name: 'Everton FC', shortName: 'Everton', tla: 'EVE', crest: 'https://crests.football-data.org/62.png', venue: 'Goodison Park' },
    { id: 63, name: 'Fulham FC', shortName: 'Fulham', tla: 'FUL', crest: 'https://crests.football-data.org/63.png', venue: 'Craven Cottage' },
    { id: 349, name: 'Ipswich Town FC', shortName: 'Ipswich', tla: 'IPS', crest: 'https://crests.football-data.org/349.png', venue: 'Portman Road' },
    { id: 338, name: 'Leicester City FC', shortName: 'Leicester', tla: 'LEI', crest: 'https://crests.football-data.org/338.png', venue: 'King Power Stadium' },
    { id: 64, name: 'Liverpool FC', shortName: 'Liverpool', tla: 'LIV', crest: 'https://crests.football-data.org/64.png', venue: 'Anfield' },
    { id: 65, name: 'Manchester City FC', shortName: 'Man City', tla: 'MCI', crest: 'https://crests.football-data.org/65.png', venue: 'Etihad Stadium' },
    { id: 66, name: 'Manchester United FC', shortName: 'Man United', tla: 'MUN', crest: 'https://crests.football-data.org/66.png', venue: 'Old Trafford' },
    { id: 67, name: 'Newcastle United FC', shortName: 'Newcastle', tla: 'NEW', crest: 'https://crests.football-data.org/67.png', venue: "St. James' Park" },
    { id: 351, name: 'Nottingham Forest FC', shortName: "Nott'm Forest", tla: 'NFO', crest: 'https://crests.football-data.org/351.png', venue: 'City Ground' },
    { id: 340, name: 'Southampton FC', shortName: 'Southampton', tla: 'SOU', crest: 'https://crests.football-data.org/340.png', venue: "St. Mary's Stadium" },
    { id: 73, name: 'Tottenham Hotspur FC', shortName: 'Tottenham', tla: 'TOT', crest: 'https://crests.football-data.org/73.png', venue: 'Tottenham Hotspur Stadium' },
    { id: 563, name: 'West Ham United FC', shortName: 'West Ham', tla: 'WHU', crest: 'https://crests.football-data.org/563.png', venue: 'London Stadium' },
    { id: 76, name: 'Wolverhampton Wanderers', shortName: 'Wolves', tla: 'WOL', crest: 'https://crests.football-data.org/76.png', venue: 'Molineux Stadium' }
  ],

  // La Liga (20 Teams - 38 Matchdays)
  PD: [
    { id: 86, name: 'Real Madrid CF', shortName: 'Real Madrid', tla: 'RMA', crest: 'https://crests.football-data.org/86.png', venue: 'Santiago Bernabéu' },
    { id: 81, name: 'FC Barcelona', shortName: 'Barcelona', tla: 'BAR', crest: 'https://crests.football-data.org/81.png', venue: 'Estadi Olímpic Lluís Companys' },
    { id: 78, name: 'Atlético de Madrid', shortName: 'Atlético', tla: 'ATM', crest: 'https://crests.football-data.org/78.png', venue: 'Cívitas Metropolitano' },
    { id: 77, name: 'Athletic Club', shortName: 'Athletic Club', tla: 'ATH', crest: 'https://crests.football-data.org/77.png', venue: 'San Mamés' },
    { id: 92, name: 'Real Sociedad', shortName: 'Real Sociedad', tla: 'RSO', crest: 'https://crests.football-data.org/92.png', venue: 'Reale Arena' },
    { id: 94, name: 'Villarreal CF', shortName: 'Villarreal', tla: 'VIL', crest: 'https://crests.football-data.org/94.png', venue: 'Estadio de la Cerámica' },
    { id: 90, name: 'Real Betis', shortName: 'Real Betis', tla: 'BET', crest: 'https://crests.football-data.org/90.png', venue: 'Benito Villamarín' },
    { id: 559, name: 'Sevilla FC', shortName: 'Sevilla', tla: 'SEV', crest: 'https://crests.football-data.org/559.png', venue: 'Ramón Sánchez-Pizjuán' },
    { id: 298, name: 'Girona FC', shortName: 'Girona', tla: 'GIR', crest: 'https://crests.football-data.org/298.png', venue: 'Montilivi' },
    { id: 558, name: 'RC Celta de Vigo', shortName: 'Celta Vigo', tla: 'CEL', crest: 'https://crests.football-data.org/558.png', venue: 'Abanca-Balaídos' },
    { id: 89, name: 'RCD Mallorca', shortName: 'Mallorca', tla: 'MLL', crest: 'https://crests.football-data.org/89.png', venue: 'Son Moix' },
    { id: 79, name: 'CA Osasuna', shortName: 'Osasuna', tla: 'OSA', crest: 'https://crests.football-data.org/79.png', venue: 'El Sadar' },
    { id: 87, name: 'Rayo Vallecano', shortName: 'Rayo Vallecano', tla: 'RAY', crest: 'https://crests.football-data.org/87.png', venue: 'Vallecas' },
    { id: 95, name: 'Valencia CF', shortName: 'Valencia', tla: 'VAL', crest: 'https://crests.football-data.org/95.png', venue: 'Mestalla' },
    { id: 263, name: 'Deportivo Alavés', shortName: 'Alavés', tla: 'ALA', crest: 'https://crests.football-data.org/263.png', venue: 'Mendizorrotza' },
    { id: 275, name: 'UD Las Palmas', shortName: 'Las Palmas', tla: 'LPA', crest: 'https://crests.football-data.org/275.png', venue: 'Gran Canaria' },
    { id: 82, name: 'Getafe CF', shortName: 'Getafe', tla: 'GET', crest: 'https://crests.football-data.org/82.png', venue: 'Coliseum' },
    { id: 80, name: 'RCD Espanyol', shortName: 'Espanyol', tla: 'ESP', crest: 'https://crests.football-data.org/80.png', venue: 'RCDE Stadium' },
    { id: 250, name: 'Real Valladolid CF', shortName: 'Valladolid', tla: 'VLD', crest: 'https://crests.football-data.org/250.png', venue: 'José Zorrilla' },
    { id: 745, name: 'CD Leganés', shortName: 'Leganés', tla: 'LEG', crest: 'https://crests.football-data.org/745.png', venue: 'Butarque' }
  ],

  // Serie A (20 Teams - 38 Matchdays)
  SA: [
    { id: 108, name: 'FC Internazionale Milano', shortName: 'Inter', tla: 'INT', crest: 'https://crests.football-data.org/108.png', venue: 'San Siro' },
    { id: 109, name: 'Juventus FC', shortName: 'Juventus', tla: 'JUV', crest: 'https://crests.football-data.org/109.png', venue: 'Allianz Stadium' },
    { id: 98, name: 'AC Milan', shortName: 'AC Milan', tla: 'MIL', crest: 'https://crests.football-data.org/98.png', venue: 'San Siro' },
    { id: 113, name: 'SSC Napoli', shortName: 'Napoli', tla: 'NAP', crest: 'https://crests.football-data.org/113.png', venue: 'Diego Armando Maradona' },
    { id: 102, name: 'Atalanta BC', shortName: 'Atalanta', tla: 'ATA', crest: 'https://crests.football-data.org/102.png', venue: 'Gewiss Stadium' },
    { id: 110, name: 'SS Lazio', shortName: 'Lazio', tla: 'LAZ', crest: 'https://crests.football-data.org/110.png', venue: 'Stadio Olimpico' },
    { id: 100, name: 'AS Roma', shortName: 'Roma', tla: 'ROM', crest: 'https://crests.football-data.org/100.png', venue: 'Stadio Olimpico' },
    { id: 99, name: 'ACF Fiorentina', shortName: 'Fiorentina', tla: 'FIO', crest: 'https://crests.football-data.org/99.png', venue: 'Artemio Franchi' },
    { id: 586, name: 'Torino FC', shortName: 'Torino', tla: 'TOR', crest: 'https://crests.football-data.org/586.png', venue: 'Olimpico Grande Torino' },
    { id: 103, name: 'Bologna FC 1909', shortName: 'Bologna', tla: 'BOL', crest: 'https://crests.football-data.org/103.png', venue: 'Renato DallAra' },
    { id: 115, name: 'Udinese Calcio', shortName: 'Udinese', tla: 'UDI', crest: 'https://crests.football-data.org/115.png', venue: 'Bluenergy Stadium' },
    { id: 107, name: 'Genoa CFC', shortName: 'Genoa', tla: 'GEN', crest: 'https://crests.football-data.org/107.png', venue: 'Luigi Ferraris' },
    { id: 112, name: 'Parma Calcio 1913', shortName: 'Parma', tla: 'PAR', crest: 'https://crests.football-data.org/112.png', venue: 'Ennio Tardini' },
    { id: 450, name: 'Hellas Verona FC', shortName: 'Verona', tla: 'VER', crest: 'https://crests.football-data.org/450.png', venue: 'Marcantonio Bentegodi' },
    { id: 104, name: 'Cagliari Calcio', shortName: 'Cagliari', tla: 'CAG', crest: 'https://crests.football-data.org/104.png', venue: 'Unipol Domus' },
    { id: 1048, name: 'Como 1907', shortName: 'Como', tla: 'COM', crest: 'https://crests.football-data.org/1048.png', venue: 'Giuseppe Sinigaglia' },
    { id: 445, name: 'Empoli FC', shortName: 'Empoli', tla: 'EMP', crest: 'https://crests.football-data.org/445.png', venue: 'Carlo Castellani' },
    { id: 5890, name: 'US Lecce', shortName: 'Lecce', tla: 'LEC', crest: 'https://crests.football-data.org/5890.png', venue: 'Via del Mare' },
    { id: 5911, name: 'AC Monza', shortName: 'Monza', tla: 'MON', crest: 'https://crests.football-data.org/5911.png', venue: 'U-Power Stadium' },
    { id: 454, name: 'Venezia FC', shortName: 'Venezia', tla: 'VEN', crest: 'https://crests.football-data.org/454.png', venue: 'Pier Luigi Penzo' }
  ],

  // Bundesliga (18 Teams - 34 Matchdays)
  BL1: [
    { id: 5, name: 'FC Bayern München', shortName: 'Bayern Munich', tla: 'BAY', crest: 'https://crests.football-data.org/5.png', venue: 'Allianz Arena' },
    { id: 3, name: 'Bayer 04 Leverkusen', shortName: 'Leverkusen', tla: 'B04', crest: 'https://crests.football-data.org/3.png', venue: 'BayArena' },
    { id: 4, name: 'Borussia Dortmund', shortName: 'Dortmund', tla: 'BVB', crest: 'https://crests.football-data.org/4.png', venue: 'Signal Iduna Park' },
    { id: 721, name: 'RB Leipzig', shortName: 'RB Leipzig', tla: 'RBL', crest: 'https://crests.football-data.org/721.png', venue: 'Red Bull Arena' },
    { id: 19, name: 'Eintracht Frankfurt', shortName: 'Frankfurt', tla: 'SGE', crest: 'https://crests.football-data.org/19.png', venue: 'Deutsche Bank Park' },
    { id: 10, name: 'VfB Stuttgart', shortName: 'Stuttgart', tla: 'VFB', crest: 'https://crests.football-data.org/10.png', venue: 'MHPArena' },
    { id: 17, name: 'SC Freiburg', shortName: 'Freiburg', tla: 'SCF', crest: 'https://crests.football-data.org/17.png', venue: 'Europa-Park Stadion' },
    { id: 28, name: '1. FC Union Berlin', shortName: 'Union Berlin', tla: 'FCU', crest: 'https://crests.football-data.org/28.png', venue: 'An der Alten Försterei' },
    { id: 18, name: 'Borussia Mönchengladbach', shortName: "M'gladbach", tla: 'BMG', crest: 'https://crests.football-data.org/18.png', venue: 'Borussia-Park' },
    { id: 12, name: 'SV Werder Bremen', shortName: 'Werder Bremen', tla: 'SVW', crest: 'https://crests.football-data.org/12.png', venue: 'Weserstadion' },
    { id: 16, name: 'FC Augsburg', shortName: 'Augsburg', tla: 'FCA', crest: 'https://crests.football-data.org/16.png', venue: 'WWK Arena' },
    { id: 44, name: '1. FC Heidenheim 1846', shortName: 'Heidenheim', tla: 'FCH', crest: 'https://crests.football-data.org/44.png', venue: 'Voith-Arena' },
    { id: 11, name: 'VfL Wolfsburg', shortName: 'Wolfsburg', tla: 'WOB', crest: 'https://crests.football-data.org/11.png', venue: 'Volkswagen Arena' },
    { id: 15, name: '1. FSV Mainz 05', shortName: 'Mainz', tla: 'M05', crest: 'https://crests.football-data.org/15.png', venue: 'Mewa Arena' },
    { id: 2, name: 'TSG 1899 Hoffenheim', shortName: 'Hoffenheim', tla: 'TSG', crest: 'https://crests.football-data.org/2.png', venue: 'PreZero Arena' },
    { id: 1912, name: 'FC St. Pauli', shortName: 'St. Pauli', tla: 'STP', crest: 'https://crests.football-data.org/19.png', venue: 'Millerntor-Stadion' },
    { id: 720, name: 'Holstein Kiel', shortName: 'Holstein Kiel', tla: 'KSV', crest: 'https://crests.football-data.org/720.png', venue: 'Holstein-Stadion' },
    { id: 36, name: 'VfL Bochum 1848', shortName: 'Bochum', tla: 'BOC', crest: 'https://crests.football-data.org/36.png', venue: 'Vonovia Ruhrstadion' }
  ],

  // Ligue 1 (18 Teams - 34 Matchdays)
  FL1: [
    { id: 524, name: 'Paris Saint-Germain FC', shortName: 'PSG', tla: 'PSG', crest: 'https://crests.football-data.org/524.png', venue: 'Parc des Princes' },
    { id: 548, name: 'AS Monaco FC', shortName: 'Monaco', tla: 'ASM', crest: 'https://crests.football-data.org/548.png', venue: 'Stade Louis II' },
    { id: 516, name: 'Olympique de Marseille', shortName: 'Marseille', tla: 'OM', crest: 'https://crests.football-data.org/516.png', venue: 'Orange Vélodrome' },
    { id: 521, name: 'LOSC Lille', shortName: 'Lille', tla: 'LIL', crest: 'https://crests.football-data.org/521.png', venue: 'Decathlon Arena' },
    { id: 523, name: 'Olympique Lyonnais', shortName: 'Lyon', tla: 'OL', crest: 'https://crests.football-data.org/523.png', venue: 'Groupama Stadium' },
    { id: 522, name: 'OGC Nice', shortName: 'Nice', tla: 'NIC', crest: 'https://crests.football-data.org/522.png', venue: 'Allianz Riviera' },
    { id: 546, name: 'RC Lens', shortName: 'Lens', tla: 'RCL', crest: 'https://crests.football-data.org/546.png', venue: 'Stade Bollaert-Delelis' },
    { id: 547, name: 'Stade de Reims', shortName: 'Reims', tla: 'SDR', crest: 'https://crests.football-data.org/547.png', venue: 'Auguste-Delaune' },
    { id: 529, name: 'Stade Rennais FC 1901', shortName: 'Rennes', tla: 'SRFC', crest: 'https://crests.football-data.org/529.png', venue: 'Roazhon Park' },
    { id: 576, name: 'RC Strasbourg Alsace', shortName: 'Strasbourg', tla: 'RCS', crest: 'https://crests.football-data.org/576.png', venue: 'La Meinau' },
    { id: 512, name: 'Stade Brestois 29', shortName: 'Brest', tla: 'SB29', crest: 'https://crests.football-data.org/512.png', venue: 'Francis-Le Blé' },
    { id: 519, name: 'AJ Auxerre', shortName: 'Auxerre', tla: 'AJA', crest: 'https://crests.football-data.org/519.png', venue: 'Abbé-Deschamps' },
    { id: 511, name: 'Toulouse FC', shortName: 'Toulouse', tla: 'TFC', crest: 'https://crests.football-data.org/511.png', venue: 'Stadium de Toulouse' },
    { id: 543, name: 'FC Nantes', shortName: 'Nantes', tla: 'FCN', crest: 'https://crests.football-data.org/543.png', venue: 'La Beaujoire' },
    { id: 532, name: 'Angers SCO', shortName: 'Angers', tla: 'ANG', crest: 'https://crests.football-data.org/532.png', venue: 'Raymond Kopa' },
    { id: 527, name: 'AS Saint-Étienne', shortName: 'Saint-Étienne', tla: 'ASSE', crest: 'https://crests.football-data.org/527.png', venue: 'Geoffroy-Guichard' },
    { id: 538, name: 'Le Havre AC', shortName: 'Le Havre', tla: 'HAC', crest: 'https://crests.football-data.org/538.png', venue: 'Stade Océane' },
    { id: 518, name: 'Montpellier HSC', shortName: 'Montpellier', tla: 'MHSC', crest: 'https://crests.football-data.org/518.png', venue: 'La Mosson' }
  ]
};
