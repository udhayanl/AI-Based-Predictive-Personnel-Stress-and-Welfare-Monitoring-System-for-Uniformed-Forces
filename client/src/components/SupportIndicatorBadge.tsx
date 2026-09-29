import React from 'react';

interface SupportIndicatorBadgeProps {
  score?: number;
  category?: 'Stable' | 'Monitor' | 'Elevated Support' | string;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SupportIndicatorBadge: React.FC<SupportIndicatorBadgeProps> = ({
  score,
  category,
  showScore = true,
  size = 'md',
}) => {
  // Determine effective category if only score is passed
  let resolvedCategory = category;
  if (!resolvedCategory && score !== undefined) {
    if (score < 40) resolvedCategory = 'Stable';
    else if (score < 65) resolvedCategory = 'Monitor';
    else resolvedCategory = 'Elevated Support';
  }

  const isStable = resolvedCategory?.toLowerCase().includes('stable');
  const isMonitor = resolvedCategory?.toLowerCase().includes('monitor');
  const isElevated = resolvedCategory?.toLowerCase().includes('elevated') || resolvedCategory?.toLowerCase().includes('support');

  let colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  let dotColor = 'bg-emerald-500';
  let label = 'Stable';

  if (isElevated) {
    colorClasses = 'bg-amber-50 text-amber-900 border-amber-300';
    dotColor = 'bg-amber-500';
    label = 'Elevated Support';
  } else if (isMonitor) {
    colorClasses = 'bg-blue-50 text-blue-800 border-blue-300';
    dotColor = 'bg-blue-500';
    label = 'Monitor';
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs md:text-sm font-medium',
    lg: 'px-3.5 py-1.5 text-sm md:text-base font-semibold',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${sizeClasses} ${colorClasses}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      <span>{label}</span>
      {showScore && score !== undefined && (
        <span className="font-mono text-xs opacity-75 font-semibold">({score}/100)</span>
      )}
    </span>
  );
};
