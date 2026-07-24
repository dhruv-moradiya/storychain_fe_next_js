import type { Metadata } from 'next';

import { TermsAndConditionsContent } from '@/components/terms-and-conditions/terms-and-conditions-content';

export const metadata: Metadata = {
  title: 'Terms & Conditions | StoryChain',
  description:
    'Read the Terms & Conditions for StoryChain. Learn about user rights, intellectual property, story branching rules, and coin monetization terms.',
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsContent />;
}
