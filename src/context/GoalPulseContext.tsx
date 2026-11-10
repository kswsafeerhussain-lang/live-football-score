/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Global Application Context
 * Coordinates Live Scores, Match Details, Favourites, and the DSA MatchEventStack instance.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Match, ApiConfig } from '../types/football';
import { footballApi } from '../services/footballApi';
import { MatchEventStack, FootballMatchEvent, RollbackRecord } from '../dsa/MatchEventStack';
import { StackOperationLog } from '../dsa/Stack';
import { getDateString } from '../data/mockFootballData';

interface FavoritesState {
  teams: string[];
  competitions: string[];
  matches: string[];
}

interface AlertNotification {
  id: string;
  title: string;
  message: string;
  type: 'goal' | 'card' | 'sub' | 'var' | 'info';
  timestamp: string;
}

interface GoalPulseContextType {
  matches: Match[];
  liveCount: number;
  apiConfig: ApiConfig;
  updateApiConfig: (cfg: Partial<ApiConfig>) => void;
  selectedMatch: Match | null;
  setSelectedMatch: (match: Match | null) => void;
  
  // DSA Stack Operations
  matchEventStack: MatchEventStack;
  stackEvents: FootballMatchEvent[];
  stackLogs: StackOperationLog[];
  stackRollbacks: RollbackRecord[];
  pushEventToStack: (event: FootballMatchEvent) => void;
  popEventFromStack: () => FootballMatchEvent | undefined;
  peekEventFromStack: () => FootballMatchEvent | undefined;
  rollbackLatestEvent: (reason?: string) => void;
  clearStack: () => void;
  loadStackScenario: (scenario: 'premier_derby' | 'el_clasico' | 'ucl_final') => void;
  
  // Navigation & Filtering
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: 'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED';
  setStatusFilter: (status: 'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED') => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  yesterdayDateStr: string;
  todayDateStr: string;
  tomorrowDateStr: string;
  
  // Teacher / Evaluation Demonstrator
  triggerGoalSimulation: (matchId: string, side?: 'home' | 'away', customPlayer?: string) => void;
  triggerCardSimulation: (matchId: string, type: 'yellow_card' | 'red_card', side?: 'home' | 'away', customPlayer?: string) => void;
  triggerVarRollbackSimulation: (matchId: string, reason?: string) => void;

  // Favourites
  favorites: FavoritesState;
  toggleFavorite: (type: 'team' | 'competition' | 'match', id: string) => void;
  isFavorite: (type: 'team' | 'competition' | 'match', id: string) => boolean;

  // Refresh & Notifications
  refreshScores: () => Promise<void>;
  isRefreshing: boolean;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  recentAlert: AlertNotification | null;
  clearAlert: () => void;
}

const GoalPulseContext = createContext<GoalPulseContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'goalpulse_favorites';

