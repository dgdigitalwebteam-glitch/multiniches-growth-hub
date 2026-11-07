import React from 'react';

interface AdSenseSlotProps {
  format?: 'leaderboard' | 'rectangle' | 'sidebar';
  className?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  format = 'leaderboard',
  className = '',
}) => {
  // Respecting Google AdSense preparation rules: clean reserved placement area without fake advertisements
  const getDimensions = () => {
    switch (format) {
      case 'rectangle':
        return 'w-full max-w-[336px] min-h-[280px]';
      case 'sidebar':
        return 'w-full max-w-[300px] min-h-[600px]';
      case 'leaderboard':
      default:
        return 'w-full max-w-[728px] min-h-[90px]';
    }
  };

  return (
    <aside
      className={`my-6 mx-auto flex flex-col items-center justify-center p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50/75 text-center ${getDimensions()} ${className}`}
      aria-label="Reserved Advertising Area"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
        Sponsored · Reserved Ad Slot
      </span>
      <p className="text-xs text-slate-500 font-mono">
        {format === 'leaderboard' && '728 × 90 Responsive Leaderboard'}
        {format === 'rectangle' && '300 × 250 In-Article Medium Rectangle'}
        {format === 'sidebar' && '300 × 600 Sticky Sidebar Half-Page'}
      </p>
      <span className="text-[11px] text-slate-400 mt-1">
        Clean editorial layout prepared for monetization
      </span>
    </aside>
  );
};
