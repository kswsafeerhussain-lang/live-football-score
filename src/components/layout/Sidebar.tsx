/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Sidebar Navigation
 */

import React from 'react';
import { useGoalPulse } from '../../context/GoalPulseContext';
import { COMPETITIONS } from '../../data/mockFootballData';
import { 
  Home, 
  Radio, 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  Star, 
  Layers, 
  GraduationCap, 
  ChevronRight,
  ShieldAlert,
  Flame
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { 
    activeTab, 
    setActiveTab, 
    liveCount, 
    setStatusFilter, 
    stackEvents,
    favorites,
    setSelectedDate,
    yesterdayDateStr,
    todayDateStr,
    tomorrowDateStr
  } = useGoalPulse();

  const handleNavClick = (tabKey: string, status?: 'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED') => {
    setActiveTab(tabKey);
    if (tabKey === 'home') {
      setSelectedDate(todayDateStr);
      setStatusFilter('ALL');
    } else if (tabKey === 'live') {
      setSelectedDate(todayDateStr);
      setStatusFilter('LIVE');
    } else if (tabKey === 'fixtures') {
      setSelectedDate(tomorrowDateStr);
      setStatusFilter('UPCOMING');
    } else if (tabKey === 'results') {
      setSelectedDate(yesterdayDateStr);
      setStatusFilter('FINISHED');
    } else if (status) {
      setStatusFilter(status);
    }
    onClose();
  };

  const navItems = [
    { key: 'home', label: 'Home', icon: Home, status: 'ALL' as const },
    { key: 'live', label: 'Live Matches', icon: Radio, count: liveCount, badgeColor: 'bg-red-500 text-white', status: 'LIVE' as const },
    { key: 'fixtures', label: 'Season Fixtures (MD 1-38)', icon: Calendar, status: 'UPCOMING' as const },
    { key: 'results', label: 'Results (Yesterday)', icon: CheckCircle2, status: 'FINISHED' as const },
    { key: 'favorites', label: 'Favourites', icon: Star, count: favorites.teams.length + favorites.matches.length, badgeColor: 'bg-amber-500/20 text-amber-300' }
  ];

  const leagueItems = [
    { key: 'pl', code: 'PL', label: 'Premier League', flag: '🇬🇧', emblem: COMPETITIONS.PL.emblemUrl },
    { key: 'ucl', code: 'CL', label: 'Champions League', flag: '🇪🇺', emblem: COMPETITIONS.CL.emblemUrl },
    { key: 'laliga', code: 'PD', label: 'La Liga', flag: '🇪🇸', emblem: COMPETITIONS.PD.emblemUrl },
    { key: 'bundesliga', code: 'BL1', label: 'Bundesliga', flag: '🇩🇪', emblem: COMPETITIONS.BL1.emblemUrl },
    { key: 'seriea', code: 'SA', label: 'Serie A', flag: '🇮🇹', emblem: COMPETITIONS.SA.emblemUrl },
    { key: 'ligue1', code: 'FL1', label: 'Ligue 1', flag: '🇫🇷', emblem: COMPETITIONS.FL1.emblemUrl }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-6">
          
          {/* Main Navigation */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Scoreboard Hub
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleNavClick(item.key, item.status)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Competitions */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              <span>Competitions</span>
              <Trophy className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <nav className="space-y-1">
              {leagueItems.map((league) => {
                const isActive = activeTab === league.key;
                return (
                  <button
                    key={league.key}
                    type="button"
                    onClick={() => handleNavClick(league.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-slate-800 text-white font-bold border border-slate-700'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/80 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-sm shrink-0">{league.flag}</span>
                      <span className="truncate">{league.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? 'text-emerald-400 translate-x-0.5' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mandatory DSA Module Section */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-extrabold tracking-wider text-emerald-400 uppercase">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                DSA Implementation
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                CS-201
              </span>
            </div>

            <nav className="space-y-1.5">
              {/* Match Event Stack Interactive Tool */}
              <button
                type="button"
                onClick={() => handleNavClick('stack')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'stack'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${activeTab === 'stack' ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="leading-tight">Match Event Stack</p>
                    <p className={`text-[10px] font-normal ${activeTab === 'stack' ? 'text-slate-800' : 'text-slate-400'}`}>
                      LIFO Visualizer & VAR
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === 'stack' ? 'bg-slate-950 text-white' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {stackEvents.length} items
                </span>
              </button>

              {/* Academic About DSA Report */}
              <button
                type="button"
                onClick={() => handleNavClick('about-dsa')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'about-dsa'
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${activeTab === 'about-dsa' ? 'text-blue-400' : 'text-slate-400'}`} />
                <div className="text-left">
                  <span>About DSA Project</span>
                  <span className="block text-[10px] text-slate-500 font-normal">Report & Academic Docs</span>
                </div>
              </button>
            </nav>
          </div>

        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/40">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Sync Engine Active</span>
          </div>
          <p className="text-[10px] text-slate-600 mt-1">
            GoalPulse v2.4 • LIFO Stack ADT
          </p>
        </div>
      </aside>
    </>
  );
};
