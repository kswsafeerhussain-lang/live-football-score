/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Live Alert Toast Notification
 */

import React, { useEffect } from 'react';
import { useGoalPulse } from '../../context/GoalPulseContext';
import { X, Layers, Bell, Activity } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { recentAlert, clearAlert, setActiveTab } = useGoalPulse();

  useEffect(() => {
    if (!recentAlert) return;
    const timer = setTimeout(() => {
      clearAlert();
    }, 6000);
    return () => clearTimeout(timer);
  }, [recentAlert, clearAlert]);

  if (!recentAlert) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 border border-emerald-500/50 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
            {recentAlert.type === 'goal' ? '⚽' : recentAlert.type === 'var' ? '📺' : <Activity className="w-4 h-4" />}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              Live Stack Event • {recentAlert.timestamp}
            </span>
            <h4 className="text-xs font-bold text-white mt-0.5">{recentAlert.title}</h4>
            <p className="text-[11px] text-slate-300 mt-0.5">{recentAlert.message}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearAlert}
          className="text-slate-500 hover:text-slate-300 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
        <span className="text-slate-500">Pushed to MatchEventStack (LIFO)</span>
        <button
          type="button"
          onClick={() => {
            clearAlert();
            setActiveTab('stack');
          }}
          className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
        >
          <Layers className="w-3 h-3" />
          <span>Inspect Stack</span>
        </button>
      </div>
    </div>
  );
};
