import React from 'react';
import { RouteState } from '../types';
import { CATEGORY_LIST } from '../data/categories';
import { MessageCircle, Mail, MapPin, Globe, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  navigate: (route: RouteState) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (route: RouteState) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#172033] text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav({ page: 'home' })}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#2563EB] transition-colors">
                SmartScope<span className="text-blue-500">.</span>
              </span>
              <p className="text-xs text-blue-400 font-medium tracking-wider uppercase mt-0.5">
                Explore. Learn. Grow.
              </p>
            </button>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              SmartScope Daily is a trusted digital publication delivering practical knowledge, technology troubleshooting, AI workflows, blogging strategies, freelancing guides, and everyday lifestyle solutions.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Target Audiences: Pakistan, India & Global English Readers</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href="https://wa.me/923713727350?text=Hello%20SmartScope%20Daily!%20I%20visited%20your%20website%20and%20would%20like%20to%20contact%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline font-medium"
                >
                  Direct WhatsApp: +923713727350
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>contact@smartscopedaily.com (Placeholder)</span>
              </div>
            </div>
          </div>

          {/* Col 3: Categories Col 1 (5 niches) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Core Niches
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORY_LIST.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleNav({ page: 'category', param: cat.slug })}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Categories Col 2 (5 niches) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Lifestyle & Finance
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORY_LIST.slice(5, 10).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleNav({ page: 'category', param: cat.slug })}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Important Trust & Legal Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav({ page: 'about' })}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  About SmartScope Daily
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ page: 'contact' })}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ page: 'editorial-policy' })}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Editorial Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ page: 'privacy-policy' })}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ page: 'terms' })}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ page: 'disclaimer' })}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  General Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ page: 'affiliate-disclosure' })}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Affiliate Disclosure
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav({ page: 'sitemap' })}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left font-medium text-blue-400"
                >
                  HTML Sitemap (All 50 Guides)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SmartScope Daily. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with semantic light editorial architecture</span>
            <span className="text-slate-700">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
