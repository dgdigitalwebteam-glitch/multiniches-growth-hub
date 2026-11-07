import React, { useState } from 'react';
import { RouteState, Article } from '../types';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { AdSenseSlot } from '../components/AdSenseSlot';
import {
  Bookmark,
  Clock,
  Calendar,
  Share2,
  Copy,
  Check,
  MessageCircle,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface ArticlePageProps {
  articleSlug: string;
  navigate: (route: RouteState) => void;
  savedSlugs: string[];
  onToggleBookmark: (slug: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  articleSlug,
  navigate,
  savedSlugs,
  onToggleBookmark,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const article: Article | undefined = getArticleBySlug(articleSlug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-[#172033]">Article Not Found</h1>
        <p className="text-slate-600">The requested article could not be located.</p>
        <button
          onClick={() => navigate({ page: 'home' })}
          className="px-6 py-2.5 bg-[#2563EB] text-white font-medium rounded-lg text-sm"
        >
          Return to Magazine Home
        </button>
      </div>
    );
  }

  const category = CATEGORIES[article.category];
  const isBookmarked = savedSlugs.includes(article.slug);
  const relatedArticles = getRelatedArticles(article.slug, 3);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://smartscopedaily.com/article/${article.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Read "${article.title}" on SmartScope Daily: ${currentUrl}`
  )}`;

  // Font size classes for article body
  const bodyTextClass = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed',
    larger: 'text-xl leading-loose',
  }[fontSize];

  return (
    <article className="pb-20">
      {/* 1. Breadcrumbs & Meta Bar */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => navigate({ page: 'home' })}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <button
              onClick={() => navigate({ page: 'category', param: category.slug })}
              style={{ color: category.accentColor }}
              className="font-medium hover:underline transition-colors cursor-pointer"
            >
              {category.name}
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-xs text-slate-700">
              {article.title}
            </span>
          </nav>

          {/* Reader Engagement Tools: Font Resizer & Bookmark */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
              <span className="text-[11px] text-slate-400 mr-1">Font:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 rounded text-xs cursor-pointer ${
                  fontSize === 'normal' ? 'bg-slate-200 font-bold text-slate-900' : 'text-slate-500'
                }`}
                title="Default font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 rounded text-sm cursor-pointer ${
                  fontSize === 'large' ? 'bg-slate-200 font-bold text-slate-900' : 'text-slate-500'
                }`}
                title="Larger font size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('larger')}
                className={`px-1.5 py-0.5 rounded text-base cursor-pointer ${
                  fontSize === 'larger' ? 'bg-slate-200 font-bold text-slate-900' : 'text-slate-500'
                }`}
                title="Maximum font size"
              >
                A++
              </button>
            </div>

            <button
              onClick={() => onToggleBookmark(article.slug)}
              className={`flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${
                isBookmarked ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
              title={isBookmarked ? 'Saved to bookmarks' : 'Save for later'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-blue-600' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Article Header Canvas */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-6">
        {/* Unboxed Metadata adhering to zero-pill discipline */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
          <span
            style={{ color: category.accentColor }}
            className="font-semibold uppercase tracking-wider text-[11px]"
          >
            {category.name}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Published {article.publishedDate}
          </span>
          {article.updatedDate && (
            <>
              <span>·</span>
              <span className="text-emerald-700">Updated {article.updatedDate}</span>
            </>
          )}
        </div>

        {/* Primary Clear H1 Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#172033] tracking-tight leading-[1.2] text-balance">
          {article.title}
        </h1>

        {/* Lead Summary Excerpt */}
        <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed text-balance">
          {article.excerpt}
        </p>

        {/* Author Byline & Social Share Row */}
        <div className="py-4 border-y border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border border-slate-200"
            />
            <div>
              <div className="font-semibold text-sm text-slate-900">{article.author.name}</div>
              <div className="text-xs text-slate-500">{article.author.role}</div>
            </div>
          </div>

          {/* Social Share Suite */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" /> Share:
            </span>
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-xs flex items-center gap-1.5 font-medium"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs flex items-center gap-1.5 font-medium cursor-pointer"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Featured Editorial Image */}
        <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
          {!imgError ? (
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-100 to-blue-50 text-slate-400">
              <span className="font-serif text-xl font-bold text-slate-700">{article.title}</span>
              <span className="text-xs text-slate-500 mt-2">{category.name}</span>
            </div>
          )}
        </div>
        <p className="text-[11px] text-slate-400 italic text-center">
          {article.imageAlt}
        </p>
      </header>

      {/* 3. Article Core Reading Canvas */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 space-y-10">
        {/* Affiliate Disclosure Box (if relevant) */}
        {article.hasAffiliateDisclosure && (
          <aside className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Editorial & Affiliate Disclosure</span>
              <p>
                SmartScope Daily maintains strict editorial independence. When you purchase products through links on our site, we may earn an affiliate commission at zero additional cost to you. We only recommend solutions thoroughly researched and verified by our editorial staff.
              </p>
            </div>
          </aside>
        )}

        {/* Health Disclaimer (if relevant) */}
        {article.hasHealthDisclaimer && (
          <aside className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">General Health & Fitness Information Disclaimer</span>
              <p>
                The fitness guides and meal planning information presented in this article are provided strictly for educational and general informational purposes. They do not constitute personalized medical advice. Always consult a licensed physician or certified physical therapist before beginning any new physical exercise routine.
              </p>
            </div>
          </aside>
        )}

        {/* Financial Education Disclaimer (if relevant) */}
        {article.hasFinancialDisclaimer && (
          <aside className="p-4 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-800 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Financial Education Disclaimer</span>
              <p>
                The financial planning and business budgeting strategies discussed here are intended exclusively for general informational and educational purposes. They do not constitute certified financial, tax, or investment advice. Always evaluate your personal financial circumstances with an accredited financial advisor.
              </p>
            </div>
          </aside>
        )}

        {/* Introduction Section with Editorial Drop Cap */}
        <section className={`text-slate-800 ${bodyTextClass} font-sans`}>
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#172033]">
            {article.introduction}
          </p>
        </section>

        {/* Table of Contents Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span>In This Guide</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600">
            {article.sections.map((sec, i) => (
              <li key={i} className="hover:text-blue-600 transition-colors">
                <a href={`#section-${i}`}>{sec.heading}</a>
              </li>
            ))}
            {article.practicalTips.length > 0 && (
              <li className="hover:text-blue-600">
                <a href="#practical-tips">Essential Practical Tips</a>
              </li>
            )}
            {article.faqs.length > 0 && (
              <li className="hover:text-blue-600">
                <a href="#faqs">Frequently Asked Questions</a>
              </li>
            )}
          </ol>
        </div>

        {/* Article Sections (H2, H3, Steps, Takeaways) */}
        <div className="space-y-10">
          {article.sections.map((sec, i) => (
            <section key={i} id={`section-${i}`} className="space-y-4 scroll-mt-24">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight border-b border-slate-100 pb-2">
                {sec.heading}
              </h2>

              <div className={`space-y-4 text-slate-700 ${bodyTextClass}`}>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Key Takeaways box if available */}
              {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                <div className="my-4 p-4 bg-blue-50/50 border border-blue-200 rounded-lg space-y-1.5">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                    Key Takeaway
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-blue-950">
                    {sec.keyTakeaways.map((kt, ktIdx) => (
                      <li key={ktIdx}>{kt}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Subheadings */}
              {sec.subheadings && sec.subheadings.length > 0 && (
                <div className="space-y-3 pt-2">
                  {sec.subheadings.map((sub, subIdx) => (
                    <div key={subIdx} className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-[#172033]">
                        {sub.title}
                      </h3>
                      <p className={`text-slate-700 ${bodyTextClass}`}>{sub.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* In-Article AdSense Placement after section 2 */}
              {i === 1 && (
                <div className="py-4">
                  <AdSenseSlot format="rectangle" />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Practical Tips Box */}
        {article.practicalTips.length > 0 && (
          <section id="practical-tips" className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3 scroll-mt-24">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>SmartScope Practical Pro-Tips</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {article.practicalTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Frequently Asked Questions (Accordion/List) */}
        {article.faqs.length > 0 && (
          <section id="faqs" className="space-y-4 pt-6 scroll-mt-24">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h2 className="font-serif text-2xl font-bold text-[#172033]">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 rounded-lg space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-[#172033]">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Conclusion Section */}
        <section className="pt-6 border-t border-slate-200 space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#172033]">Final Thoughts</h2>
          <p className={`text-slate-700 ${bodyTextClass}`}>
            {article.conclusion}
          </p>
        </section>

        {/* Tags Row */}
        <div className="pt-4 flex flex-wrap items-center gap-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400">Related Tags:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              About the Author
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              {article.author.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium">{article.author.role}</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {article.author.bio}
            </p>
          </div>
        </div>
      </main>

      {/* 4. Related Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 border-t border-slate-200 mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172033]">
            Related Practical Guides
          </h2>
          <button
            onClick={() => {
              navigate({ page: 'category', param: category.slug });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            More in {category.shortName} →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {relatedArticles.map((rel) => (
            <ArticleCard
              key={rel.id}
              article={rel}
              navigate={navigate}
              isBookmarked={savedSlugs.includes(rel.slug)}
              onToggleBookmark={onToggleBookmark}
              variant="standard"
            />
          ))}
        </div>
      </section>
    </article>
  );
};
