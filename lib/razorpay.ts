'use client';

import type {
  RazorpayFailedResponse,
  RazorpayOptions,
  RazorpaySuccessResponse,
} from '@/type/razorpay.d';

/**
 * Options accepted by the openRazorpayCheckout helper.
 * All required Razorpay fields must be provided; the key is pulled from the
 * NEXT_PUBLIC_RAZORPAY_KEY_ID environment variable automatically.
 */
export interface OpenRazorpayOptions {
  /** Razorpay order_id returned from the backend */
  razorpayOrderId: string;
  /** Amount in paise (100 paise = ₹1) */
  amount: number | string;
  /** ISO 4217 currency code, e.g. "INR" */
  currency: string;
  /** Business name shown in the checkout modal */
  name?: string;
  /** Short description shown in the checkout modal */
  description?: string;
  /** Customer prefill details */
  prefill?: RazorpayOptions['prefill'];
  /** Optional custom theme configuration */
  theme?: RazorpayOptions['theme'];
  /** Optional custom modal configuration */
  modal?: RazorpayOptions['modal'];
  /** Called when payment is authorised */
  onSuccess?: (response: RazorpaySuccessResponse) => void;
  /** Called when payment fails */
  onFailure?: (response: RazorpayFailedResponse) => void;
  /** Called when the user closes the modal without paying */
  onDismiss?: () => void;
}

/**
 * Opens the Razorpay checkout modal imperatively.
 * Throws if window.Razorpay is not available (script not loaded yet).
 */
export function openRazorpayCheckout(options: OpenRazorpayOptions): void {
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  if (!razorpayKey) {
    throw new Error('NEXT_PUBLIC_RAZORPAY_KEY_ID is not set. Add it to your .env file.');
  }

  if (typeof window === 'undefined' || !window.Razorpay) {
    throw new Error(
      'Razorpay SDK is not loaded yet. Make sure the checkout.js <Script> is in your layout.'
    );
  }

  const rzpOptions: RazorpayOptions = {
    key: razorpayKey,
    amount: options.amount,
    currency: options.currency,
    name: options.name ?? 'StoryChain',
    description: options.description ?? 'Coin Pack Purchase',
    order_id: options.razorpayOrderId,
    prefill: options.prefill,
    theme: {
      color: options.theme?.color ?? '#ec4899',
      backdrop_color: options.theme?.backdrop_color ?? '#000000',
      hide_topbar: options.theme?.hide_topbar,
    },
    modal: {
      ondismiss: options.onDismiss,
      confirm_close: true,
      backdropclose: true,
      ...options.modal,
    },
    handler: options.onSuccess,
  };

  const razorpay = new window.Razorpay(rzpOptions);

  if (options.onFailure) {
    razorpay.on('payment.failed', options.onFailure);
  }

  razorpay.open();
}
