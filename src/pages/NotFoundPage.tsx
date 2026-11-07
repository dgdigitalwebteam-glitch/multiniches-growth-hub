import React from 'react';
import { RouteState } from '../types';
import { Compass, Home, Search } from 'lucide-react';

interface NotFoundPageProps {
  navigate: (route: RouteState) => void;
  openSearch: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate, openSearch }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Error 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#172033]">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
          The editorial guide or category you are looking for has moved or does not exist. Try searching our directory or head back to the homepage.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => {
            navigate({ page: 'home' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Magazine Homepage</span>
        </button>

        <button
          onClick={openSearch}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Search 50 Articles</span>
        </button>
      </div>
    </div>
  );
};
