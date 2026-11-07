import React from 'react';
import { RouteState, Article } from '../types';
import { ALL_ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Bookmark, Compass } from 'lucide-react';

interface BookmarksPageProps {
  navigate: (route: RouteState) => void;
  savedSlugs: string[];
  onToggleBookmark: (slug: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  navigate,
  savedSlugs,
  onToggleBookmark,
}) => {
  const savedArticles: Article[] = ALL_ARTICLES.filter((a) =>
    savedSlugs.includes(a.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Personal Reading Queue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#172033] tracking-tight">
            Saved Articles & Reading List
          </h1>
          <p className="text-slate-600 text-sm">
            All your bookmarked guides stored privately in your browser for offline reference.
          </p>
        </div>

        <span className="text-xs font-bold bg-blue-50 text-[#2563EB] px-3 py-1.5 rounded-full shrink-0">
          {savedArticles.length} {savedArticles.length === 1 ? 'Article' : 'Articles'} Saved
        </span>
      </div>

      {savedArticles.length === 0 ? (
        <div className="p-12 sm:p-20 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 bg-white text-slate-400 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <Bookmark className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-800">
            Your Reading List is Empty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Click the bookmark icon on any guide or article to save it to your personal list for easy reading later.
          </p>
          <button
            onClick={() => {
              navigate({ page: 'home' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Explore 50 Magazine Guides</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              navigate={navigate}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              variant="standard"
            />
          ))}
        </div>
      )}
    </div>
  );
};
