import React from 'react';
import { RouteState } from '../types';
import { CATEGORY_LIST } from '../data/categories';
import { Compass, ShieldCheck, HeartHandshake, BookOpen, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  navigate: (route: RouteState) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Our Editorial Mission</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#172033] tracking-tight">
          About SmartScope Daily
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
          Explore. Learn. Grow. We are an independent digital publication committed to translating complex digital and lifestyle knowledge into accessible, actionable guidance.
        </p>
      </div>

      {/* Narrative Section */}
      <section className="space-y-6 text-slate-700 leading-relaxed font-sans text-base">
        <p className="text-lg text-slate-800 leading-relaxed">
          In an era saturated with thin AI-generated summaries and confusing technical jargon, <strong>SmartScope Daily</strong> was founded to serve as a reliable, grounded reference for everyday problem solving.
        </p>
        <p>
          Whether you are a student troubleshooting a slow Windows laptop, a prospective freelancer looking to land your first international client from Pakistan or India, or a homeowner seeking clever kitchen storage hacks, our mission is simple: provide clear, step-by-step guides that respect your time and intelligence.
        </p>
      </section>

      {/* Editorial Principles */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#172033]">
          Our Core Editorial Principles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Tested & Practical Advice</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We focus on actionable, real-world solutions rather than theoretical abstractions. Every tutorial provides step-by-step clarity.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Honest Editorial Transparency</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never fabricate test results, fake certifications, or deceptive product endorsements. When affiliate links appear, they are clearly disclosed.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Compass className="w-4 h-4 text-teal-600" />
              <span>Universal Accessibility</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our guides are tailored for beginners and intermediate readers alike across Pakistan, India, and global English-speaking audiences.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <HeartHandshake className="w-4 h-4 text-purple-600" />
              <span>Reader First Culture</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We maintain clean, fast-loading layouts with zero intrusive popup walls, prioritizing your reading comfort above all else.
            </p>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#172033]">
          Ten Diverse Content Pillars
        </h2>
        <p className="text-sm text-slate-600">
          SmartScope Daily publishes comprehensive guides across ten distinct editorial categories:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {CATEGORY_LIST.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                navigate({ page: 'category', param: cat.slug });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-3.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-slate-800">{cat.name}</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">{cat.focusArea}</div>
              </div>
              <span className="text-xs text-blue-600 font-semibold shrink-0 ml-2">5 Guides →</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Callout */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#172033]">
            Have a question or editorial suggestion?
          </h3>
          <p className="text-xs text-slate-500">
            Our editorial desk is always open to feedback from our readership.
          </p>
        </div>
        <button
          onClick={() => {
            navigate({ page: 'contact' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
        >
          Contact Our Team
        </button>
      </div>
    </div>
  );
};
