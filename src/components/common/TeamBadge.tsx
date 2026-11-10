/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - Team Badge Component with high reliability & fallback
 */

import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface TeamBadgeProps {
  name: string;
  crestUrl?: string;
  tla?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const TeamBadge: React.FC<TeamBadgeProps> = ({
  name,
  crestUrl,
  tla,
  size = 'md',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-xs font-bold',
    lg: 'w-12 h-12 text-sm font-extrabold',
    xl: 'w-16 h-16 text-base font-extrabold'
  };

  const abbreviation = tla || name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();

  if (!crestUrl || imageError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner ${className}`}
        title={name}
      >
        {abbreviation || <Shield className="w-3/5 h-3/5" />}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} shrink-0 flex items-center justify-center relative p-0.5 ${className}`}>
      <img
        src={crestUrl}
        alt={`${name} crest`}
        className="w-full h-full object-contain filter drop-shadow"
        loading="lazy"
        onError={() => setImageError(true)}
      />
    </div>
  );
};
