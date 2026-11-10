/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Comprehensive Match Details Center
 * Tabs: Overview, Statistics, Lineups (2D pitch), Match Events, Commentary
 */

import React, { useState } from 'react';
import { Match, MatchStatistics } from '../../types/football';
import { TeamBadge } from '../common/TeamBadge';
import { useGoalPulse } from '../../context/GoalPulseContext';
import { 
  X, 
  Clock, 
  MapPin, 
  User, 
  Layers, 
  Activity, 
  BarChart2, 
  Users, 
  MessageSquare, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface MatchDetailsModalProps {
  match: Match | null;
  onClose: () => void;
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ match, onClose }) => {
  const { 
    pushEventToStack, 
    setActiveTab,
    triggerGoalSimulation,
    triggerCardSimulation,
    triggerVarRollbackSimulation
  } = useGoalPulse();
  const [activeTabName, setActiveTabName] = useState<'overview' | 'stats' | 'lineups' | 'events' | 'commentary'>('overview');
  const [pushedEventIds, setPushedEventIds] = useState<Record<string, boolean>>({});

  if (!match) return null;

  const isLive = ['LIVE', 'ET', 'PEN'].includes(match.status);
  const isHT = match.status === 'HT';
  const isFT = match.status === 'FT';

  const handlePushToStack = (event: any) => {
    pushEventToStack(event);
    setPushedEventIds(prev => ({ ...prev, [event.id]: true }));
  };

  const stats = match.statistics || {
    possession: [50, 50],
    shotsTotal: [12, 10],
    shotsOnTarget: [5, 4],
    corners: [5, 4],
    fouls: [10, 11],
    yellowCards: [2, 2],
    redCards: [0, 0],
    passAccuracy: [85, 83],
    offsides: [2, 1],
    bigChances: [2, 2],
    goalkeeperSaves: [3, 4]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="relative px-6 py-5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <img
                src={match.competition.emblemUrl}
                alt={match.competition.name}
                className="w-4 h-4 object-contain"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span className="text-white">{match.competition.name}</span>
              {match.matchday && <span>• Matchday {match.matchday}</span>}
              <span>• {match.competition.season}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scoreboard Banner */}
          <div className="grid grid-cols-7 items-center gap-2 py-2">
            
            {/* Home Team */}
            <div className="col-span-3 flex flex-col items-center sm:flex-row sm:justify-end gap-3 text-center sm:text-right">
              <span className="order-2 sm:order-1 text-sm sm:text-base font-bold text-white truncate max-w-[150px] sm:max-w-[200px]">
                {match.homeTeam.name}
              </span>
              <TeamBadge name={match.homeTeam.name} crestUrl={match.homeTeam.crest} tla={match.homeTeam.tla} size="lg" className="order-1 sm:order-2" />
            </div>

            {/* Score & Time Center */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              {match.score.home !== null && match.score.away !== null ? (
                <div className="flex items-center gap-1.5 font-mono text-2xl sm:text-4xl font-black text-white tracking-wider">
                  <span>{match.score.home}</span>
                  <span className="text-slate-600">:</span>
                  <span>{match.score.away}</span>
                </div>
              ) : (
                <span className="text-xl font-bold text-slate-500">VS</span>
              )}

              {/* Status Indicator */}
              <div className="mt-2">
                {isLive && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 font-bold text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                    {match.minute}&apos; LIVE
                  </span>
                )}
                {isHT && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs border border-amber-500/40">
                    Half Time
                  </span>
                )}
                {isFT && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700">
                    Full Time
                  </span>
                )}
                {match.status === 'NS' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 font-medium text-xs border border-emerald-500/30">
                    Upcoming
                  </span>
                )}
              </div>
            </div>

            {/* Away Team */}
            <div className="col-span-3 flex flex-col items-center sm:flex-row sm:justify-start gap-3 text-center sm:text-left">
              <TeamBadge name={match.awayTeam.name} crestUrl={match.awayTeam.crest} tla={match.awayTeam.tla} size="lg" />
              <span className="text-sm sm:text-base font-bold text-white truncate max-w-[150px] sm:max-w-[200px]">
                {match.awayTeam.name}
              </span>
            </div>
          </div>

          {/* Subheader info: Venue & Referee */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {match.venue}
            </span>
            {match.referee && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-500" />
                Ref: {match.referee}
              </span>
            )}
          </div>
        </div>

        {/* Teacher Demonstration Live Control Bar */}
        {isLive && (
          <div className="px-6 py-2.5 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Teacher Live Action:</span>
              <span className="text-slate-400 font-normal hidden sm:inline">Test real-time event pushing and LIFO Stack pop</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => triggerGoalSimulation(match.id, 'home')}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold transition-colors"
                title="Scores a goal for home team and pushes to Stack"
              >
                ⚽ + Goal ({match.homeTeam.shortName})
              </button>
              <button
                type="button"
                onClick={() => triggerGoalSimulation(match.id, 'away')}
                className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 font-bold transition-colors"
                title="Scores a goal for away team and pushes to Stack"
              >
                ⚽ + Goal ({match.awayTeam.shortName})
              </button>
              <button
                type="button"
                onClick={() => triggerVarRollbackSimulation(match.id, 'VAR Review: Offside in the buildup overturned the goal')}
                className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold transition-colors flex items-center gap-1"
                title="Reverts the goal using Stack pop() - LIFO principle"
              >
                <RotateCcw className="w-3 h-3" />
                <span>VAR Overturn (Pop)</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-4 overflow-x-auto text-xs">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'stats', label: 'Statistics', icon: BarChart2 },
            { id: 'lineups', label: 'Lineups & Pitch', icon: Users },
            { id: 'events', label: 'Match Events', icon: Layers },
            { id: 'commentary', label: 'Commentary', icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTabName === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabName(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Tab Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTabName === 'overview' && (
            <div className="space-y-6">
              {/* Win Probability / Momentum Indicator */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-white">{match.homeTeam.shortName}</span>
                  <span className="text-slate-400">Match Momentum & Possession</span>
                  <span className="text-white">{match.awayTeam.shortName}</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${stats.possession[0]}%` }}
                  />
                  <div 
                    className="bg-blue-500 h-full transition-all duration-500" 
                    style={{ width: `${stats.possession[1]}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono mt-1.5 text-slate-400">
                  <span>{stats.possession[0]}%</span>
                  <span>Possession</span>
                  <span>{stats.possession[1]}%</span>
                </div>
              </div>

              {/* Key Timeline Events in Overview */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Key Timeline Incidents
                </h4>
                {match.events && match.events.length > 0 ? (
                  <div className="space-y-2">
                    {match.events.map((evt) => (
                      <div
                        key={evt.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono font-bold">
                            {evt.minute}&apos;
                          </span>
                          <span className="text-base">
                            {evt.type === 'goal' ? '⚽' : evt.type === 'yellow_card' ? '🟨' : evt.type === 'red_card' ? '🟥' : evt.type === 'var_decision' ? '📺' : '🔄'}
                          </span>
                          <div>
                            <span className="font-bold text-white mr-1.5">{evt.player}</span>
                            <span className="text-slate-400">({evt.team})</span>
                            <p className="text-[11px] text-slate-400 mt-0.5">{evt.description}</p>
                          </div>
                        </div>

                        {/* Push to DSA Stack Button */}
                        <button
                          type="button"
                          onClick={() => handlePushToStack(evt)}
                          disabled={pushedEventIds[evt.id]}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${
                            pushedEventIds[evt.id]
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          }`}
                        >
                          <Layers className="w-3 h-3 text-emerald-400" />
                          <span>{pushedEventIds[evt.id] ? 'On Stack' : 'Push to Stack'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800/50">
                    No major incidents recorded yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: STATISTICS */}
          {activeTabName === 'stats' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-2 pb-2 border-b border-slate-800">
                <span className="text-emerald-400">{match.homeTeam.shortName}</span>
                <span className="uppercase tracking-wider">Comparative Stats</span>
                <span className="text-blue-400">{match.awayTeam.shortName}</span>
              </div>

              {[
                { label: 'Ball Possession (%)', home: stats.possession[0], away: stats.possession[1], isPercent: true },
                { label: 'Expected Goals (xG)', home: stats.xg ? stats.xg[0] : 1.8, away: stats.xg ? stats.xg[1] : 1.1 },
                { label: 'Total Shots', home: stats.shotsTotal[0], away: stats.shotsTotal[1] },
                { label: 'Shots on Target', home: stats.shotsOnTarget[0], away: stats.shotsOnTarget[1] },
                { label: 'Corner Kicks', home: stats.corners[0], away: stats.corners[1] },
                { label: 'Fouls Committed', home: stats.fouls[0], away: stats.fouls[1] },
                { label: 'Yellow Cards', home: stats.yellowCards[0], away: stats.yellowCards[1] },
                { label: 'Red Cards', home: stats.redCards[0], away: stats.redCards[1] },
                { label: 'Pass Accuracy (%)', home: stats.passAccuracy[0], away: stats.passAccuracy[1], isPercent: true },
                { label: 'Goalkeeper Saves', home: stats.goalkeeperSaves[0], away: stats.goalkeeperSaves[1] }
              ].map((stat, idx) => {
                const total = Number(stat.home) + Number(stat.away) || 1;
                const homeRatio = Math.round((Number(stat.home) / total) * 100);
                const awayRatio = 100 - homeRatio;

                return (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs">
                    <div className="flex items-center justify-between mb-1.5 font-semibold">
                      <span className="font-mono text-white text-sm">{stat.home}{stat.isPercent ? '%' : ''}</span>
                      <span className="text-slate-400 text-[11px]">{stat.label}</span>
                      <span className="font-mono text-white text-sm">{stat.away}{stat.isPercent ? '%' : ''}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${homeRatio}%` }}
                      />
                      <div 
                        className="bg-blue-500 h-full transition-all duration-300"
                        style={{ width: `${awayRatio}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: LINEUPS & 2D PITCH */}
          {activeTabName === 'lineups' && (
            <div className="space-y-6">
              {match.lineups ? (
                <>
                  {/* Coach & Formations Bar */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block mb-1">Home Formation</span>
                      <span className="text-base font-bold text-white">{match.lineups.home.formation}</span>
                      <span className="block text-[11px] text-emerald-400 mt-1">Coach: {match.lineups.home.coach}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block mb-1">Away Formation</span>
                      <span className="text-base font-bold text-white">{match.lineups.away.formation}</span>
                      <span className="block text-[11px] text-blue-400 mt-1">Coach: {match.lineups.away.coach}</span>
                    </div>
                  </div>

                  {/* 2D Tactical Football Pitch */}
                  <div className="relative w-full aspect-[16/11] bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 rounded-2xl border-4 border-emerald-800/80 shadow-2xl overflow-hidden p-4">
                    {/* Pitch markings */}
                    <div className="absolute inset-4 border-2 border-white/20 rounded pointer-events-none" />
                    {/* Halfway line */}
                    <div className="absolute left-4 right-4 top-1/2 h-[2px] bg-white/20 -translate-y-1/2 pointer-events-none" />
                    {/* Center circle */}
                    <div className="absolute left-1/2 top-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 border-2 border-white/20 rounded-full pointer-events-none" />
                    {/* Penalty box top */}
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 w-48 h-20 border-2 border-white/20 border-t-0 pointer-events-none" />
                    {/* Penalty box bottom */}
                    <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-48 h-20 border-2 border-white/20 border-b-0 pointer-events-none" />

                    {/* Away Starting XI Players (Top Half) */}
                    {match.lineups.away.startingXI.map((player) => (
                      <div
                        key={player.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                        style={{ left: `${player.grid.x}%`, top: `${player.grid.y}%` }}
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 border-2 border-white text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          {player.number}
                        </div>
                        <span className="mt-0.5 text-[9px] sm:text-[10px] font-bold text-white bg-black/70 px-1 rounded truncate max-w-[65px] text-center">
                          {player.name.split(' ').pop()}
                        </span>
                      </div>
                    ))}

                    {/* Home Starting XI Players (Bottom Half) */}
                    {match.lineups.home.startingXI.map((player) => (
                      <div
                        key={player.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                        style={{ left: `${player.grid.x}%`, top: `${player.grid.y}%` }}
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600 border-2 border-white text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          {player.number}
                        </div>
                        <span className="mt-0.5 text-[9px] sm:text-[10px] font-bold text-white bg-black/70 px-1 rounded truncate max-w-[65px] text-center">
                          {player.name.split(' ').pop()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Substitutes List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <h5 className="font-bold text-white mb-2">{match.homeTeam.shortName} Substitutes</h5>
                      <div className="space-y-1.5 text-slate-300">
                        {match.lineups.home.substitutes.map(sub => (
                          <div key={sub.id} className="flex items-center justify-between">
                            <span>#{sub.number} {sub.name}</span>
                            <span className="text-slate-500 font-mono">{sub.position}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <h5 className="font-bold text-white mb-2">{match.awayTeam.shortName} Substitutes</h5>
                      <div className="space-y-1.5 text-slate-300">
                        {match.lineups.away.substitutes.map(sub => (
                          <div key={sub.id} className="flex items-center justify-between">
                            <span>#{sub.number} {sub.name}</span>
                            <span className="text-slate-500 font-mono">{sub.position}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
                  Detailed starting XI lineups are confirmed 60 minutes prior to kickoff.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MATCH EVENTS (DSA CONNECTED) */}
          {activeTabName === 'events' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    Stack Event Management
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Click &apos;Push to Stack&apos; to push any event onto the LIFO Match Event Stack.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setActiveTab('stack');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md"
                >
                  Open Stack Visualizer
                </button>
              </div>

              {match.events && match.events.length > 0 ? (
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                  {match.events.map((evt) => (
                    <div key={evt.id} className="relative flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      {/* Timeline dot */}
                      <div className="absolute -left-6 top-4 w-3.5 h-3.5 rounded-full border-2 border-slate-900 bg-emerald-500" />

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono font-bold text-xs">
                            {evt.minute}&apos;
                          </span>
                          <span className="text-xs font-bold text-white">{evt.player}</span>
                          <span className="text-[11px] text-slate-400">({evt.team})</span>
                          {evt.scoreAfter && (
                            <span className="px-2 py-0.2 rounded-full bg-slate-800 text-white font-mono text-[11px] font-bold">
                              {evt.scoreAfter}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300">{evt.description}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePushToStack(evt)}
                        disabled={pushedEventIds[evt.id]}
                        className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          pushedEventIds[evt.id]
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>{pushedEventIds[evt.id] ? 'Pushed' : 'Push'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-slate-500 text-xs">No recorded match events.</p>
              )}
            </div>
          )}

          {/* TAB 5: COMMENTARY */}
          {activeTabName === 'commentary' && (
            <div className="space-y-3">
              {match.commentary && match.commentary.length > 0 ? (
                match.commentary.map((comm) => (
                  <div
                    key={comm.id}
                    className={`p-3.5 rounded-xl border text-xs ${
                      comm.isKeyMoment
                        ? 'bg-slate-950 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-950/50 border-slate-800/80 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono font-bold">
                        {comm.minute}&apos;
                      </span>
                      {comm.isKeyMoment && (
                        <span className="px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 font-bold text-[10px] uppercase">
                          Key Moment
                        </span>
                      )}
                      {comm.score && (
                        <span className="font-mono font-bold text-white text-xs">
                          Score: {comm.score}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-200 leading-relaxed">{comm.text}</p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Live commentary feed updates continuously as match action unfolds.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>GoalPulse Live Tracker • Powered by DSA Stack ADT</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Center
          </button>
        </div>
      </div>
    </div>
  );
};
