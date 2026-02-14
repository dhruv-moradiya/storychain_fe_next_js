'use client';

import Link from 'next/link';
import { storyChainLandingContent } from '@/constants';

export const FooterSection = () => {
  return (
    <footer className="bg-bg-cream font-ibm-plex-mono relative z-10 border-t border-black/5 px-6 pt-10 pb-16 sm:pt-12 sm:pb-24">
      <div className="text-text-secondary-65 mx-auto grid max-w-6xl grid-cols-2 gap-6 text-left text-xs sm:grid-cols-5 sm:gap-12">
        <div>
          <div className="text-text-tertiary mb-3 flex items-center gap-2 font-bold">
            <span className="bg-brand-pink-500 h-2.5 w-2.5 rounded-full" />
            {storyChainLandingContent.footer.brand.name}
          </div>
          <div className="mb-2 leading-relaxed font-semibold">
            {storyChainLandingContent.footer.brand.description}
          </div>
          <div className="text-text-secondary-65 text-[10px] font-semibold italic">
            {storyChainLandingContent.footer.brand.tagline}
          </div>
        </div>

        {storyChainLandingContent.footer.sections.map((section) => (
          <div key={section.title}>
            <div className="text-text-tertiary mb-3 font-bold">{section.title}</div>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-semibold transition-colors hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-text-secondary-65 mx-auto mt-12 max-w-6xl border-t pt-6 text-center text-xs font-semibold">
        {storyChainLandingContent.footer.copyright}
      </div>
    </footer>
  );
};
