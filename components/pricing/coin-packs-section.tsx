'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import type { ICoinBundle } from '@/type/coin-bundle/coin-bundle.type';
import type { RazorpayFailedResponse, RazorpaySuccessResponse } from '@/type/razorpay.d';
import { useAuth } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  Coins,
  Flame,
  Gem,
  Loader2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  XCircle,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { openRazorpayCheckout } from '@/lib/razorpay';
import { cn, scrollReveal } from '@/lib/utils';
import { useGetCoinBundles } from '@/services/coin-bundles/coin-bundles.query';
import {
  useCoinOrderVerifyPayment,
  useCreateCoinOrder,
} from '@/services/coin-orders/coin-orders.mutation';

import toast from '../shared/toast/toast';
import type { CoinPackUI } from './coin-pack-ui.type';

/* -------------------------------------------------------------------------------------------------
 * Payment Status Types
 * -------------------------------------------------------------------------------------------------*/

type PaymentStatus = 'idle' | 'creating' | 'paying' | 'verifying' | 'success' | 'error';

interface PaymentStatusConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  showSpinner: boolean;
}

function getPaymentStatusConfig(status: PaymentStatus, packName?: string): PaymentStatusConfig {
  switch (status) {
    case 'creating':
      return {
        icon: <ShoppingCart className="text-primary h-10 w-10" />,
        title: 'Generating Your Order',
        description: 'Please wait while we prepare your order securely…',
        showSpinner: true,
      };
    case 'paying':
      return {
        icon: <Coins className="h-10 w-10 text-amber-500" />,
        title: 'Complete Your Payment',
        description: 'Please complete the payment in the Razorpay window.',
        showSpinner: false,
      };
    case 'verifying':
      return {
        icon: <ShieldCheck className="text-brand-blue h-10 w-10" />,
        title: 'Verifying Your Payment',
        description:
          'We are confirming your transaction. Once verified, coins will be added to your account.',
        showSpinner: true,
      };
    case 'success':
      return {
        icon: <CheckCircle2 className="h-10 w-10 text-emerald-500" />,
        title: 'Payment Successful!',
        description: packName
          ? `Your coins from the ${packName} have been queued and will appear in your wallet shortly.`
          : 'Your coins have been queued and will appear in your wallet shortly.',
        showSpinner: false,
      };
    case 'error':
      return {
        icon: <XCircle className="text-destructive h-10 w-10" />,
        title: 'Something Went Wrong',
        description: 'We could not complete your purchase. Please try again.',
        showSpinner: false,
      };
    default:
      return {
        icon: null,
        title: '',
        description: '',
        showSpinner: false,
      };
  }
}

/* -------------------------------------------------------------------------------------------------
 * PaymentProgressDialog
 * -------------------------------------------------------------------------------------------------*/

