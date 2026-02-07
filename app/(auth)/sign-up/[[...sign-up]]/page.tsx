import { AuthPageWrapper, SignUpForm } from '@/components/auth';

export default function SignUpPage() {
  return (
    <AuthPageWrapper
      title="Start your journey"
      subtitle="as a storyteller"
      description="Create an account and join a community of writers crafting stories together. Your words can shape entire universes."
    >
      <SignUpForm />
    </AuthPageWrapper>
  );
}
