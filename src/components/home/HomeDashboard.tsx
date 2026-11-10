/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Main Home Dashboard
 * Supports distinct match schedules for Yesterday (Results), Today (Live + Schedule), and Tomorrow (Fixtures),
 * with an interactive Teacher / Evaluator Referee Simulator.
 */

import React, { useState } from 'react';
import { useGoalPulse } from '../../context/GoalPulseContext';
import { MatchCard } from '../common/MatchCard';
import { COMPETITIONS } from '../../data/mockFootballData';
import { 
  Radio, 
  Flame, 
  Layers, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Star, 
  ChevronRight,
  TrendingUp,
  Shield,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const { 
    matches, 
    liveCount, 
    statusFilter, 
    setStatusFilter, 
    setActiveTab, 
    searchQuery,
    stackEvents,
    apiConfig,
    selectedDate,
    setSelectedDate,
    yesterdayDateStr,
    todayDateStr,
    tomorrowDateStr,
    triggerGoalSimulation,
    triggerVarRollbackSimulation
  } = useGoalPulse();

  const [selectedDemoMatchId, setSelectedDemoMatchId] = useState<string>('match-today-live-1');

  // 1. Filter by Selected Date
  const dateMatches = matches.filter((m) => {
    try {
      const matchDateStr = new Date(m.utcDate).toISOString().split('T')[0];
      return matchDateStr === selectedDate;
    } catch {
      return true;
    }
  });

  // 2. Filter by search query & status filter
  const displayedMatches = dateMatches.filter((m) => {
    // Search query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        m.homeTeam.name.toLowerCase().includes(q) ||
        m.awayTeam.name.toLowerCase().includes(q) ||
        m.competition.name.toLowerCase().includes(q) ||
        m.venue.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'LIVE') return ['LIVE', 'HT', 'ET', 'PEN'].includes(m.status);
    if (statusFilter === 'UPCOMING') return m.status === 'NS';
    if (statusFilter === 'FINISHED') return m.status === 'FT';
    return true;
  });

  // Category splits for Today
  const liveMatches = displayedMatches.filter(m => ['LIVE', 'HT', 'ET', 'PEN'].includes(m.status));
  const finishedToday = displayedMatches.filter(m => m.status === 'FT');
  const upcomingToday = displayedMatches.filter(m => m.status === 'NS');

  const isViewingYesterday = selectedDate === yesterdayDateStr;
  const isViewingToday = selectedDate === todayDateStr;
  const isViewingTomorrow = selectedDate === tomorrowDateStr;

  // Format date heading nicely
  const formatDateHeading = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T12:00:00');
      return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Teacher / Evaluator Interactive Demonstration Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                Teacher Demonstration Console
              </span>
              <span className="text-[11px] text-slate-400">Interactive live match & Stack tester</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Live Referee & Match Event Simulator
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Simulate in-game incidents (goals, fouls) that update scorelines and push onto the <strong>Stack</strong>, then test <strong>VAR Rollback</strong> using <code>pop()</code>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Pick match to simulate */}
            <select
              value={selectedDemoMatchId}
              onChange={(e) => setSelectedDemoMatchId(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="match-today-live-1">Man City vs Arsenal (Live)</option>
              <option value="match-today-live-2">Real Madrid vs Barcelona (Live)</option>
              <option value="match-today-live-3">Bayern vs Leverkusen (Live)</option>
              <option value="match-today-live-4">Inter vs Juventus (Live)</option>
            </select>

            <button
              type="button"
              onClick={() => triggerGoalSimulation(selectedDemoMatchId, 'home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-950"
              title="Simulates a home goal, increments scoreboard, and pushes event onto Stack"
            >
              <span>⚽ Goal (Home)</span>
            </button>

            <button
              type="button"
              onClick={() => triggerGoalSimulation(selectedDemoMatchId, 'away')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-950"
              title="Simulates an away goal, increments scoreboard, and pushes event onto Stack"
            >
              <span>⚽ Goal (Away)</span>
            </button>

            <button
              type="button"
              onClick={() => triggerVarRollbackSimulation(selectedDemoMatchId, 'VAR Overturn: Goal disallowed for offside in buildup')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-950"
              title="Reverts the goal using Stack pop() - LIFO principle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>VAR Rollback (Pop)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Date Switcher & Header Bar */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Active Date Title */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Schedule Date
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                isViewingYesterday
                  ? 'bg-blue-950 text-blue-400 border border-blue-500/30'
                  : isViewingToday
                  ? 'bg-red-950 text-red-400 border border-red-500/30'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
              }`}>
                {isViewingYesterday ? 'YESTERDAY RESULTS' : isViewingToday ? 'TODAY LIVE & SCHEDULE' : 'TOMORROW FIXTURES'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {formatDateHeading(selectedDate)}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isViewingYesterday && 'All matches completed. Explore final scores, goalscorers, and tactical statistics.'}
              {isViewingToday && `Live scores updating in real time (${liveMatches.length} in-play, ${finishedToday.length} completed earlier, ${upcomingToday.length} tonight).`}
              {isViewingTomorrow && 'Upcoming UEFA Champions League & European fixtures. Preview kickoff times and venues.'}
            </p>
          </div>

          {/* Quick Date Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => {
                setSelectedDate(yesterdayDateStr);
                setStatusFilter('ALL');
              }}
              className={`px-3 py-2 rounded-lg font-bold transition-all ${
                isViewingYesterday
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              Yesterday (FT)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDate(todayDateStr);
                setStatusFilter('ALL');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all ${
                isViewingToday
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>Today (Live)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDate(tomorrowDateStr);
                setStatusFilter('ALL');
              }}
              className={`px-3 py-2 rounded-lg font-bold transition-all ${
                isViewingTomorrow
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              Tomorrow (NS)
            </button>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {[
              { id: 'ALL', label: 'All on Date', count: dateMatches.length },
              ...(isViewingToday ? [{ id: 'LIVE', label: 'Live Now', count: liveMatches.length, badgeColor: 'bg-red-500 text-white' }] : []),
              { id: 'UPCOMING', label: 'Upcoming', count: displayedMatches.filter(m => m.status === 'NS').length },
              { id: 'FINISHED', label: 'Finished (FT)', count: displayedMatches.filter(m => m.status === 'FT').length }
            ].map((chip) => {
              const isActive = statusFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setStatusFilter(chip.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                      : 'bg-slate-950 hover:bg-slate-850 text-slate-400 border border-slate-800'
                  }`}
                >
                  <span>{chip.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-emerald-950 text-emerald-300' : chip.badgeColor || 'bg-slate-800 text-slate-400'
                  }`}>
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Showing: <strong className="text-white">{displayedMatches.length}</strong> matches</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: LIVE SPOTLIGHT (ONLY WHEN VIEWING TODAY WITH IN-PLAY MATCHES) */}
      {isViewingToday && liveMatches.length > 0 && statusFilter !== 'FINISHED' && statusFilter !== 'UPCOMING' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                IN-PLAY LIVE MATCHES
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold border border-red-500/40">
                  {liveMatches.length} Live
                </span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('stack')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View Stack Events ({stackEvents.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map((m) => (
              <MatchCard key={m.id} match={m} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: MATCH SCHEDULE ON THIS DATE */}
      <div className="space-y-4">
        {/* Section subtitle */}
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            {isViewingYesterday && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
            {isViewingToday && <Radio className="w-4 h-4 text-emerald-400" />}
            {isViewingTomorrow && <Clock className="w-4 h-4 text-emerald-400" />}
            <span>
              {isViewingYesterday ? 'Full Yesterday Results Feed' : isViewingTomorrow ? 'Tomorrow Scheduled Fixtures' : 'All Matches for Today'}
            </span>
          </h3>
        </div>

        {displayedMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
            <Calendar className="w-10 h-10 mx-auto text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-400">No matches found for this filter on {selectedDate}</p>
            <p className="text-xs text-slate-600 mt-1">Try switching to Yesterday, Today, or Tomorrow above.</p>
          </div>
        )}
      </div>

      {/* SECTION 3: POPULAR COMPETITIONS JUMP */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Explore Major Competitions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {Object.values(COMPETITIONS).map((comp) => (
            <button
              key={comp.code}
              type="button"
              onClick={() => {
                if (comp.code === 'PL') setActiveTab('pl');
                else if (comp.code === 'CL') setActiveTab('ucl');
                else if (comp.code === 'PD') setActiveTab('laliga');
                else if (comp.code === 'BL1') setActiveTab('bundesliga');
                else if (comp.code === 'SA') setActiveTab('seriea');
                else if (comp.code === 'FL1') setActiveTab('ligue1');
              }}
              className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 flex flex-col items-center text-center group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-950 p-2 flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                <img
                  src={comp.emblemUrl}
                  alt={comp.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate w-full">
                {comp.shortName}
              </span>
              <span className="text-[10px] text-slate-500">
                {comp.country}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
