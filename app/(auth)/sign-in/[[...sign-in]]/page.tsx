import { AuthPageWrapper, SignInForm } from '@/components/auth';

export default function SignInPage() {
  return (
    <AuthPageWrapper
      title="Where stories branch"
      subtitle="into infinite possibilities"
      description="Join thousands of writers creating collaborative, branching narratives that evolve with every contribution."
    >
      <SignInForm />
    </AuthPageWrapper>
  );
}
