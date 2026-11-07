import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, ChevronDown } from 'lucide-react';
import { RouteState, CategoryId } from '../types';
import { CATEGORY_LIST } from '../data/categories';

interface HeaderProps {
  currentRoute: RouteState;
  navigate: (route: RouteState) => void;
  savedCount: number;
  openSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  navigate,
  savedCount,
  openSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (route: RouteState) => {
    navigate(route);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Editorial Ribbon */}
      <div className="bg-[#172033] text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">SmartScope Daily</span>
            <span className="text-slate-500">·</span>
            <span className="hidden sm:inline text-slate-300 italic">Explore. Learn. Grow.</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-400">Digital Publishing & Practical Guides</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <button
              onClick={() => handleNav({ page: 'about' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Editorial Standards
            </button>
            <span className="text-slate-600">·</span>
            <a
              href="https://wa.me/923713727350?text=Hello%20SmartScope%20Daily!%20I%20visited%20your%20website%20and%20would%20like%20to%20contact%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
            >
              WhatsApp: +923713727350
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 bg-white border-b transition-all duration-200 ${
          isScrolled ? 'border-slate-200 shadow-sm py-2.5' : 'border-slate-200 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">
          {/* Brand Logo Lockup */}
          <button
            onClick={() => handleNav({ page: 'home' })}
            className="flex items-baseline gap-2.5 text-left group cursor-pointer"
            aria-label="SmartScope Daily Homepage"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] group-hover:text-[#2563EB] transition-colors">
              SmartScope<span className="text-[#2563EB]">.</span>
            </span>
            <span className="hidden md:inline-block text-[11px] uppercase tracking-widest text-slate-500 font-sans font-semibold border-l border-slate-300 pl-2">
              Daily Magazine
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNav({ page: 'home' })}
              className={`hover:text-[#2563EB] transition-colors cursor-pointer ${
                currentRoute.page === 'home' ? 'text-[#2563EB] font-semibold' : ''
              }`}
            >
              Home
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
                className={`flex items-center gap-1 hover:text-[#2563EB] transition-colors cursor-pointer ${
                  currentRoute.page === 'category' ? 'text-[#2563EB] font-semibold' : ''
                }`}
                aria-expanded={categoryDropdownOpen}
              >
                Categories
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Explore 10 Magazine Niches
                  </div>
                  <div className="max-h-96 overflow-y-auto py-1">
                    {CATEGORY_LIST.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNav({ page: 'category', param: cat.slug })}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 hover:text-[#2563EB] transition-colors cursor-pointer ${
                          currentRoute.page === 'category' && currentRoute.param === cat.slug
                            ? 'bg-blue-50 text-[#2563EB] font-semibold'
                            : 'text-slate-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-slate-400">5 articles</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav({ page: 'category', param: 'technology' })}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              Technology
            </button>
            <button
              onClick={() => handleNav({ page: 'category', param: 'ai-tools' })}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              AI Tools
            </button>
            <button
              onClick={() => handleNav({ page: 'category', param: 'blogging-seo' })}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              Blogging & SEO
            </button>
            <button
              onClick={() => handleNav({ page: 'category', param: 'freelancing' })}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              Freelancing
            </button>
            <button
              onClick={() => handleNav({ page: 'about' })}
              className={`hover:text-[#2563EB] transition-colors cursor-pointer ${
                currentRoute.page === 'about' ? 'text-[#2563EB] font-semibold' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNav({ page: 'contact' })}
              className={`hover:text-[#2563EB] transition-colors cursor-pointer ${
                currentRoute.page === 'contact' ? 'text-[#2563EB] font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Zone: Search & Bookmarks */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openSearch}
              className="p-2 rounded-lg text-slate-600 hover:text-[#2563EB] hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="Search articles"
              aria-label="Search articles"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              onClick={() => handleNav({ page: 'bookmarks' })}
              className={`p-2 rounded-lg text-slate-600 hover:text-[#2563EB] hover:bg-slate-100 transition-colors cursor-pointer relative flex items-center gap-1.5 text-xs font-medium ${
                currentRoute.page === 'bookmarks' ? 'bg-blue-50 text-[#2563EB]' : ''
              }`}
              title="Saved reading list"
              aria-label="View saved articles"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#2563EB] text-white text-[10px] font-bold rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="font-serif text-xl font-bold text-[#172033]">
                  SmartScope<span className="text-[#2563EB]">.</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 border-b border-slate-100">
                <button
                  onClick={openSearch}
                  className="w-full flex items-center gap-2.5 px-3 py-2 bg-slate-100 rounded-lg text-xs text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Search all 50 guides...</span>
                </button>
              </div>

              {/* Main Links */}
              <div className="py-4 space-y-1 text-sm font-medium text-slate-800">
                <button
                  onClick={() => handleNav({ page: 'home' })}
                  className="w-full text-left py-2 px-2 hover:bg-slate-50 rounded"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNav({ page: 'about' })}
                  className="w-full text-left py-2 px-2 hover:bg-slate-50 rounded"
                >
                  About Us & Editorial Standards
                </button>
                <button
                  onClick={() => handleNav({ page: 'contact' })}
                  className="w-full text-left py-2 px-2 hover:bg-slate-50 rounded"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => handleNav({ page: 'bookmarks' })}
                  className="w-full text-left py-2 px-2 hover:bg-slate-50 rounded flex items-center justify-between"
                >
                  <span>Saved Reading List</span>
                  {savedCount > 0 && (
                    <span className="text-xs bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full font-bold">
                      {savedCount}
                    </span>
                  )}
                </button>
              </div>

              {/* All 10 Categories */}
              <div className="pt-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  10 Editorial Categories
                </div>
                <div className="space-y-0.5">
                  {CATEGORY_LIST.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNav({ page: 'category', param: cat.slug })}
                      className="w-full text-left py-1.5 px-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] rounded transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer WhatsApp Callout */}
            <div className="pt-6 border-t border-slate-200 mt-6">
              <a
                href="https://wa.me/923713727350?text=Hello%20SmartScope%20Daily!%20I%20visited%20your%20website%20and%20would%20like%20to%20contact%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 text-center"
              >
                <span>Chat on WhatsApp (+923713727350)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
