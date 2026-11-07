import React from 'react';
import { PageRoute, RouteState } from '../types';
import { Shield, FileText, AlertTriangle, DollarSign, BookOpen } from 'lucide-react';

interface LegalPageProps {
  page: PageRoute;
  navigate: (route: RouteState) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ page, navigate }) => {
  const renderContent = () => {
    switch (page) {
      case 'privacy-policy':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <Shield className="w-4 h-4" />
              <span>Trust & Privacy</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#172033]">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500">Effective Date: March 2026</p>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
              <p>
                At <strong>SmartScope Daily</strong>, accessible from our digital magazine domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by SmartScope Daily and how we use it.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-4">
                1. Information We Collect
              </h2>
              <p>
                When you visit our website, we may collect non-personal browser information, including your IP address, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click counts. This data is not linked to any information that is personally identifiable and is used solely to analyze trends, administer the site, and track user movement.
              </p>
              <p>
                If you contact us directly via our contact form or subscribe to our newsletter, we may collect your name, email address, and the contents of any message or attachments you send us.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-4">
                2. Cookies and Web Beacons
              </h2>
              <p>
                Like any other website, SmartScope Daily uses standard browser cookies. These cookies are used to store information including visitors preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize user experience by customizing web page content based on browser type or other settings.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-4">
                3. Advertising Partners (Google AdSense)
              </h2>
              <p>
                Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that may appear on SmartScope Daily. Google is one of our third-party vendors. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-4">
                4. Third-Party Privacy Policies
              </h2>
              <p>
                SmartScope Daily Privacy Policy does not apply to other advertisers or websites. Thus, we advise you to consult the respective Privacy Policies of these third-party ad servers or platforms (such as WhatsApp) for more detailed information.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-4">
                5. Consent
              </h2>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <FileText className="w-4 h-4" />
              <span>Legal Terms</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#172033]">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-500">Effective Date: March 2026</p>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
              <p>
                Welcome to SmartScope Daily. These terms and conditions outline the rules and regulations for the use of SmartScope Daily website.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-4">
                1. Intellectual Property Rights
              </h2>
              <p>
                Unless otherwise stated, SmartScope Daily and/or its licensors own the intellectual property rights for all editorial content, articles, and original graphics on SmartScope Daily. All intellectual property rights are reserved. You may view and print pages from SmartScope Daily for your own personal, non-commercial use subject to restrictions set in these terms.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-4">
                2. User Restrictions
              </h2>
              <p>
                You are specifically restricted from all of the following:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Publishing any website material in any other media without clear attribution;</li>
                <li>Selling, sublicensing, and/or otherwise commercializing website editorial text;</li>
                <li>Using this website in any way that is or may be damaging to this publication;</li>
                <li>Using this website contrary to applicable laws and regulations.</li>
              </ul>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-4">
                3. Limitation of Liability
              </h2>
              <p>
                In no event shall SmartScope Daily, nor any of its contributors, be held liable for anything arising out of or in any way connected with your use of this website. SmartScope Daily shall not be held liable for any indirect, consequential, or special liability arising out of your reliance on information published herein.
              </p>
            </div>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Important Disclaimers</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#172033]">
              General Disclaimer
            </h1>
            <p className="text-xs text-slate-500">Effective Date: March 2026</p>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
              <p>
                The information provided by <strong>SmartScope Daily</strong> on this website is for general informational and educational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.
              </p>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <h3 className="font-bold text-blue-900 text-sm">
                  General Health & Fitness Information Disclaimer
                </h3>
                <p className="text-xs text-blue-950">
                  The health, fitness, and nutrition guides published on SmartScope Daily do not constitute professional medical advice, clinical diagnosis, or physical therapy treatment. Always seek the direct guidance of your physician, licensed dietitian, or certified medical specialist before embarking on any physical workout program or nutritional dietary alteration.
                </p>
              </div>

              <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  Financial & Business Education Disclaimer
                </h3>
                <p className="text-xs text-slate-800">
                  The business management, expense tracking, and personal budgeting guides contained herein are presented strictly for educational guidance. SmartScope Daily is not a licensed financial advisor, certified accountant, or tax attorney. Commercial decisions should only be made after consultation with certified financial and legal professionals.
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <h3 className="font-bold text-amber-900 text-sm">
                  Technology & Troubleshooting Disclaimer
                </h3>
                <p className="text-xs text-amber-950">
                  While our technology guides and operating system fixes are tested, modifying system files, registry entries, or device storage always carries inherent risks. Always back up your critical documents and personal files before executing system commands or formatting storage drives.
                </p>
              </div>
            </div>
          </div>
        );

      case 'affiliate-disclosure':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">
              <DollarSign className="w-4 h-4" />
              <span>Monetization Transparency</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#172033]">
              Affiliate Disclosure
            </h1>
            <p className="text-xs text-slate-500">Effective Date: March 2026</p>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
              <p>
                In compliance with international consumer protection guidelines and the Federal Trade Commission (FTC), SmartScope Daily discloses that some links on this publication may be affiliate links.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-2">
                How Affiliate Links Work
              </h2>
              <p>
                When you click on certain product links (such as recommended web hosting providers, productivity software, or fitness accessories) and proceed to make a purchase, SmartScope Daily may receive a small referral commission. This commission comes at <strong>zero extra cost to you</strong>; the retail price you pay remains exactly the same.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-2">
                Our Editorial Integrity Guarantee
              </h2>
              <p>
                Our editorial recommendations are never influenced by affiliate partnerships. We evaluate software, equipment, and services based strictly on merit, usability, and value to our readership. We never accept payment in exchange for positive reviews or misleading ratings.
              </p>
            </div>
          </div>
        );

      case 'editorial-policy':
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600">
              <BookOpen className="w-4 h-4" />
              <span>Editorial Standards</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#172033]">
              Editorial Policy & Standards
            </h1>
            <p className="text-xs text-slate-500">Effective Date: March 2026</p>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
              <p>
                At <strong>SmartScope Daily</strong>, our tagline is <em>Explore. Learn. Grow.</em> We believe digital content must inform, enlighten, and genuinely assist readers without artificial filler or sensationalism.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-2">
                1. Accuracy and Fact-Checking
              </h2>
              <p>
                All tutorials and educational guides undergo thorough verification. Technical commands, software names, and procedural steps are verified against current operating system and platform documentation before publication.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-2">
                2. Human-Centric Writing
              </h2>
              <p>
                While our staff utilizes modern digital productivity tools to research and outline topics, every article is written with empathy, clear step-by-step structure, and human tone. We prohibit publishing automated low-effort spam.
              </p>

              <h2 className="font-serif text-xl font-bold text-slate-900 pt-2">
                3. Corrections & Ongoing Updates
              </h2>
              <p>
                Technology evolves continuously. When software interfaces update, procedures change, or readers point out an inaccuracy, we revise our articles promptly and display the verified update date at the top of the guide.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Quick navigation pill bar across legal documents */}
      <div className="mb-8 p-1 bg-slate-100 rounded-lg flex flex-wrap gap-1 text-xs">
        {[
          { id: 'privacy-policy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms & Conditions' },
          { id: 'disclaimer', label: 'Disclaimer' },
          { id: 'affiliate-disclosure', label: 'Affiliate Disclosure' },
          { id: 'editorial-policy', label: 'Editorial Policy' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              navigate({ page: item.id as PageRoute });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              page === item.id
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
        {renderContent()}
      </div>
    </div>
  );
};
