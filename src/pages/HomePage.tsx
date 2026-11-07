import React, { useState } from 'react';
import { Search, ArrowRight, TrendingUp, Sparkles, Compass, ChevronDown } from 'lucide-react';
import { RouteState, CategoryId } from '../types';
import { ALL_ARTICLES, getFeaturedArticles, getEditorsPicks, getPopularArticles } from '../data/articles';
import { CATEGORY_LIST, CATEGORIES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { StickyCategoryBar } from '../components/StickyCategoryBar';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { WhatsAppBanner } from '../components/WhatsAppBanner';
import { NewsletterSection } from '../components/NewsletterSection';

interface HomePageProps {
  navigate: (route: RouteState) => void;
  savedSlugs: string[];
  onToggleBookmark: (slug: string) => void;
  openSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  navigate,
  savedSlugs,
  onToggleBookmark,
  openSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [streamCount, setStreamCount] = useState(9);

  const featured = getFeaturedArticles();
  const editorsPicks = getEditorsPicks();
  const popularGuides = getPopularArticles();

  const leadStory = featured[0] || ALL_ARTICLES[0];
  const secondaryHeroStories = featured.slice(1, 3);

  // Filtered stream based on sticky category selection
  const streamArticles = selectedCategory === 'all'
    ? ALL_ARTICLES
    : ALL_ARTICLES.filter((a) => a.category === selectedCategory);

  const visibleStreamArticles = streamArticles.slice(0, streamCount);
  const hasMore = streamCount < streamArticles.length;

  const handleLoadMore = () => {
    setStreamCount((prev) => prev + 6);
  };

  const handleCategorySelect = (catId: CategoryId | 'all') => {
    setSelectedCategory(catId);
    setStreamCount(9);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION: Clean Minimalist Headline Layout with Quick-Read Filters */}
      <section className="pt-8 sm:pt-12 border-b border-slate-200 pb-12 bg-gradient-to-b from-slate-50/60 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Typographic Hero Headline */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SmartScope Daily · Digital Editorial Magazine</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#172033] tracking-tight leading-[1.12] text-balance">
              Knowledge That Moves You Forward.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Explore practical guides, technology, AI tools, education, business strategies, and everyday solutions to help you learn, work smarter, and grow.
            </p>

            {/* Quick Search Trigger & Explore Action */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={openSearch}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-500 hover:border-slate-400 hover:text-slate-800 transition-colors shadow-xs cursor-pointer w-full sm:w-80"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search 50 practical guides...</span>
              </button>

              <button
                onClick={() => {
                  const streamEl = document.getElementById('articles-stream');
                  streamEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-[#172033] hover:bg-[#2563EB] text-white font-medium text-sm rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Explore Articles
              </button>
            </div>
          </div>

          {/* Featured Stories: Lead Story + 2 Highlights */}
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ArticleCard
                article={leadStory}
                navigate={navigate}
                isBookmarked={savedSlugs.includes(leadStory.slug)}
                onToggleBookmark={onToggleBookmark}
                variant="featured-hero"
              />
            </div>
            <div className="flex flex-col gap-6 justify-between">
              {secondaryHeroStories.map((story) => (
                <ArticleCard
                  key={story.id}
                  article={story}
                  navigate={navigate}
                  isBookmarked={savedSlugs.includes(story.slug)}
                  onToggleBookmark={onToggleBookmark}
                  variant="standard"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top AdSense Leaderboard Placement Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSenseSlot format="leaderboard" />
      </div>

      {/* 3. EXPLORE CATEGORIES: 10 Visually Attractive Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Editorial Spectrum
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              Explore 10 Content Niches
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Dive into specialized landing hubs curated with comprehensive tutorials and solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORY_LIST.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate({ page: 'category', param: cat.slug })}
              className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div
                  style={{ backgroundColor: `${cat.accentColor}15`, color: cat.accentColor }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                >
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#172033] group-hover:text-[#2563EB] transition-colors leading-tight">
                  {cat.shortName}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400 group-hover:text-[#2563EB]">
                <span>5 Guides</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STICKY CATEGORY FILTER BAR & INFINITE LOAD-MORE ARTICLE STREAM */}
      <div id="articles-stream" className="scroll-mt-24">
        <StickyCategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          articleCount={streamArticles.length}
        />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#172033]">
              {selectedCategory === 'all'
                ? 'Latest Magazine Articles'
                : `${CATEGORIES[selectedCategory]?.name || 'Category'} Articles`}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing {visibleStreamArticles.length} of {streamArticles.length} articles
            </span>
          </div>

          {/* 3-Column Magazine Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleStreamArticles.map((article) => (
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

          {/* Load More Button Trigger */}
          {hasMore && (
            <div className="text-center pt-8">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-medium text-sm rounded-lg shadow-xs hover:shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Load More Articles</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          )}
        </section>
      </div>

      {/* 5. POPULAR GUIDES & EDITOR'S PICKS SPLIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Popular Guides */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#172033]">
                Popular Educational & Tech Guides
              </h2>
            </div>
            <div className="space-y-4">
              {popularGuides.slice(0, 4).map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => navigate({ page: 'article', param: art.slug })}
                  className="group flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <span className="font-serif text-2xl font-bold text-slate-300 group-hover:text-blue-600 shrink-0 w-8">
                    0{idx + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                      {CATEGORIES[art.category]?.shortName}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-slate-800 group-hover:text-[#2563EB] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{art.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Editor's Picks */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#172033]">
                Editor&apos;s Curated Picks
              </h2>
            </div>
            <div className="space-y-4">
              {editorsPicks.slice(0, 4).map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => navigate({ page: 'article', param: art.slug })}
                  className="group flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <span className="font-serif text-2xl font-bold text-slate-300 group-hover:text-teal-600 shrink-0 w-8">
                    0{idx + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-teal-600 uppercase tracking-wider">
                      {CATEGORIES[art.category]?.shortName}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-slate-800 group-hover:text-[#2563EB] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{art.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP CONTACT BANNER: Have a Question? Let's Talk! */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <WhatsAppBanner />
      </div>

      {/* 7. NEWSLETTER SECTION: Stay Informed. Keep Growing. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <NewsletterSection />
      </div>
    </div>
  );
};
