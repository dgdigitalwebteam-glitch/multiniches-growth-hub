import React from 'react';
import { RouteState } from '../types';
import { CATEGORY_LIST } from '../data/categories';
import { getArticlesByCategory } from '../data/articles';
import { Compass, FileText, ArrowRight } from 'lucide-react';

interface SitemapPageProps {
  navigate: (route: RouteState) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ navigate }) => {
  const handleArticleClick = (slug: string) => {
    navigate({ page: 'article', param: slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (slug: string) => {
    navigate({ page: 'category', param: slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Website Directory
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#172033] tracking-tight">
          Complete HTML Sitemap
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
          An indexed overview of all 10 content categories, 50 comprehensive guides, and legal resources across SmartScope Daily.
        </p>
      </div>

      {/* Primary & Trust Pages */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Core Publication & Trust Pages</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { label: 'Magazine Home', route: { page: 'home' as const } },
            { label: 'About SmartScope Daily', route: { page: 'about' as const } },
            { label: 'Contact Us & Support', route: { page: 'contact' as const } },
            { label: 'Saved Reading List', route: { page: 'bookmarks' as const } },
            { label: 'Privacy Policy', route: { page: 'privacy-policy' as const } },
            { label: 'Terms & Conditions', route: { page: 'terms' as const } },
            { label: 'General Disclaimer', route: { page: 'disclaimer' as const } },
            { label: 'Affiliate Disclosure', route: { page: 'affiliate-disclosure' as const } },
            { label: 'Editorial Policy', route: { page: 'editorial-policy' as const } },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                navigate(item.route);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left p-2.5 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors font-medium text-slate-700 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* 10 Niches with all 50 Articles */}
      <section className="space-y-10">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Compass className="w-5 h-5 text-teal-600" />
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            All 50 SEO Articles Categorized
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORY_LIST.map((cat, catIdx) => {
            const articles = getArticlesByCategory(cat.id);
            return (
              <div
                key={cat.id}
                className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">
                      CATEGORY 0{catIdx + 1}
                    </span>
                    <h3
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="font-serif text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {cat.name}
                    </h3>
                  </div>
                  <span
                    style={{ color: cat.accentColor }}
                    className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-50"
                  >
                    {articles.length} Guides
                  </span>
                </div>

                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700">
                  {articles.map((art) => (
                    <li key={art.id} className="leading-snug">
                      <button
                        onClick={() => handleArticleClick(art.slug)}
                        className="text-left hover:text-blue-600 hover:underline transition-colors cursor-pointer inline font-medium"
                      >
                        {art.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
