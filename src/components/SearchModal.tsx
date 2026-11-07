import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { RouteState, CategoryId } from '../types';
import { searchArticles } from '../data/articles';
import { CATEGORIES } from '../data/categories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (route: RouteState) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  navigate,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<CategoryId | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchArticles(query, selectedCat);

  const handleSelectArticle = (slug: string) => {
    navigate({ page: 'article', param: slug });
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Search SmartScope Daily"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides (e.g., Windows 10, ChatGPT, Freelancing, Budget, Meal Plan)..."
            className="w-full text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Topic Chips */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium text-[11px] shrink-0">Filter:</span>
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-slate-900 text-white font-medium'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Niches
          </button>
          {Object.values(CATEGORIES).map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCat === c.id
                  ? 'bg-[#2563EB] text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.shortName}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 space-y-2 divide-y divide-slate-100">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <p className="text-sm font-medium text-slate-600">No matching articles found</p>
              <p className="text-xs">Try searching for keywords like &quot;Android&quot;, &quot;SEO&quot;, &quot;Portfolio&quot;, &quot;Travel&quot; or &quot;Store&quot;</p>
            </div>
          ) : (
            results.map((art) => {
              const cat = CATEGORIES[art.category];
              return (
                <div
                  key={art.id}
                  onClick={() => handleSelectArticle(art.slug)}
                  className="pt-2 first:pt-0 group flex items-start justify-between gap-4 p-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span
                        style={{ color: cat?.accentColor || '#2563EB' }}
                        className="font-semibold uppercase tracking-wider"
                      >
                        {cat?.name || art.category}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#2563EB] transition-colors leading-snug">
                      {art.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {art.excerpt}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>{results.length} articles found</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
