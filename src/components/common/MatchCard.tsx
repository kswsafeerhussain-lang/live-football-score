/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Professional Football Match Card
 */

import React from 'react';
import { Match } from '../../types/football';
import { TeamBadge } from './TeamBadge';
import { useGoalPulse } from '../../context/GoalPulseContext';
import { Star, ChevronRight, Activity, Clock } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  featured?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, featured = false }) => {
  const { setSelectedMatch, toggleFavorite, isFavorite, yesterdayDateStr, tomorrowDateStr } = useGoalPulse();
  const isFav = isFavorite('match', match.id);

  const isLive = ['LIVE', 'ET', 'PEN'].includes(match.status);
  const isHT = match.status === 'HT';
  const isFT = match.status === 'FT';
  const isUpcoming = match.status === 'NS';

  const matchDateOnly = match.utcDate.split('T')[0];
  const isYesterday = matchDateOnly === yesterdayDateStr;
  const isTomorrow = matchDateOnly === tomorrowDateStr;

  const formatMatchTime = (utcDate: string) => {
    try {
      const d = new Date(utcDate);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Upcoming';
    }
  };

  // Extract recent goal scorers for summary line
  const goalEvents = match.events?.filter(e => e.type === 'goal') || [];

  return (
    <div
      onClick={() => setSelectedMatch(match)}
      className={`group relative rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden ${
        featured
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-emerald-500/30 hover:border-emerald-500/60 shadow-lg shadow-emerald-950/20'
          : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700 shadow-md'
      }`}
    >
      {/* Top Bar: Competition & Status */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-800/80 bg-slate-950/40 text-xs">
        <div className="flex items-center gap-2 truncate">
          <img
            src={match.competition.emblemUrl}
            alt={match.competition.name}
            className="w-4 h-4 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-semibold text-slate-300 truncate tracking-wide">
            {match.competition.name}
          </span>
          {match.matchday && (
            <span className="text-slate-500 hidden sm:inline">
              • MD {match.matchday}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isLive && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>{match.minute}&apos; LIVE</span>
            </div>
          )}

          {isHT && (
            <div className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[11px]">
              HT
            </div>
          )}

          {isFT && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-semibold text-[11px]">
              <span>FT</span>
              {isYesterday && <span className="text-[10px] text-blue-400 font-normal">• Yesterday</span>}
            </div>
          )}

          {isUpcoming && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-emerald-400 font-medium text-[11px]">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>{isTomorrow ? `Tomorrow ${formatMatchTime(match.utcDate)}` : formatMatchTime(match.utcDate)}</span>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite('match', match.id);
            }}
            className={`p-1 rounded-md transition-colors ${
              isFav ? 'text-amber-400 hover:text-amber-300' : 'text-slate-500 hover:text-slate-300'
            }`}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Scoreboard Body */}
      <div className="p-4">
        {/* Home Team Row */}
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-3 min-w-0">
            <TeamBadge name={match.homeTeam.name} crestUrl={match.homeTeam.crest} tla={match.homeTeam.tla} size="sm" />
            <span className={`text-sm font-semibold truncate ${
              match.score.home !== null && match.score.away !== null && match.score.home > match.score.away
                ? 'text-white'
                : 'text-slate-200'
            }`}>
              {match.homeTeam.name}
            </span>
          </div>
          <span className={`text-base font-mono font-bold shrink-0 ml-4 ${
            isLive ? 'text-emerald-400' : 'text-white'
          }`}>
            {match.score.home !== null ? match.score.home : '-'}
          </span>
        </div>

        {/* Away Team Row */}
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-3 min-w-0">
            <TeamBadge name={match.awayTeam.name} crestUrl={match.awayTeam.crest} tla={match.awayTeam.tla} size="sm" />
            <span className={`text-sm font-semibold truncate ${
              match.score.home !== null && match.score.away !== null && match.score.away > match.score.home
                ? 'text-white'
                : 'text-slate-200'
            }`}>
              {match.awayTeam.name}
            </span>
          </div>
          <span className={`text-base font-mono font-bold shrink-0 ml-4 ${
            isLive ? 'text-emerald-400' : 'text-white'
          }`}>
            {match.score.away !== null ? match.score.away : '-'}
          </span>
        </div>

        {/* Goal Scorers Snippet if available */}
        {goalEvents.length > 0 && (
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-start gap-1.5 text-[11px] text-slate-400">
            <span className="text-emerald-400 shrink-0">⚽</span>
            <p className="truncate">
              {goalEvents.map(g => `${g.player} ${g.minute}'`).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Footer Details: Stadium & Action */}
      <div className="px-3.5 py-2 bg-slate-950/20 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span className="truncate">{match.venue}</span>
        <div className="flex items-center gap-1 text-emerald-400/80 font-medium group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all">
          <span>Match Center</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
