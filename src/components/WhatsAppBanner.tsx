import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

export const WhatsAppBanner: React.FC = () => {
  const phone = '923713727350';
  const prefilled = encodeURIComponent(
    'Hello SmartScope Daily! I visited your website and would like to contact you.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${prefilled}`;

  return (
    <section className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-2xl p-6 sm:p-10 my-12 relative overflow-hidden shadow-md">
      {/* Subtle background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
        <MessageCircle className="w-80 h-80 -mr-20 text-white fill-white" />
      </div>

      <div className="relative z-10 max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-emerald-200 bg-emerald-900/40 px-3 py-1 rounded-full">
          <MessageCircle className="w-3.5 h-3.5" />
          Direct Editorial & Reader Support
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Have a Question? Let&apos;s Talk!
        </h2>
        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
          Need tech troubleshooting advice, business guidance, or want to submit an editorial inquiry? Connect with our editorial team directly on WhatsApp for prompt assistance.
        </p>

        <div className="pt-3 flex flex-wrap items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-[#172033] font-semibold text-sm px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat With Us on WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
          <span className="text-xs text-emerald-200">
            Number: <strong className="text-white">+923713727350</strong> · Typical reply in few hours
          </span>
        </div>
      </div>
    </section>
  );
};
