'use client';

import Link from 'next/link';
import { storyChainLandingContent } from '@/constants';

export const FooterSection = () => {
  return (
    <footer className="bg-bg-cream-blend font-ibm-plex-mono relative z-10 border-t border-black/5 px-6 pt-10 pb-16 sm:pt-24 sm:pb-24">
      <div className="text-text-secondary-65 mx-auto grid max-w-6xl grid-cols-2 gap-6 text-left text-xs sm:grid-cols-5 sm:gap-12">
        <div>
          <div className="text-text-primary mb-3 flex items-center gap-2 font-bold">
            <span className="bg-brand-pink-500 h-2.5 w-2.5 rounded-full" />
            {storyChainLandingContent.footer.brand.name}
          </div>
          <div className="mb-2 leading-relaxed font-medium">
            {storyChainLandingContent.footer.brand.description}
          </div>
          <div className="text-text-secondary-65 text-[10px] font-medium italic">
            {storyChainLandingContent.footer.brand.tagline}
          </div>
        </div>

        {storyChainLandingContent.footer.sections.map((section) => (
          <div key={section.title}>
            <div className="text-text-primary mb-3 font-bold">{section.title}</div>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-pink-500 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-text-secondary-65 mx-auto mt-12 max-w-6xl border-t border-black/5 pt-6 text-center text-xs font-medium">
        {storyChainLandingContent.footer.copyright}
      </div>
    </footer>
  );
};
