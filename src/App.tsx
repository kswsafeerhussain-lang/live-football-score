/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Football Live Scores & Match Tracking Web Application
 * University DSA Project: Stack Data Structure (LIFO) Implementation
 */

import React, { useState } from 'react';
import { GoalPulseProvider, useGoalPulse } from './context/GoalPulseContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { HomeDashboard } from './components/home/HomeDashboard';
import { MatchDetailsModal } from './components/match/MatchDetailsModal';
import { MatchEventStackPanel } from './components/dsa/MatchEventStackPanel';
import { AboutDsaSection } from './components/dsa/AboutDsaSection';
import { LeagueView } from './components/league/LeagueView';
import { FavoritesView } from './components/views/FavoritesView';
import { FixturesView } from './components/views/FixturesView';
import { ApiConfigModal } from './components/config/ApiConfigModal';
import { NotificationToast } from './components/common/NotificationToast';
import { COMPETITIONS, LEAGUE_STANDINGS } from './data/mockFootballData';

const MainAppContent: React.FC = () => {
  const { 
    activeTab, 
    selectedMatch, 
    setSelectedMatch,
    liveCount 
  } = useGoalPulse();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Render view depending on active tab
  const renderCurrentView = () => {
    switch (activeTab) {
      case 'home':
      case 'live':
      case 'results':
        return <HomeDashboard />;
      
      case 'fixtures':
        return <FixturesView />;
      
      case 'pl':
        return <LeagueView competition={COMPETITIONS.PL} standings={LEAGUE_STANDINGS.PL} />;
      case 'ucl':
        return <LeagueView competition={COMPETITIONS.CL} standings={LEAGUE_STANDINGS.CL} />;
      case 'laliga':
        return <LeagueView competition={COMPETITIONS.PD} standings={LEAGUE_STANDINGS.PD} />;
      case 'bundesliga':
        return <LeagueView competition={COMPETITIONS.BL1} standings={LEAGUE_STANDINGS.BL1} />;
      case 'seriea':
        return <LeagueView competition={COMPETITIONS.SA} standings={LEAGUE_STANDINGS.SA} />;
      case 'ligue1':
        return <LeagueView competition={COMPETITIONS.FL1} standings={LEAGUE_STANDINGS.FL1} />;

      case 'favorites':
        return <FavoritesView />;

      case 'stack':
        return <MatchEventStackPanel />;

      case 'about-dsa':
        return <AboutDsaSection />;

      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 antialiased">
      {/* Top Navbar */}
      <Navbar
        onOpenApiModal={() => setIsApiModalOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 min-w-0 p-4 sm:p-6 lg:p-8">
          {renderCurrentView()}
        </main>
      </div>

      {/* Match Details Center Modal */}
      <MatchDetailsModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />

      {/* API Configuration Modal */}
      <ApiConfigModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
      />

      {/* Real-Time Event & Stack Alert Toast */}
      <NotificationToast />

      {/* Compact Global Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 text-slate-500 text-xs py-6 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">GOALPULSE</span>
            <span>• Football Live Scores & Match Event Stack (LIFO)</span>
          </div>
          <p className="text-[11px] text-slate-600">
            University CS-201 Data Structures and Algorithms Project
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <GoalPulseProvider>
      <MainAppContent />
    </GoalPulseProvider>
  );
}
