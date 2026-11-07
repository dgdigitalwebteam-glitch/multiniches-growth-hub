import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 my-12 text-center max-w-4xl mx-auto">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 bg-blue-100 text-[#2563EB] rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
          Stay Informed. Keep Growing.
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Get practical guides, useful resources, and fresh insights delivered directly to your inbox. No spam, ever.
        </p>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Thank you for subscribing! Your email (<strong>{email}</strong>) has been noted for our upcoming editorial bulletin.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="grow px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-400">
          We respect your privacy. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
};
