import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="bg-bg-cream relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Right Side - Auth Form */}
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto w-full',
            card: 'bg-bg-cream/50 backdrop-blur-md border border-neutral-200 shadow-xl',
            headerTitle: 'text-text-primary font-playfair font-semibold text-2xl',
            headerSubtitle: 'text-text-secondary-65 font-literata',
            socialButtonsBlockButton:
              'border-neutral-200 bg-white hover:bg-neutral-50 text-text-primary font-libre-baskerville font-medium transition-all',
            socialButtonsBlockButtonText: 'font-libre-baskerville font-medium',
            socialButtonsIconButton: 'border-neutral-200',
            dividerLine: 'bg-neutral-200',
            dividerText: 'text-text-secondary-65 font-ibm-plex-mono text-xs uppercase',
            formButtonPrimary:
              'bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 hover:from-brand-pink-600 hover:to-brand-pink-700 text-white font-libre-baskerville font-medium transition-all shadow-lg shadow-brand-pink-500/20',
            formFieldLabel: 'text-text-primary font-libre-baskerville font-medium text-sm',
            formFieldInput:
              'border-neutral-200 bg-white font-ibm-plex-mono focus:border-brand-blue focus:ring-brand-blue/20 transition-all',
            footerActionLink:
              'text-brand-pink-500 hover:text-brand-pink-600 font-libre-baskerville font-medium',
            identityPreviewText: 'text-text-primary font-literata',
            identityPreviewEditButton:
              'text-brand-blue hover:text-brand-blue/80 font-libre-baskerville',
            formFieldInputShowPasswordButton: 'text-text-secondary-65 hover:text-text-primary',
          },
          layout: {
            socialButtonsPlacement: 'top',
            socialButtonsVariant: 'blockButton',
          },
        }}
      />
    </div>
  );
}
