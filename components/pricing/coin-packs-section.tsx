'use client';

import { useRouter } from 'next/navigation';

import type { ICoinBundle } from '@/type/coin-bundle/coin-bundle.type';
import type { RazorpayFailedResponse, RazorpaySuccessResponse } from '@/type/razorpay.d';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import {
  Coins,
  Flame,
  Gem,
  Loader2,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { openRazorpayCheckout } from '@/lib/razorpay';
import { cn, scrollReveal } from '@/lib/utils';
import { useGetCoinBundles } from '@/services/coin-bundles/coin-bundles.query';
import {
  useCoinOrderVerifyPayment,
  useCreateCoinOrder,
} from '@/services/coin-orders/coin-orders.mutation';

import toast from '../shared/toast/toast';
import type { CoinPackUI } from './coin-pack-ui.type';

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

// Highlight the pack that sits just past the midpoint (best-value anchor).
const HIGHLIGHT_INDEX = Math.floor(PACK_PALETTE.length / 2) - 1;

function mapBundleToCoinPack(bundle: ICoinBundle, index: number): CoinPackUI {
  const palette = PACK_PALETTE[index % PACK_PALETTE.length];

  return {
    id: bundle._id,
    slug: bundle.slug,
    coins: bundle.baseCoins,
    priceINR: Math.round(bundle.inrPrice / 100), // API stores paise → convert to ₹
    bonus: bundle.bonusCoins > 0 ? bundle.bonusCoins : undefined,
    badge: bundle.bonusCoins > 0 ? `+${bundle.bonusCoins.toLocaleString()} Bonus` : undefined,
    highlighted: index === HIGHLIGHT_INDEX,
    icon: palette.icon,
    color: palette.color,
    bgColor: palette.bgColor,
    borderColor: palette.borderColor,
  };
}

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN').format(amount);
}

const INFO_PILLS = [
  { label: 'No Expiry', desc: 'Coins never expire' },
  { label: 'Instant Credit', desc: 'Added to your wallet immediately' },
  { label: 'Secure Payments', desc: 'Powered by Razorpay' },
  { label: 'Stack Anytime', desc: 'Buy multiple packs' },
] as const;

function CoinPackCard({ pack, index }: { pack: CoinPackUI; index: number }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const Icon = pack.icon;
  const totalCoins = pack.coins + (pack.bonus ?? 0);
  const valuePerRupee = totalCoins / pack.priceINR;

  const { mutate: createCoinOrder, isPending: isCreatingOrder } = useCreateCoinOrder();
  const { mutate: verifyPayment, isPending: isVerifyingPayment } = useCoinOrderVerifyPayment();

  const handleVerifyPayment = (res: RazorpaySuccessResponse & { orderId: string }) => {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;
    verifyPayment(
      {
        coinOrderId: orderId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      {
        onSuccess(response) {
          console.log('Payment verified:', response);
          // toast.success(`🎉 Payment verified! ${pack.totalCoins.toLocaleString()} coins will be credited shortly.`, {
          //   icon: '💳',
          // });
        },
        onError(error) {
          console.error('Payment verification failed:', error);
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

    createCoinOrder(
      { bundleSlug: pack.slug, currency: 'INR' },
      {
        onSuccess(response) {
          const orderData = response.data.data;

          const handleSuccess = (res: RazorpaySuccessResponse) => {
            console.log('Payment success:', res);
            toast.success(
              `🎉 Payment successful! ${orderData.bundle.totalCoins.toLocaleString()} coins will be credited shortly.`
            );
            handleVerifyPayment({ ...res, orderId: orderData.coinOrderId });
          };

          const handleFailure = (res: RazorpayFailedResponse) => {
            console.error('Payment failed:', res.error);
            toast.error(
              `Payment failed: ${res.error.description ?? 'Something went wrong. Please try again.'}`
            );
          };

          const handleDismiss = () => {
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
            onSuccess: handleSuccess,
            onFailure: handleFailure,
            onDismiss: handleDismiss,
          });
        },
        onError(error) {
          console.error('Order creation failed:', error);
          toast.error('Could not create order. Please try again.');
        },
      }
    );
  };

  return (
    <motion.div
      {...scrollReveal.card(index)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'group relative flex flex-col rounded-2xl border p-6 transition-shadow duration-300',
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
        <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 gap-1 whitespace-nowrap shadow-sm">
          <TrendingUp className="h-3 w-3" />
          Best Value
        </Badge>
      )}

      {/* Bonus badge */}
      {pack.badge && (
        <span
          className={cn(
            'absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-semibold',
            pack.highlighted ? 'bg-primary/15 text-primary' : 'bg-accent/15 text-accent'
          )}
        >
          {pack.badge}
        </span>
      )}

      {/* Icon */}
      <div
        className={cn(
          'relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
          pack.bgColor
        )}
      >
        <Icon className={cn('h-6 w-6', pack.color)} />
      </div>

      {/* Coin count */}
      <div className="relative mb-1 flex items-end gap-1">
        <span className={cn('font-libre-baskerville text-3xl font-bold', pack.color)}>
          {formatINR(pack.coins)}
        </span>
        <span className="text-muted-foreground mb-0.5 text-sm">coins</span>
      </div>

      {/* Bonus line */}
      <p
        className={cn(
          'relative mb-3 text-xs font-medium',
          pack.bonus ? 'text-emerald-600 dark:text-emerald-400' : 'invisible'
        )}
      >
        {pack.bonus ? `+ ${formatINR(pack.bonus)} bonus coins free!` : '-'}
      </p>

      {/* Price */}
      <div className="relative mb-4">
        <div className="flex items-baseline gap-0.5">
          <span className="text-muted-foreground text-sm">₹</span>
          <span className="text-foreground font-libre-baskerville text-2xl font-bold">
            {formatINR(pack.priceINR)}
          </span>
        </div>
        <p className="text-muted-foreground mt-0.5 text-xs">
          ≈ {valuePerRupee.toFixed(1)} coins per ₹1
        </p>
      </div>

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
        disabled={isCreatingOrder}
      >
        {isCreatingOrder ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        {isCreatingOrder ? 'Creating order…' : 'Buy Pack'}
      </Button>
    </motion.div>
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

function CoinPacksSectionHeader() {
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
        className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed"
      >
        Coins are your in-app currency to unlock chapters, create stories, use AI features, and much
        more. Buy once, use anytime — no expiry.
      </motion.p>
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
  const { data: bundlesResponse, isLoading } = useGetCoinBundles(
    { isActive: true, isDeleted: false, sortBy: 'displayOrder', sortOrder: 'asc' },
    { staleTime: 5 * 60 * 1000 }
  );

  const packs: CoinPackUI[] = (bundlesResponse?.data ?? []).map(mapBundleToCoinPack);

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <CoinPacksSectionHeader />
        <CoinPacksInfoBar />

        {isLoading ? (
          <CoinPacksLoading />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {packs.map((pack, index) => (
              <CoinPackCard key={pack.id} pack={pack} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
