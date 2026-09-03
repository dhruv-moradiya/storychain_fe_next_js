/**
 * Type declarations for the Razorpay browser checkout SDK.
 * The SDK is loaded via a <script> tag (CDN) and exposed on window.Razorpay.
 * Docs: https://razorpay.com/docs/payment-gateway/web-integration/standard/
 */

export interface RazorpayPrefill {
  name?: string;
  email?: string;
  contact?: string;
}

export interface RazorpayTheme {
  color?: string;
  backdrop_color?: string;
  hide_topbar?: boolean;
}

export interface RazorpayModal {
  ondismiss?: () => void;
  confirm_close?: boolean;
  escape?: boolean;
  backdropclose?: boolean;
  animation?: boolean;
}

export interface RazorpayOptions {
  /** Razorpay Key ID (publishable) */
  key: string;
  /** Order amount in smallest currency unit (paise for INR) */
  amount: number | string;
  /** ISO 4217 currency code, e.g. "INR" */
  currency: string;
  /** Your business / app name shown in checkout */
  name: string;
  /** Short description shown in checkout */
  description?: string;
  /** URL of your logo (32x32 to 256x256 px) */
  image?: string;
  /** Razorpay order_id returned from your backend */
  order_id: string;
  /** Pre-fill customer details */
  prefill?: RazorpayPrefill;
  /** Checkout theme customisation */
  theme?: RazorpayTheme;
  /** Modal behaviour */
  modal?: RazorpayModal;
  /** Extra notes / metadata forwarded to your webhook */
  notes?: Record<string, string>;
  /** Called when payment is authorised successfully */
  handler?: (response: RazorpaySuccessResponse) => void;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayInstance {
  open(): void;
  close(): void;
  on(event: 'payment.failed', handler: (response: RazorpayFailedResponse) => void): void;
}

export interface RazorpayFailedResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

export interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}