export const GoalPulseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize dedicated Stack instance
  const stackInstance = useMemo(() => {
    const s = new MatchEventStack();
    s.loadPresetScenario('premier_derby');
    return s;
  }, []);

  const yesterdayDateStr = useMemo(() => getDateString(-1), []);
  const todayDateStr = useMemo(() => getDateString(0), []);
  const tomorrowDateStr = useMemo(() => getDateString(1), []);

  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED'>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>(todayDateStr);
  const [apiConfig, setApiConfig] = useState<ApiConfig>(() => footballApi.getConfig());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [recentAlert, setRecentAlert] = useState<AlertNotification | null>(null);
  
  // Stack state triggers to sync UI with Stack ADT mutations
  const [stackVersion, setStackVersion] = useState<number>(0);

  // Favourites loaded from localStorage
  const [favorites, setFavorites] = useState<FavoritesState>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignore
    }
    return {
      teams: ['Arsenal FC', 'Real Madrid CF', 'FC Barcelona', 'Liverpool FC'],
      competitions: ['PL', 'CL'],
      matches: []
    };
  });

  const saveFavorites = (newFavs: FavoritesState) => {
    setFavorites(newFavs);
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavs));
    } catch {
      // Ignore
    }
  };

  const toggleFavorite = (type: 'team' | 'competition' | 'match', id: string) => {
    const current = favorites[`${type}s` as keyof FavoritesState] as string[];
    const exists = current.includes(id);
    const updated = exists ? current.filter(item => item !== id) : [...current, id];
    saveFavorites({
      ...favorites,
      [`${type}s`]: updated
    });
  };

  const isFavorite = (type: 'team' | 'competition' | 'match', id: string) => {
    const current = favorites[`${type}s` as keyof FavoritesState] as string[];
    return current?.includes(id) ?? false;
  };

  const triggerStackUpdate = () => {
    setStackVersion(v => v + 1);
  };

  // Stack Wrapper Methods
  const pushEventToStack = useCallback((event: FootballMatchEvent) => {
    stackInstance.pushEvent(event);
    triggerStackUpdate();

    // Show alert notification
    setRecentAlert({
      id: `alert-${Date.now()}`,
      title: `${event.type.toUpperCase()}: ${event.matchTitle}`,
      message: `${event.minute}' - ${event.player} (${event.team})`,
      type: event.type === 'goal' ? 'goal' : event.type === 'var_decision' ? 'var' : 'info',
      timestamp: new Date().toLocaleTimeString()
    });
  }, [stackInstance]);

  const popEventFromStack = useCallback(() => {
    const popped = stackInstance.popEvent();
    triggerStackUpdate();
    return popped;
  }, [stackInstance]);

  const peekEventFromStack = useCallback(() => {
    const peeked = stackInstance.peekEvent();
    triggerStackUpdate();
    return peeked;
  }, [stackInstance]);

  const rollbackLatestEvent = useCallback((reason?: string) => {
    stackInstance.rollbackLatestEvent(reason);
    triggerStackUpdate();
    setRecentAlert({
      id: `rb-alert-${Date.now()}`,
      title: 'VAR DECISION ROLLBACK (LIFO Pop)',
      message: reason || 'Latest match event popped off stack due to referee/VAR review',
      type: 'var',
      timestamp: new Date().toLocaleTimeString()
    });
  }, [stackInstance]);

  const clearStack = useCallback(() => {
    stackInstance.clear();
    triggerStackUpdate();
  }, [stackInstance]);

  const loadStackScenario = useCallback((scenario: 'premier_derby' | 'el_clasico' | 'ucl_final') => {
    stackInstance.loadPresetScenario(scenario);
    triggerStackUpdate();
  }, [stackInstance]);

  // Load matches
  const refreshScores = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await footballApi.getMatches();
      setMatches(result.matches);
      setApiConfig(footballApi.getConfig());

      // If a match is selected, keep its reference updated
      if (selectedMatch) {
        const updated = result.matches.find(m => m.id === selectedMatch.id);
        if (updated) setSelectedMatch(updated);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [selectedMatch]);

  const updateApiConfig = (newCfg: Partial<ApiConfig>) => {
    const updated = footballApi.saveConfig(newCfg);
    setApiConfig(updated);
    refreshScores();
  };

  // Teacher / Evaluation Demonstrator Actions
  const triggerGoalSimulation = useCallback((matchId: string, side: 'home' | 'away' = 'home', customPlayer?: string) => {
    const evt = footballApi.simulateGoal(matchId, side, customPlayer);
    if (evt) {
      pushEventToStack(evt);
      refreshScores();
    }
  }, [pushEventToStack, refreshScores]);

  const triggerCardSimulation = useCallback((matchId: string, type: 'yellow_card' | 'red_card', side: 'home' | 'away' = 'away', customPlayer?: string) => {
    const evt = footballApi.simulateCard(matchId, type, side, customPlayer);
    if (evt) {
      pushEventToStack(evt);
      refreshScores();
    }
  }, [pushEventToStack, refreshScores]);

  const triggerVarRollbackSimulation = useCallback((matchId: string, reason?: string) => {
    const success = footballApi.simulateVarOverturn(matchId, reason);
    if (success) {
      rollbackLatestEvent(reason || 'VAR Review Overruled Previous Decision');
      refreshScores();
    }
  }, [rollbackLatestEvent, refreshScores]);

  // Initial fetch and connect live simulator event callback
  useEffect(() => {
    refreshScores();

    footballApi.setLiveEventListener((liveEvt) => {
      pushEventToStack(liveEvt);
      refreshScores();
    });

    const interval = setInterval(() => {
      refreshScores();
    }, 25000);

    return () => clearInterval(interval);
  }, [pushEventToStack, refreshScores]);

  // Count active live games
  const liveCount = useMemo(() => {
    return matches.filter(m => ['LIVE', 'HT', 'ET', 'PEN'].includes(m.status)).length;
  }, [matches]);

  // Derived stack views (re-evaluated on stackVersion change)
  const stackEvents = useMemo(() => {
    return stackInstance.getEventsTopFirst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackInstance, stackVersion]);

  const stackLogs = useMemo(() => {
    return stackInstance.getOperationLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackInstance, stackVersion]);

  const stackRollbacks = useMemo(() => {
    return stackInstance.getRollbackHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackInstance, stackVersion]);

  const clearAlert = () => setRecentAlert(null);

  return (
    <GoalPulseContext.Provider
      value={{
        matches,
        liveCount,
        apiConfig,
        updateApiConfig,
        selectedMatch,
        setSelectedMatch,
        matchEventStack: stackInstance,
        stackEvents,
        stackLogs,
        stackRollbacks,
        pushEventToStack,
        popEventFromStack,
        peekEventFromStack,
        rollbackLatestEvent,
        clearStack,
        loadStackScenario,
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
        triggerGoalSimulation,
        triggerCardSimulation,
        triggerVarRollbackSimulation,
        favorites,
        toggleFavorite,
        isFavorite,
        refreshScores,
        isRefreshing,
        soundEnabled,
        setSoundEnabled,
        recentAlert,
        clearAlert
      }}
    >
      {children}
    </GoalPulseContext.Provider>
  );
};

export const useGoalPulse = () => {
  const context = useContext(GoalPulseContext);
  if (!context) {
    throw new Error('useGoalPulse must be used within a GoalPulseProvider');
  }
  return context;
};
