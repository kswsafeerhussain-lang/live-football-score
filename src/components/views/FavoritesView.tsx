/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Favourites View
 * Displays bookmarked clubs, competitions, and matches saved in LocalStorage.
 */

import React from 'react';
import { useGoalPulse } from '../../context/GoalPulseContext';
import { MatchCard } from '../common/MatchCard';
import { Star, Shield, Trophy, Calendar } from 'lucide-react';
import { TEAMS } from '../../data/mockFootballData';
import { TeamBadge } from '../common/TeamBadge';

export const FavoritesView: React.FC = () => {
  const { matches, favorites, toggleFavorite, setActiveTab } = useGoalPulse();

  const favoriteMatches = matches.filter(m => favorites.matches.includes(m.id));
  const favoriteTeamsList = Object.values(TEAMS).filter(t => favorites.teams.includes(t.name));

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Your Favourites</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalized live scores for your pinned football clubs and saved matches.
            </p>
          </div>
        </div>
      </div>

      {/* Pinned Teams Strip */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          Pinned Clubs
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {Object.values(TEAMS).map((team) => {
            const isFav = favorites.teams.includes(team.name);
            return (
              <button
                key={team.id}
                type="button"
                onClick={() => toggleFavorite('team', team.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  isFav
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm'
                    : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400'
                }`}
              >
                <TeamBadge name={team.name} crestUrl={team.crest} tla={team.tla} size="sm" />
                <span>{team.shortName}</span>
                <Star className={`w-3.5 h-3.5 ml-1 ${isFav ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookmarked Matches Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          Starred Matches ({favoriteMatches.length})
        </h3>

        {favoriteMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
            <Star className="w-10 h-10 mx-auto text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-400">No matches starred yet</p>
            <p className="text-xs text-slate-600 mt-1">
              Click the star icon on any match card to track it directly here.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Browse Today&apos;s Matches
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
