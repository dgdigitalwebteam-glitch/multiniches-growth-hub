import React, { useState } from 'react';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';
import { Article, RouteState } from '../types';
import { CATEGORIES } from '../data/categories';

interface ArticleCardProps {
  article: Article;
  navigate: (route: RouteState) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  variant?: 'standard' | 'compact' | 'featured-hero' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  navigate,
  isBookmarked,
  onToggleBookmark,
  variant = 'standard',
}) => {
  const [imgError, setImgError] = useState(false);
  const categoryInfo = CATEGORIES[article.category] || {
    name: article.category,
    accentColor: '#2563EB',
  };

  const handleCardClick = () => {
    navigate({ page: 'article', param: article.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Featured Hero Card Variant
  if (variant === 'featured-hero') {
    return (
      <article className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col lg:flex-row">
        <div className="lg:w-3/5 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-slate-100">
          {!imgError ? (
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-100 to-blue-50 text-slate-400">
              <span className="font-serif text-lg font-bold text-slate-700">{article.title}</span>
              <span className="text-xs text-slate-500 mt-2">{categoryInfo.name}</span>
            </div>
          )}
        </div>

        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Unboxed Metadata adhering to zero-pill discipline */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span
                style={{ color: categoryInfo.accentColor }}
                className="font-semibold uppercase tracking-wider text-[11px]"
              >
                {categoryInfo.name}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <h2
              onClick={handleCardClick}
              className="font-serif text-xl sm:text-2xl font-bold text-[#172033] hover:text-[#2563EB] transition-colors cursor-pointer leading-tight"
            >
              {article.title}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-800 block">{article.author.name}</span>
                <span className="text-slate-500 text-[11px]">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(article.slug);
                }}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'text-[#2563EB] bg-blue-50'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleCardClick}
                className="text-xs font-semibold text-[#2563EB] hover:text-blue-800 flex items-center gap-1 cursor-pointer pl-2"
              >
                Read Guide
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Magazine Grid Card
  return (
    <article className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Card Image */}
        <div
          onClick={handleCardClick}
          className="relative aspect-16/10 overflow-hidden bg-slate-100 cursor-pointer"
        >
          {!imgError ? (
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50 text-slate-400 text-center">
              <span className="font-serif text-sm font-semibold text-slate-700">{article.title}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-2.5">
          {/* Unboxed Metadata adhering to zero-pill discipline */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
            <span
              style={{ color: categoryInfo.accentColor }}
              className="font-semibold uppercase tracking-wider"
            >
              {categoryInfo.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3
            onClick={handleCardClick}
            className="font-serif text-lg font-bold text-[#172033] hover:text-[#2563EB] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {article.title}
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer with Author and Bookmark */}
      <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="truncate max-w-[160px] font-medium text-slate-700">
          By {article.author.name}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.slug);
            }}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              isBookmarked
                ? 'text-[#2563EB] bg-blue-50'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleCardClick}
            className="text-slate-600 hover:text-[#2563EB] p-1 cursor-pointer font-medium"
            aria-label={`Read ${article.title}`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
