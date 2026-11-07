import React, { useState, useEffect } from 'react';
import { RouteState, PageRoute, CategoryId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { LegalPage } from './pages/LegalPage';
import { SitemapPage } from './pages/SitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CATEGORIES } from './data/categories';
import { getArticleBySlug } from './data/articles';

// Parse initial route from browser window.location.pathname
function parseRouteFromUrl(): RouteState {
  if (typeof window === 'undefined') return { page: 'home' };

  const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!rawPath) return { page: 'home' };

  // Direct page match
  if (rawPath === 'about' || rawPath === 'about-us') return { page: 'about' };
  if (rawPath === 'contact' || rawPath === 'contact-us') return { page: 'contact' };
  if (rawPath === 'bookmarks' || rawPath === 'saved') return { page: 'bookmarks' };
  if (rawPath === 'privacy-policy') return { page: 'privacy-policy' };
  if (rawPath === 'terms' || rawPath === 'terms-and-conditions') return { page: 'terms' };
  if (rawPath === 'disclaimer') return { page: 'disclaimer' };
  if (rawPath === 'affiliate-disclosure') return { page: 'affiliate-disclosure' };
  if (rawPath === 'editorial-policy') return { page: 'editorial-policy' };
  if (rawPath === 'sitemap' || rawPath === 'sitemap.html') return { page: 'sitemap' };

  // Check category match (/technology, /ai-tools, etc.)
  const categoryMatch = Object.values(CATEGORIES).find(
    (c) => c.slug === rawPath || c.id === rawPath
  );
  if (categoryMatch) {
    return { page: 'category', param: categoryMatch.slug };
  }

  // Check article match (/article/:slug or /:slug)
  const articleSlug = rawPath.startsWith('article/') ? rawPath.replace('article/', '') : rawPath;
  const articleMatch = getArticleBySlug(articleSlug);
  if (articleMatch) {
    return { page: 'article', param: articleMatch.slug };
  }

  // Fallback 404
  return { page: '404' };
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseRouteFromUrl());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // LocalStorage-backed Bookmarks
  const [savedSlugs, setSavedSlugs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('smartscope_bookmarks');
      return stored ? JSON.parse(stored) : ['how-to-make-a-slow-windows-10-laptop-faster-10-easy-fixes'];
    } catch {
      return ['how-to-make-a-slow-windows-10-laptop-faster-10-easy-fixes'];
    }
  });

  const toggleBookmark = (slug: string) => {
    setSavedSlugs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem('smartscope_bookmarks', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  // Navigate handler that synchronizes HTML5 browser history
  const navigate = (nextRoute: RouteState) => {
    setRoute(nextRoute);

    let path = '/';
    if (nextRoute.page === 'category' && nextRoute.param) {
      path = `/${nextRoute.param}/`;
    } else if (nextRoute.page === 'article' && nextRoute.param) {
      path = `/article/${nextRoute.param}`;
    } else if (nextRoute.page !== 'home') {
      path = `/${nextRoute.page}`;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(nextRoute, '', path);
    }
  };

  // Listen to popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRouteFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title and meta description dynamically
  useEffect(() => {
    let title = 'SmartScope Daily – Explore. Learn. Grow.';
    let desc = 'A trusted digital magazine providing practical knowledge, technology guides, AI tools, blogging strategies, freelancing advice, education, and lifestyle.';

    if (route.page === 'article' && route.param) {
      const art = getArticleBySlug(route.param);
      if (art) {
        title = `${art.title} – SmartScope Daily`;
        desc = art.metaDescription;
      }
    } else if (route.page === 'category' && route.param) {
      const cat = Object.values(CATEGORIES).find(
        (c) => c.slug === route.param || c.id === route.param
      );
      if (cat) {
        title = `${cat.name} Guides & Tutorials – SmartScope Daily`;
        desc = cat.description;
      }
    } else if (route.page === 'about') {
      title = 'About Us – SmartScope Daily';
    } else if (route.page === 'contact') {
      title = 'Contact Us – SmartScope Daily';
    } else if (route.page === 'bookmarks') {
      title = 'Saved Reading List – SmartScope Daily';
    } else if (route.page === 'privacy-policy') {
      title = 'Privacy Policy – SmartScope Daily';
    } else if (route.page === 'terms') {
      title = 'Terms & Conditions – SmartScope Daily';
    } else if (route.page === 'disclaimer') {
      title = 'General Disclaimer – SmartScope Daily';
    } else if (route.page === 'affiliate-disclosure') {
      title = 'Affiliate Disclosure – SmartScope Daily';
    } else if (route.page === 'editorial-policy') {
      title = 'Editorial Policy – SmartScope Daily';
    } else if (route.page === 'sitemap') {
      title = 'HTML Sitemap – SmartScope Daily';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [route]);

  const renderActiveView = () => {
    switch (route.page) {
      case 'home':
        return (
          <HomePage
            navigate={navigate}
            savedSlugs={savedSlugs}
            onToggleBookmark={toggleBookmark}
            openSearch={() => setIsSearchOpen(true)}
          />
        );

      case 'category':
        return (
          <CategoryPage
            categorySlug={route.param || 'technology'}
            navigate={navigate}
            savedSlugs={savedSlugs}
            onToggleBookmark={toggleBookmark}
          />
        );

      case 'article':
        return (
          <ArticlePage
            articleSlug={route.param || ''}
            navigate={navigate}
            savedSlugs={savedSlugs}
            onToggleBookmark={toggleBookmark}
          />
        );

      case 'about':
        return <AboutPage navigate={navigate} />;

      case 'contact':
        return <ContactPage navigate={navigate} />;

      case 'bookmarks':
        return (
          <BookmarksPage
            navigate={navigate}
            savedSlugs={savedSlugs}
            onToggleBookmark={toggleBookmark}
          />
        );

      case 'privacy-policy':
      case 'terms':
      case 'disclaimer':
      case 'affiliate-disclosure':
      case 'editorial-policy':
        return <LegalPage page={route.page} navigate={navigate} />;

      case 'sitemap':
        return <SitemapPage navigate={navigate} />;

      case '404':
      default:
        return (
          <NotFoundPage
            navigate={navigate}
            openSearch={() => setIsSearchOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#172033] font-sans antialiased">
      {/* Sticky Top Header */}
      <Header
        currentRoute={route}
        navigate={navigate}
        savedCount={savedSlugs.length}
        openSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="grow">
        {renderActiveView()}
      </main>

      {/* Global Footer */}
      <Footer navigate={navigate} />

      {/* Floating WhatsApp Action Widget (+923713727350) */}
      <WhatsAppFloatingButton />

      {/* Instant Search Engine Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        navigate={navigate}
      />
    </div>
  );
}
