/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Full Season Fixtures Hub (Matchdays 1 to 38)
 * Dedicated calendar to browse all upcoming and completed fixtures for EPL, La Liga, Serie A, Bundesliga, and Ligue 1.
 */

import React, { useState, useMemo } from 'react';
import { useGoalPulse } from '../../context/GoalPulseContext';
import { footballApi } from '../../services/footballApi';
import { COMPETITIONS } from '../../data/mockFootballData';
import { MatchCard } from '../common/MatchCard';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Trophy, 
  Filter, 
  CheckCircle2,
  Sparkles,
  Search
} from 'lucide-react';

export const FixturesView: React.FC = () => {
  const { matches } = useGoalPulse();
  const [selectedLeague, setSelectedLeague] = useState<'PL' | 'PD' | 'SA' | 'BL1' | 'FL1'>('PL');
  
  const competition = COMPETITIONS[selectedLeague];
  const maxMatchdays = selectedLeague === 'BL1' || selectedLeague === 'FL1' ? 34 : 38;
  const currentMatchday = competition.currentMatchday || 11;
  
  // Default to the next upcoming matchday (e.g. Matchday 12) or allow browsing all
  const [selectedMatchday, setSelectedMatchday] = useState<number>(12);
  const [statusFilter, setStatusFilter] = useState<'UPCOMING' | 'ALL' | 'FINISHED'>('UPCOMING');
  const [clubSearch, setClubSearch] = useState<string>('');

  // Full season schedule from TournamentScheduler
  const seasonMatches = useMemo(() => {
    return footballApi.getFullSeasonFixtures(selectedLeague);
  }, [selectedLeague]);

  // Filter matches
  const filteredMatches = useMemo(() => {
    let list = seasonMatches.filter(m => m.matchday === selectedMatchday);

    if (statusFilter === 'UPCOMING') {
      list = list.filter(m => m.status === 'NS');
    } else if (statusFilter === 'FINISHED') {
      list = list.filter(m => m.status === 'FT');
    }

    if (clubSearch.trim().length > 0) {
      const q = clubSearch.toLowerCase();
      list = list.filter(m => 
        m.homeTeam.name.toLowerCase().includes(q) || 
        m.awayTeam.name.toLowerCase().includes(q)
      );
    }

    return list;
  }, [seasonMatches, selectedMatchday, statusFilter, clubSearch]);

  const upcomingRoundsCount = maxMatchdays - currentMatchday;

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                Season Fixtures Hub • Matchdays 1 to {maxMatchdays}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs">
                Round-Robin Algorithm
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Calendar className="w-8 h-8 text-emerald-400" />
              Full Season Match Fixtures
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Explore every single upcoming fixture and past result across Europe&apos;s top leagues from{' '}
              <strong className="text-white">Matchday 1 to Matchday {maxMatchdays}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
              {upcomingRoundsCount} Upcoming Rounds Ahead
            </span>
          </div>
        </div>

        {/* League Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { code: 'PL' as const, name: 'Premier League', flag: '🇬🇧', rounds: 38 },
            { code: 'PD' as const, name: 'La Liga', flag: '🇪🇸', rounds: 38 },
            { code: 'SA' as const, name: 'Serie A', flag: '🇮🇹', rounds: 38 },
            { code: 'BL1' as const, name: 'Bundesliga', flag: '🇩🇪', rounds: 34 },
            { code: 'FL1' as const, name: 'Ligue 1', flag: '🇫🇷', rounds: 34 }
          ].map((lg) => {
            const isActive = selectedLeague === lg.code;
            return (
              <button
                key={lg.code}
                type="button"
                onClick={() => {
                  setSelectedLeague(lg.code);
                  setSelectedMatchday(12); // Default to next round
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{lg.flag}</span>
                <span>{lg.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  MD 1-{lg.rounds}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Matchday Selector & Navigation Strip */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Controls: Prev, Select, Next */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={selectedMatchday <= 1}
              onClick={() => setSelectedMatchday(m => Math.max(1, m - 1))}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Previous Matchday"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dropdown for All 38 Matchdays */}
            <select
              value={selectedMatchday}
              onChange={(e) => setSelectedMatchday(Number(e.target.value))}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-extrabold text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {Array.from({ length: maxMatchdays }, (_, i) => i + 1).map((md) => (
                <option key={md} value={md}>
                  Matchday {md} {md === currentMatchday ? '• (Current Round)' : md > currentMatchday ? `• (Upcoming Fixture)` : `• (Completed Results)`}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={selectedMatchday >= maxMatchdays}
              onClick={() => setSelectedMatchday(m => Math.min(maxMatchdays, m + 1))}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Next Matchday"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Quick Jumps */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={() => setSelectedMatchday(12)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold ${selectedMatchday === 12 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
              >
                MD 12 (Next)
              </button>
              <button
                type="button"
                onClick={() => setSelectedMatchday(20)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold ${selectedMatchday === 20 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
              >
                MD 20 (Mid-Season)
              </button>
              <button
                type="button"
                onClick={() => setSelectedMatchday(maxMatchdays)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold ${selectedMatchday === maxMatchdays ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
              >
                MD {maxMatchdays} (Final Day)
              </button>
            </div>
          </div>

          {/* Search club & status filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={clubSearch}
                onChange={(e) => setClubSearch(e.target.value)}
                placeholder="Filter by club..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-36 sm:w-44"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setStatusFilter('UPCOMING')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  statusFilter === 'UPCOMING' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Upcoming Only
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  statusFilter === 'ALL' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('FINISHED')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  statusFilter === 'FINISHED' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Finished
              </button>
            </div>
          </div>

        </div>

        {/* Information ticker */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>Showing fixtures for <strong>{competition.name} • Matchday {selectedMatchday} of {maxMatchdays}</strong></span>
          </span>
          <span className="font-mono text-slate-500">
            {filteredMatches.length} Fixtures Found
          </span>
        </div>
      </div>

      {/* Fixtures Grid */}
      <div className="space-y-4">
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
            <Calendar className="w-10 h-10 mx-auto text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-400">No fixtures matching filter for Matchday {selectedMatchday}</p>
            <p className="text-xs text-slate-600 mt-1">Switch status filter to &apos;All&apos; to view all scheduled games.</p>
          </div>
        )}
      </div>

    </div>
  );
};
