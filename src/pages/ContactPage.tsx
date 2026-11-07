import React, { useState } from 'react';
import { RouteState } from '../types';
import { MessageCircle, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

interface ContactPageProps {
  navigate: (route: RouteState) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Editorial Suggestion',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const phone = '923713727350';
  const prefilled = encodeURIComponent(
    'Hello SmartScope Daily! I visited your website and would like to contact you.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${prefilled}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left border-b border-slate-200 pb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Get in Touch
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#172033] tracking-tight">
          Contact SmartScope Daily
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
          Have an editorial inquiry, a tutorial topic suggestion, or a business proposal? We welcome communication from our global readers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Direct Channels & WhatsApp Card */}
        <div className="space-y-6">
          {/* WhatsApp Direct Highlight Box */}
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-4">
            <div className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Direct WhatsApp Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For prompt replies regarding general inquiries or technical feedback, connect with our support desk on WhatsApp.
              </p>
            </div>

            <div className="text-xs space-y-1 text-slate-700">
              <div><strong>Number:</strong> +923713727350</div>
              <div><strong>Hours:</strong> Mon – Sat, 9:00 AM – 7:00 PM (PKT / UTC+5)</div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-[#172033] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp (+923713727350)</span>
            </a>
          </div>

          {/* Email & Details Box */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Direct Inquiries
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Editorial Submissions:</div>
                  <div>editor@smartscopedaily.com (Placeholder)</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Commercial Inquiries:</div>
                  <div>partnerships@smartscopedaily.com (Placeholder)</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Response Window:</div>
                  <div>Our desk typically replies within 24 to 48 business hours.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form Interface */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#172033] mb-2">
            Send an Editorial Message
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Fill out the form below. Please provide specific details to help us route your request to the right editor.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-emerald-900">
              <div className="flex items-center gap-2 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Message Received!</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your inquiry regarding &quot;{formData.category}&quot; has been recorded. Our team will review your message shortly at <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', category: 'Editorial Suggestion', message: '' });
                }}
                className="mt-2 text-xs font-semibold text-emerald-700 underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. tariq@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Inquiry Subject / Topic</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
                >
                  <option value="Editorial Suggestion">Editorial Suggestion or Article Feedback</option>
                  <option value="Technical Correction">Report a Technical Bug or Link Issue</option>
                  <option value="Freelancing Guidance">Freelancing & Tech Question</option>
                  <option value="Business Partnership">Advertising & Commercial Inquiry</option>
                  <option value="General Question">General Reader Inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Your Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry or suggestion in detail..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#172033] hover:bg-[#2563EB] text-white font-medium text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>

              <p className="text-[11px] text-slate-400 pt-1">
                Note: In this client demonstration environment, submissions are confirmed in-session without routing through an external backend mail server.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
