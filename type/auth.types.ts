// OAuth Types
export type OAuthStrategy = 'oauth_google' | 'oauth_github' | 'oauth_discord';
export type OAuthProvider = 'google' | 'github' | 'discord';

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
