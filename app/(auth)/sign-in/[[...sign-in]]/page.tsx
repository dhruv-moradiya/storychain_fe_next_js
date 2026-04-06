import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="bg-bg-cream relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Right Side - Auth Form */}
      <SignIn />
    </div>
  );
}
