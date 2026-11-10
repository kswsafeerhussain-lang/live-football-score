/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - League Section Component
 * Handles Premier League, Champions League, La Liga, Bundesliga, Serie A, and Ligue 1.
 * Features: Full Matchdays 1 to 38 fixture calendar, Matchday navigation, and Standings Table.
 */

import React, { useState, useMemo } from 'react';
import { Competition, CompetitionStandings, Match } from '../../types/football';
import { useGoalPulse } from '../../context/GoalPulseContext';
import { MatchCard } from '../common/MatchCard';
import { TeamBadge } from '../common/TeamBadge';
import { footballApi } from '../../services/footballApi';
import { 
  Trophy, 
  Calendar, 
  Table as TableIcon, 
  ChevronLeft, 
  ChevronRight, 
  Radio, 
  Clock, 
  CheckCircle2, 
  Layers,
  Sparkles
} from 'lucide-react';

interface LeagueViewProps {
  competition: Competition;
  standings?: CompetitionStandings;
}

export const LeagueView: React.FC<LeagueViewProps> = ({ competition, standings }) => {
  const { matches } = useGoalPulse();
  const [activeSubTab, setActiveSubTab] = useState<'matchdays' | 'standings'>('matchdays');

  const isDomesticLeague = ['PL', 'PD', 'SA', 'BL1', 'FL1'].includes(competition.code);
  const maxMatchdays = competition.code === 'BL1' || competition.code === 'FL1' ? 34 : (isDomesticLeague ? 38 : 8);

  const currentMatchday = competition.currentMatchday || 11;
  const [selectedMatchday, setSelectedMatchday] = useState<number>(currentMatchday);
  const [viewFilter, setViewFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED'>('ALL');

  // Load full season fixtures for domestic leagues from the Round-Robin Tournament Scheduler
  const fullSeasonMatches = useMemo(() => {
    if (isDomesticLeague) {
      return footballApi.getFullSeasonFixtures(competition.code as any);
    }
    // For Champions League, filter from live matches
    return matches.filter(m => m.competition.code === competition.code);
  }, [competition.code, isDomesticLeague, matches]);

  // Matches for the chosen matchday
  const matchdayMatches = useMemo(() => {
    // If current matchday is selected, merge any live simulated match data
    const list = fullSeasonMatches.filter(m => m.matchday === selectedMatchday);

    if (selectedMatchday === currentMatchday) {
      // Find live matches in context for this competition and replace
      const liveMatches = matches.filter(m => m.competition.code === competition.code && ['LIVE', 'HT', 'ET'].includes(m.status));
      if (liveMatches.length > 0) {
        return list.map(m => {
          const live = liveMatches.find(lm => lm.homeTeam.name === m.homeTeam.name || lm.awayTeam.name === m.awayTeam.name);
          return live || m;
        });
      }
    }

    return list;
  }, [fullSeasonMatches, selectedMatchday, currentMatchday, matches, competition.code]);

  // Filtered by status chip
  const displayedMatches = useMemo(() => {
    return matchdayMatches.filter(m => {
      if (viewFilter === 'ALL') return true;
      if (viewFilter === 'LIVE') return ['LIVE', 'HT', 'ET', 'PEN'].includes(m.status);
      if (viewFilter === 'UPCOMING') return m.status === 'NS';
      if (viewFilter === 'FINISHED') return m.status === 'FT';
      return true;
    });
  }, [matchdayMatches, viewFilter]);

  const liveInLeague = matches.filter(m => m.competition.code === competition.code && ['LIVE', 'HT', 'ET'].includes(m.status));

  return (
    <div className="space-y-6">
      
      {/* Competition Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 p-2.5 flex items-center justify-center shadow-inner shrink-0">
              <img
                src={competition.emblemUrl}
                alt={competition.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{competition.country === 'England' ? '🇬🇧' : competition.country === 'Spain' ? '🇪🇸' : competition.country === 'Germany' ? '🇩🇪' : competition.country === 'Italy' ? '🇮🇹' : competition.country === 'France' ? '🇫🇷' : '🇪🇺'}</span>
                <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
                  {competition.country} • {competition.season}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {competition.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {liveInLeague.length > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                {liveInLeague.length} In-Play Live
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs">
              Season: {maxMatchdays} Rounds
            </span>
          </div>
        </div>

        {/* Sub Navigation Bar: Matchdays vs Standings */}
        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveSubTab('matchdays')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeSubTab === 'matchdays'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Fixtures & Results (MD 1 - {maxMatchdays})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('standings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeSubTab === 'standings'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Standings Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: MATCHDAYS 1 TO 38 BROWSER */}
      {activeSubTab === 'matchdays' && (
        <div className="space-y-6">
          
          {/* Matchday Selector Controls */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              {/* Prev / Dropdown / Next */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedMatchday <= 1}
                  onClick={() => setSelectedMatchday(m => Math.max(1, m - 1))}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  title="Previous Matchday"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Matchday Select Dropdown */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedMatchday}
                    onChange={(e) => setSelectedMatchday(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {Array.from({ length: maxMatchdays }, (_, i) => i + 1).map((md) => (
                      <option key={md} value={md}>
                        Matchday {md} {md === currentMatchday ? '(Current / Live)' : md < currentMatchday ? '(Results)' : '(Upcoming)'}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  disabled={selectedMatchday >= maxMatchdays}
                  onClick={() => setSelectedMatchday(m => Math.min(maxMatchdays, m + 1))}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  title="Next Matchday"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Quick Button to Jump to Current Matchday */}
                <button
                  type="button"
                  onClick={() => setSelectedMatchday(currentMatchday)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedMatchday === currentMatchday
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
                  }`}
                >
                  Current Round (MD {currentMatchday})
                </button>
              </div>

              {/* Status Filter Chips for this Matchday */}
              <div className="flex items-center gap-1.5 text-xs">
                {(['ALL', 'LIVE', 'UPCOMING', 'FINISHED'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setViewFilter(s)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      viewFilter === s
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s === 'ALL' ? 'All' : s === 'LIVE' ? 'Live' : s === 'UPCOMING' ? 'Upcoming' : 'Finished'}
                  </button>
                ))}
              </div>
            </div>

            {/* Matchday Meta Information Banner */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                {selectedMatchday < currentMatchday ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Completed Results for Matchday {selectedMatchday}</span>
                  </>
                ) : selectedMatchday === currentMatchday ? (
                  <>
                    <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span className="text-white font-bold">In-Progress & Scheduled Matches for Matchday {selectedMatchday}</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Upcoming Scheduled Fixtures for Matchday {selectedMatchday}</span>
                  </>
                )}
              </span>
              <span className="font-mono text-slate-500">
                {matchdayMatches.length} Fixtures in Round
              </span>
            </div>
          </div>

          {/* Matchday Matches Grid */}
          <div className="space-y-4">
            {displayedMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedMatches.map((m) => (
                  <MatchCard key={m.id} match={m} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
                <Calendar className="w-10 h-10 mx-auto text-slate-700 mb-2" />
                <p className="text-sm font-semibold text-slate-400">No matches found for this filter in Matchday {selectedMatchday}</p>
                <button
                  type="button"
                  onClick={() => setViewFilter('ALL')}
                  className="mt-2 text-xs text-emerald-400 hover:underline"
                >
                  Show all fixtures in Matchday {selectedMatchday}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: STANDINGS TABLE */}
      {activeSubTab === 'standings' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-400" />
              {competition.name} Table Standings
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Season: {standings?.season || '2024/25'}
            </span>
          </div>

          {standings?.table && standings.table.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3 w-10 text-center">#</th>
                    <th className="p-3">Club</th>
                    <th className="p-3 text-center">MP</th>
                    <th className="p-3 text-center">W</th>
                    <th className="p-3 text-center">D</th>
                    <th className="p-3 text-center">L</th>
                    <th className="p-3 text-center hidden sm:table-cell">GF</th>
                    <th className="p-3 text-center hidden sm:table-cell">GA</th>
                    <th className="p-3 text-center">GD</th>
                    <th className="p-3 text-center font-bold text-white">Pts</th>
                    <th className="p-3 text-center hidden md:table-cell">Form</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {standings.table.map((row) => {
                    const isUclZone = row.position <= 4;
                    const isRelegation = row.position >= 18;

                    return (
                      <tr 
                        key={row.position} 
                        className="hover:bg-slate-850/60 transition-colors"
                      >
                        <td className="p-3 text-center font-mono font-bold">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                            isUclZone
                              ? 'bg-blue-950 text-blue-400 border border-blue-500/40'
                              : isRelegation
                              ? 'bg-red-950 text-red-400 border border-red-500/40'
                              : 'text-slate-400'
                          }`}>
                            {row.position}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <TeamBadge name={row.team.name} crestUrl={row.team.crest} tla={row.team.tla} size="sm" />
                            <span className="font-bold text-white hover:text-emerald-400 cursor-pointer">
                              {row.team.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-center font-mono">{row.playedGames}</td>
                        <td className="p-3 text-center font-mono text-emerald-400">{row.won}</td>
                        <td className="p-3 text-center font-mono text-amber-400">{row.draw}</td>
                        <td className="p-3 text-center font-mono text-red-400">{row.lost}</td>
                        <td className="p-3 text-center font-mono hidden sm:table-cell">{row.goalsFor}</td>
                        <td className="p-3 text-center font-mono hidden sm:table-cell">{row.goalsAgainst}</td>
                        <td className={`p-3 text-center font-mono font-semibold ${row.goalDifference > 0 ? 'text-emerald-400' : row.goalDifference < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                          {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                        </td>
                        <td className="p-3 text-center font-mono font-extrabold text-white text-sm bg-slate-950/40">
                          {row.points}
                        </td>
                        <td className="p-3 text-center hidden md:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            {row.form.map((res, idx) => (
                              <span
                                key={idx}
                                className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                                  res === 'W'
                                    ? 'bg-emerald-600 text-white'
                                    : res === 'D'
                                    ? 'bg-slate-700 text-slate-300'
                                    : 'bg-red-600 text-white'
                                }`}
                              >
                                {res}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-8 text-center text-slate-500 text-xs">Standings table not available.</p>
          )}

          {/* Table Legend */}
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>UEFA Champions League qualification</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>Relegation zone</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
