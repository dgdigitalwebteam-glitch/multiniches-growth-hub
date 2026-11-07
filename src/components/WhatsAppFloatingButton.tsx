import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const phone = '923713727350';
  const prefilled = encodeURIComponent(
    'Hello SmartScope Daily! I visited your website and would like to contact you.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${prefilled}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Optional dismissible tooltip prompt */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-full shadow-lg border border-slate-200 animate-in fade-in slide-in-from-right-3 duration-300">
          <span className="font-medium">Have a question? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer ml-1"
            aria-label="Dismiss WhatsApp tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        aria-label="Chat with SmartScope Daily on WhatsApp (+923713727350)"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
};