function PaymentProgressDialog({
  open,
  onOpenChange,
  status,
  packName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: PaymentStatus;
  packName?: string;
}) {
  const config = getPaymentStatusConfig(status, packName);
  const isDismissible = status === 'success' || status === 'error';

  return (
    <ResponsiveDialog open={open} onOpenChange={isDismissible ? onOpenChange : () => {}}>
      <ResponsiveDialogContent
        showCloseButton={isDismissible}
        dismissible={isDismissible}
        className="max-w-sm"
      >
        <ResponsiveDialogHeader className="px-6 pt-6">
          <ResponsiveDialogTitle className="sr-only">Payment Progress</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="flex flex-col items-center gap-5 px-6 pb-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              {/* Icon */}
              <div className="bg-muted/40 relative flex h-20 w-20 items-center justify-center rounded-full">
                {config.icon}
                {config.showSpinner && (
                  <span className="bg-primary/10 absolute inset-0 animate-ping rounded-full" />
                )}
              </div>

              {/* Text */}
              <div className="space-y-1.5">
                <p className="font-libre-baskerville text-foreground text-xl font-semibold">
                  {config.title}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {config.description}
                </p>
              </div>

              {/* Spinner */}
              {config.showSpinner && (
                <Loader2 className="text-primary/70 mt-1 h-5 w-5 animate-spin" />
              )}

              {/* Close button for terminal states */}
              {isDismissible && (
                <Button
                  className="mt-2 w-full"
                  variant={status === 'success' ? 'default' : 'outline'}
                  onClick={() => onOpenChange(false)}
                >
                  {status === 'success' ? 'Done' : 'Close'}
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </ResponsiveDialogBody>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

// Cycles through icons + colours when rendering API bundles (the API has no
// visual metadata, so we assign styles deterministically by display order).

const PACK_PALETTE = [
  {
    icon: Coins,
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-400/30',
  },
  {
    icon: Star,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    borderColor: 'border-brand-blue/30',
  },
  {
    icon: Gem,
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500/10',
    borderColor: 'border-brand-pink-500/40',
  },
  {
    icon: Flame,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
    borderColor: 'border-brand-orange/30',
  },
  {
    icon: Sparkles,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
  {
    icon: Zap,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
  },
] as const;

function mapBundleToCoinPack(
  bundle: ICoinBundle,
  index: number,
  isHighlighted: boolean
): CoinPackUI {
  const palette = PACK_PALETTE[index % PACK_PALETTE.length];

  return {
    id: bundle._id,
    slug: bundle.slug,
    coins: bundle.baseCoins,
    priceINR: Math.round(bundle.inrPrice / 100), // API stores in paise → convert to ₹
    priceUSD: bundle.usdPrice / 100, // API stores in cents → convert to $
    bonus: bundle.bonusCoins > 0 ? bundle.bonusCoins : undefined,
    badge: bundle.bonusCoins > 0 ? `+${bundle.bonusCoins.toLocaleString()} Bonus` : undefined,
    highlighted: isHighlighted,
    icon: palette.icon,
    color: palette.color,
    bgColor: palette.bgColor,
    borderColor: palette.borderColor,
  };
}

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN').format(amount);
}

function formatUSD(amount: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

const INFO_PILLS = [
  { label: 'No Expiry', desc: 'Coins never expire' },
  { label: 'Instant Credit', desc: 'Added to your wallet immediately' },
  { label: 'Secure Payments', desc: 'Powered by Razorpay' },
  { label: 'Stack Anytime', desc: 'Buy multiple packs' },
] as const;

function CoinPackCard({
  pack,
  index,
  currency,
}: {
  pack: CoinPackUI;
  index: number;
  currency: 'INR' | 'USD';
}) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = React.useState<PaymentStatus>('idle');
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const Icon = pack.icon;
  const totalCoins = pack.coins + (pack.bonus ?? 0);
  const isUSD = currency === 'USD';
  const price = isUSD ? pack.priceUSD : pack.priceINR;
  const currencySymbol = isUSD ? '$' : '₹';
  const valuePerUnit = totalCoins / (price || 1);
  const valueFormatted = isUSD ? valuePerUnit.toFixed(0) : valuePerUnit.toFixed(1);
  const unitLabel = isUSD ? '$1' : '₹1';

  const { mutate: createCoinOrder } = useCreateCoinOrder();
  const { mutate: verifyPayment } = useCoinOrderVerifyPayment();

  const handleVerifyPayment = (res: RazorpaySuccessResponse & { orderId: string }) => {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;

    setPaymentStatus('verifying');
    setDialogOpen(true);

    verifyPayment(
      {
        coinOrderId: orderId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      {
        onSuccess(_response) {
          setPaymentStatus('success');
        },
        onError(_error) {
          setPaymentStatus('error');
          toast.error('Could not verify payment. Please try again.');
        },
      }
    );
  };

  const handleBuyPack = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    setPaymentStatus('creating');
    setDialogOpen(true);

    createCoinOrder(
      { bundleSlug: pack.slug, currency },
      {
        onSuccess(response) {
          const orderData = response.data.data;

          setPaymentStatus('paying');
          setDialogOpen(false);

          const handleSuccess = (res: RazorpaySuccessResponse) => {
            handleVerifyPayment({ ...res, orderId: orderData.coinOrderId });
          };

          const handleFailure = (res: RazorpayFailedResponse) => {
            setPaymentStatus('error');
            setDialogOpen(true);
            toast.error(
              `Payment failed: ${res.error.description ?? 'Something went wrong. Please try again.'}`
            );
          };

          const handleDismiss = () => {
            setPaymentStatus('idle');
            setDialogOpen(false);
            toast.error('Payment cancelled. You can try again anytime.', {
              icon: '💳',
            });
          };

          openRazorpayCheckout({
            razorpayOrderId: orderData.razorpayOrderId,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'StoryChain',
            description: `${orderData.bundle.name} – ${orderData.bundle.totalCoins.toLocaleString()} coins`,
            theme: {
              color: '#ec4899',
              backdrop_color: '#000000',
            },
            onSuccess: handleSuccess,
            onFailure: handleFailure,
            onDismiss: handleDismiss,
          });
        },
        onError(_error) {
          setPaymentStatus('error');
          toast.error('Could not create order. Please try again.');
        },
      }
    );
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setPaymentStatus('idle');
    }
  };

  return (
    <>
      <PaymentProgressDialog
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        status={paymentStatus}
        packName={pack.slug}
      />

      <motion.div
        {...scrollReveal.card(index)}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={cn(
          'group relative flex h-full flex-col justify-between rounded-2xl border p-4 transition-shadow duration-300 sm:p-5',
          'bg-card',
          pack.highlighted
            ? 'border-primary/50 ring-primary/20 shadow-lg ring-2'
            : 'border-border/60 hover:border-primary/30 hover:shadow-md'
        )}
      >
        {/* Hover overlay */}
        <span
          className={cn(
            'pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            pack.highlighted ? 'bg-primary/3' : 'bg-muted/20'
          )}
          aria-hidden
        />

        {/* Best Value badge */}
        {pack.highlighted && (
          <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 z-10 -translate-x-1/2 gap-1 whitespace-nowrap shadow-sm">
            <TrendingUp className="h-3 w-3" />
            Best Value
          </Badge>
        )}

        <div>
          {/* Header Row: Icon + Bonus badge */}
          <div className="mb-4 flex items-center justify-between gap-1.5">
            <div
              className={cn(
                'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
                pack.bgColor
              )}
            >
              <Icon className={cn('h-5 w-5', pack.color)} />
            </div>

            {pack.badge && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide whitespace-nowrap sm:text-[11px]',
                  pack.highlighted
                    ? 'bg-primary/15 text-primary'
                    : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                )}
              >
                {pack.badge}
              </span>
            )}
          </div>

          {/* Coin count */}
          <div className="relative mb-1 flex items-end gap-1">
            <span className={cn('font-libre-baskerville text-3xl font-bold', pack.color)}>
              {formatINR(pack.coins)}
            </span>
            <span className="text-muted-foreground mb-0.5 text-sm">coins</span>
          </div>

          {/* Price */}
          <div className="relative mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-muted-foreground text-sm font-semibold">{currencySymbol}</span>
              <span className="text-foreground font-libre-baskerville text-2xl font-bold">
                {isUSD ? formatUSD(price) : formatINR(price)}
              </span>
            </div>
            <p className="text-muted-foreground mt-0.5 text-xs">
              ≈ {valueFormatted} coins per {unitLabel}
            </p>
          </div>
        </div>

        <div>
          {/* Divider */}
          <div className="border-border/30 relative mb-4 border-t" />

          {/* Total pill */}
          <div className={cn('relative mb-5 rounded-xl px-3 py-2.5 text-center', pack.bgColor)}>
            <p className="text-muted-foreground text-xs">You receive</p>
            <p className={cn('font-libre-baskerville text-lg font-bold', pack.color)}>
              {formatINR(totalCoins)} coins
            </p>
          </div>

          {/* CTA */}
          <Button
            className={cn(
              'relative w-full gap-2',
              pack.highlighted
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
                : 'border-border/60 text-foreground hover:border-primary/50 hover:bg-muted/30'
            )}
            variant={pack.highlighted ? 'default' : 'outline'}
            onClick={handleBuyPack}
            disabled={paymentStatus !== 'idle'}
          >
            <ShoppingCart className="h-4 w-4" />
            Buy Pack
          </Button>
        </div>
      </motion.div>
    </>
  );
}

function CoinPacksLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-muted-foreground flex items-center gap-3 text-sm">
        <Loader2 className="text-primary h-5 w-5 animate-spin" />
        <span>Loading coin packs…</span>
      </div>
    </div>
  );
}

function CurrencyToggle({
  currency,
  onCurrencyChange,
}: {
  currency: 'INR' | 'USD';
  onCurrencyChange: (c: 'INR' | 'USD') => void;
}) {
  return (
    <div className="bg-muted/60 border-border/50 relative inline-flex items-center rounded-full border p-1 shadow-xs">
      <button
        type="button"
        onClick={() => onCurrencyChange('INR')}
        className={cn(
          'relative z-10 flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200',
          currency === 'INR' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {currency === 'INR' && (
          <motion.span
            layoutId="currency-pill"
            className="bg-card border-border/40 absolute inset-0 -z-10 rounded-full border shadow-xs"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}
        <span className="font-bold text-emerald-600 dark:text-emerald-400">₹</span>
        <span>INR (₹)</span>
      </button>

      <button
        type="button"
        onClick={() => onCurrencyChange('USD')}
        className={cn(
          'relative z-10 flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200',
          currency === 'USD' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {currency === 'USD' && (
          <motion.span
            layoutId="currency-pill"
            className="bg-card border-border/40 absolute inset-0 -z-10 rounded-full border shadow-xs"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}
        <span className="text-brand-blue font-bold">$</span>
        <span>USD ($)</span>
      </button>
    </div>
  );
}

function CoinPacksSectionHeader({
  currency,
  onCurrencyChange,
}: {
  currency: 'INR' | 'USD';
  onCurrencyChange: (c: 'INR' | 'USD') => void;
}) {
  return (
    <div className="mb-10 text-center">
      <motion.div
        {...scrollReveal.paragraph}
        className="border-accent/25 bg-accent/8 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
      >
        <Coins className="text-accent h-4 w-4" />
        <span className="text-accent text-sm font-medium">Flexible Coin Packs</span>
      </motion.div>

      <motion.h2
        {...scrollReveal.heading}
        className="font-libre-baskerville text-foreground mb-3 text-3xl tracking-tight sm:text-4xl"
      >
        Power up with Coins
      </motion.h2>

      <motion.p
        {...scrollReveal.paragraph}
        className="text-muted-foreground mx-auto mb-6 max-w-xl text-sm leading-relaxed"
      >
        Coins are your in-app currency to unlock chapters, create stories, use AI features, and much
        more. Buy once, use anytime — no expiry.
      </motion.p>

      <motion.div {...scrollReveal.paragraph}>
        <CurrencyToggle currency={currency} onCurrencyChange={onCurrencyChange} />
      </motion.div>
    </div>
  );
}

function CoinPacksInfoBar() {
  return (
    <motion.div
      {...scrollReveal.card(0)}
      className="border-border/40 from-secondary/5 to-primary/5 mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border bg-linear-to-r px-6 py-4"
    >
      {INFO_PILLS.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <Sparkles className="text-secondary h-3.5 w-3.5 shrink-0" />
          <span className="text-foreground text-sm font-medium">{item.label}</span>
          <span className="text-muted-foreground text-xs">- {item.desc}</span>
        </div>
      ))}
    </motion.div>
  );
}

export function CoinPacksSection() {
  const [currency, setCurrency] = React.useState<'INR' | 'USD'>('INR');
  const { data: bundlesResponse, isLoading } = useGetCoinBundles(
    { isActive: true, isDeleted: false, sortBy: 'displayOrder', sortOrder: 'asc' },
    { staleTime: 5 * 60 * 1000 }
  );

  const bundles = bundlesResponse?.data ?? [];

  // Pick the single anchor pack (or explicit popular pack) to highlight as Best Value
  const explicitPopularIndex = bundles.findIndex((b) => b.isPopular);
  const bestValueIndex =
    explicitPopularIndex >= 0
      ? explicitPopularIndex
      : Math.min(2, Math.max(0, Math.floor(bundles.length / 2) - 1));

  const packs: CoinPackUI[] = bundles.map((bundle, index) =>
    mapBundleToCoinPack(bundle, index, index === bestValueIndex)
  );

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-7xl">
        <CoinPacksSectionHeader currency={currency} onCurrencyChange={setCurrency} />
        <CoinPacksInfoBar />

        {isLoading ? (
          <CoinPacksLoading />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
            {packs.map((pack, index) => (
              <CoinPackCard key={pack.id} pack={pack} index={index} currency={currency} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
