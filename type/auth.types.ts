import type { OAuthStrategy } from '@clerk/types';

export type OAuthProvider = 'google' | 'github';

export type ForgotPasswordStep = 'email' | 'code' | 'success';

export interface ClerkAPIError {
  errors: {
    message: string;
    longMessage?: string;
    code?: string;
  }[];
}

export type {
  SignInFormData,
  SignUpFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from './auth-forms';
export type { OAuthStrategy };
