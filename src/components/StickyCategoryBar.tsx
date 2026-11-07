import React from 'react';
import { CategoryId } from '../types';
import { CATEGORY_LIST } from '../data/categories';

interface StickyCategoryBarProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (categoryId: CategoryId | 'all') => void;
  articleCount?: number;
}

export const StickyCategoryBar: React.FC<StickyCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  articleCount,
}) => {
  return (
    <div className="sticky top-[57px] sm:top-[65px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-2.5 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Horizontal Scrollable Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full">
          {/* All Articles option */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#172033] text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All Niches {articleCount && selectedCategory === 'all' ? `(${articleCount})` : ''}
          </button>

          {/* 10 Niches */}
          {CATEGORY_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#2563EB] text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.shortName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
