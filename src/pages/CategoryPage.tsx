import React, { useState } from 'react';
import { RouteState, CategoryId } from '../types';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories';
import { getArticlesByCategory } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { Compass, Search, ArrowRight, Tag } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
  navigate: (route: RouteState) => void;
  savedSlugs: string[];
  onToggleBookmark: (slug: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  navigate,
  savedSlugs,
  onToggleBookmark,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Lookup category by slug or id
  const category = Object.values(CATEGORIES).find(
    (c) => c.slug === categorySlug || c.id === categorySlug
  );

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-[#172033]">Category Not Found</h1>
        <p className="text-slate-600">The requested editorial category does not exist.</p>
        <button
          onClick={() => navigate({ page: 'home' })}
          className="px-6 py-2.5 bg-[#2563EB] text-white font-medium rounded-lg text-sm"
        >
          Return to Magazine Home
        </button>
      </div>
    );
  }

  const allCategoryArticles = getArticlesByCategory(category.id);
  const featuredArticle = allCategoryArticles[0];
  const remainingArticles = allCategoryArticles.slice(1);

  // Filter based on search input or tag chip
  const filteredArticles = remainingArticles.filter((a) => {
    const matchesQuery = !filterQuery ||
      a.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesTag = !selectedTag || a.tags.includes(selectedTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Category Header Banner */}
      <section className="bg-slate-50 border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <button
              onClick={() => navigate({ page: 'home' })}
              className="hover:text-blue-600 cursor-pointer"
            >
              Magazine Home
            </button>
            <span>/</span>
            <span style={{ color: category.accentColor }}>{category.name}</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#172033] tracking-tight">
              {category.name}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {category.description}
            </p>
            <div className="text-xs text-slate-500 font-medium pt-1">
              <strong>Focus Area:</strong> {category.focusArea}
            </div>
          </div>

          {/* Sub-topics list */}
          <div className="pt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Topics:
            </span>
            {category.topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedTag === t
                    ? 'bg-[#172033] text-white font-medium'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-xs text-blue-600 hover:underline ml-2 cursor-pointer"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Lead Featured Article in Category */}
        {featuredArticle && !selectedTag && !filterQuery && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Category Pillar Guide
              </span>
            </div>
            <ArticleCard
              article={featuredArticle}
              navigate={navigate}
              isBookmarked={savedSlugs.includes(featuredArticle.slug)}
              onToggleBookmark={onToggleBookmark}
              variant="featured-hero"
            />
          </div>
        )}

        {/* AdSense Placement Area */}
        <AdSenseSlot format="leaderboard" />

        {/* Search & Filter inside category */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#172033]">
            {selectedTag ? `Guides tagged "${selectedTag}"` : 'All Practical Guides in this Category'}
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter these guides..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Grid of articles */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <p className="text-sm font-medium text-slate-600">No articles match your filter criteria.</p>
            <button
              onClick={() => {
                setFilterQuery('');
                setSelectedTag(null);
              }}
              className="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                navigate={navigate}
                isBookmarked={savedSlugs.includes(article.slug)}
                onToggleBookmark={onToggleBookmark}
                variant="standard"
              />
            ))}
          </div>
        )}

        {/* Other Niches Navigation Cross-Links */}
        <div className="pt-10 border-t border-slate-200 space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#172033]">
            Explore Other Content Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORY_LIST.filter((c) => c.id !== category.id).map((otherCat) => (
              <button
                key={otherCat.id}
                onClick={() => {
                  navigate({ page: 'category', param: otherCat.slug });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                  {otherCat.shortName}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">5 guides</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
