import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="bg-bg-cream relative flex min-h-screen items-center justify-center overflow-hidden">
      <SignUp />
    </div>
  );
}
