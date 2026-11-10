/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Top Navigation Bar
 */

import React, { useState } from 'react';
import { useGoalPulse } from '../../context/GoalPulseContext';
import { 
  Activity, 
  Search, 
  RefreshCw, 
  Star, 
  Volume2, 
  VolumeX, 
  Layers, 
  Key, 
  Menu, 
  X,
  Calendar,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenApiModal: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApiModal,
  onToggleSidebar,
  isSidebarOpen
}) => {
  const {
    liveCount,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedDate,
    setSelectedDate,
    yesterdayDateStr,
    todayDateStr,
    tomorrowDateStr,
    refreshScores,
    isRefreshing,
    soundEnabled,
    setSoundEnabled,
    apiConfig,
    favorites,
    stackEvents
  } = useGoalPulse();

  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 lg:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('home');
              setStatusFilter('ALL');
              setSelectedDate(todayDateStr);
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 font-black text-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white">GOAL</span>
                <span className="text-lg font-black tracking-tight text-emerald-400">PULSE</span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-1 hidden sm:block font-medium tracking-wider uppercase">
                Live Scores & DSA Stack
              </p>
            </div>
          </button>
        </div>

        {/* Center: Live Pill & Date Filter Strip */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
          {/* Live Now Quick Button */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('home');
              setSelectedDate(todayDateStr);
              setStatusFilter('LIVE');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              (statusFilter === 'LIVE' || activeTab === 'live') && selectedDate === todayDateStr
                ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>LIVE NOW</span>
            {liveCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-red-950/80 text-[10px] text-red-200 border border-red-500/40">
                {liveCount}
              </span>
            )}
          </button>

          <div className="w-[1px] h-4 bg-slate-800 mx-1" />

          {/* Date Selector Pills */}
          <button
            type="button"
            onClick={() => {
              setSelectedDate(yesterdayDateStr);
              setStatusFilter('ALL');
              setActiveTab('home');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedDate === yesterdayDateStr
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            Yesterday
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedDate(todayDateStr);
              setStatusFilter('ALL');
              setActiveTab('home');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedDate === todayDateStr
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedDate(tomorrowDateStr);
              setStatusFilter('ALL');
              setActiveTab('home');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              selectedDate === tomorrowDateStr
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            Tomorrow
          </button>

          {/* Mini Date Picker input */}
          <div className="relative flex items-center pr-1">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                if (e.target.value) {
                  setSelectedDate(e.target.value);
                  setStatusFilter('ALL');
                  setActiveTab('home');
                }
              }}
              className="w-7 h-7 opacity-0 absolute cursor-pointer"
              title="Pick specific date"
            />
            <div className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 pointer-events-none">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Trigger / Input */}
          <div className="relative">
            <div className={`flex items-center rounded-lg bg-slate-900 border border-slate-800 focus-within:border-emerald-500 transition-all ${
              showSearchInput ? 'w-48 sm:w-64' : 'w-9 sm:w-44'
            }`}>
              <button
                type="button"
                onClick={() => setShowSearchInput(!showSearchInput)}
                className="p-2 text-slate-400 hover:text-slate-200 focus:outline-none"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clubs, leagues..."
                className={`w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none pr-3 ${
                  showSearchInput ? 'block' : 'hidden sm:block'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-500 hover:text-slate-300 pr-2"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* DSA Stack Direct Shortcut with items badge */}
          <button
            type="button"
            onClick={() => setActiveTab('stack')}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              activeTab === 'stack'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-950'
                : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
            title="Open DSA Match Event Stack Visualizer"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Stack</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
              {stackEvents.length}
            </span>
          </button>

          {/* API Provider Status Pill */}
          <button
            type="button"
            onClick={onOpenApiModal}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
              apiConfig.isDemoMode
                ? 'bg-amber-950/40 text-amber-300 border-amber-600/40 hover:bg-amber-900/40'
                : 'bg-emerald-950/40 text-emerald-300 border-emerald-600/40 hover:bg-emerald-900/40'
            }`}
            title="Configure Football Scores API Key"
          >
            <Key className="w-3 h-3" />
            <span>{apiConfig.isDemoMode ? 'Demo Mode' : 'Live API'}</span>
          </button>

          {/* Audio Whistle Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 focus:outline-none"
            title={soundEnabled ? 'Mute alert sound' : 'Enable alert sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Manual Refresh Button */}
          <button
            type="button"
            onClick={refreshScores}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 border border-slate-800 focus:outline-none transition-colors"
            title="Refresh Live Scores"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
