import { z } from 'zod';

// Constants
export const BUNDLE_TYPES = [
  'standard',
  'seasonal',
  'festival',
  'limited_time',
  'launch_event',
  'anniversary',
  'creator_partnership',
  'flash_sale',
  'first_purchase',
  'referral_reward',
] as const;
export const RESTRICTION_TYPES = ['unlimited', 'one_time', 'daily', 'monthly', 'lifetime'] as const;
export const SUPPORTED_CURRENCIES = ['INR', 'USD'] as const;

export type BundleType = (typeof BUNDLE_TYPES)[number];
export type RestrictionType = (typeof RESTRICTION_TYPES)[number];
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

// Helpers
const bundleTypesEnum = [...BUNDLE_TYPES] as [
  'standard',
  'seasonal',
  'festival',
  'limited_time',
  'launch_event',
  'anniversary',
  'creator_partnership',
  'flash_sale',
  'first_purchase',
  'referral_reward',
];
const restrictionTypesEnum = [...RESTRICTION_TYPES] as [
  'unlimited',
  'one_time',
  'daily',
  'monthly',
  'lifetime',
];
const supportedCurrenciesEnum = [...SUPPORTED_CURRENCIES] as ['INR', 'USD'];

// ─── Coerce helper ────────────────────────────────────────────────────────────
// In Zod v4, error params use `message` / `error` instead of invalid_type_error
const coercePositiveInt = (label: string) =>
  z.coerce
    .number({ error: `${label} must be a number` })
    .int(`${label} must be a whole number`)
    .min(1, `${label}: minimum is 1`);

const coerceNonNegativeNum = (label: string) =>
  z.coerce.number({ error: `${label} must be a number` }).min(0, `${label} cannot be negative`);

// ─── Thumbnail Sub-Schema ────────────────────────────────────────────────────
const thumbnailSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  publicId: z.string().min(1, 'Public ID is required'),
});

// ─── Restrictions Sub-Schema ──────────────────────────────────────────────────
const restrictionsSchema = z.object({
  type: z.enum(restrictionTypesEnum).default('unlimited'),
  dailyLimit: coercePositiveInt('Daily limit').optional(),
  monthlyLimit: coercePositiveInt('Monthly limit').optional(),
  lifetimeLimit: coercePositiveInt('Lifetime limit').optional(),
  perUserLimit: coercePositiveInt('Per-user limit').optional(),
});

// ─── Main Coin Bundle Schema ──────────────────────────────────────────────────
export const coinBundleFormSchema = z.object({
  // Identity
  name: z.string().min(1, 'Name is required').max(100, 'Max 100 characters'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100, 'Max 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens'),
  description: z.string().max(500, 'Max 500 characters').optional(),
  bundleType: z.enum(bundleTypesEnum, { error: 'Bundle type is required' }),

  // Coins
  baseCoins: coercePositiveInt('Base coins'),
  bonusCoins: z.coerce
    .number({ error: 'Bonus coins must be a number' })
    .int()
    .min(0, 'Cannot be negative')
    .default(0),

  // Pricing
  inrPrice: coerceNonNegativeNum('INR price'),
  usdPrice: coerceNonNegativeNum('USD price').default(0),
  currencies: z
    .array(z.enum(supportedCurrenciesEnum))
    .min(1, 'Select at least one currency')
    .default(['INR']),

  // Thumbnail (required — must upload before submitting)
  thumbnail: thumbnailSchema,

  // Display
  isFeatured: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  displayOrder: z.coerce.number().int().min(0).default(0),
  promotionalBadge: z.string().max(50, 'Max 50 characters').optional(),
  marketingTagline: z.string().max(150, 'Max 150 characters').optional(),

  // Visibility & Lifecycle
  isActive: z.boolean().default(true),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  startTime: z
    .string()
    .max(8)
    .regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, 'Invalid time (HH:MM or HH:MM:SS)')
    .optional()
    .or(z.literal('')),
  endTime: z
    .string()
    .max(8)
    .regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, 'Invalid time (HH:MM or HH:MM:SS)')
    .optional()
    .or(z.literal('')),
  timezone: z.string().default('Asia/Kolkata'),

  // Purchase Restrictions
  restrictions: restrictionsSchema.default({
    type: 'unlimited',
  }),
});

export type CoinBundleFormValues = z.infer<typeof coinBundleFormSchema>;
// Input type: fields with .default() are optional here, required in CoinBundleFormValues
export type CoinBundleFormInput = z.input<typeof coinBundleFormSchema>;

// ─── Default Values ───────────────────────────────────────────────────────────
export const coinBundleDefaultValues: CoinBundleFormValues = {
  name: '',
  slug: '',
  description: '',
  bundleType: 'standard',
  baseCoins: 0,
  bonusCoins: 0,
  inrPrice: 0,
  usdPrice: 0,
  currencies: ['INR'],
  thumbnail: { url: '', publicId: '' },
  isFeatured: false,
  isPopular: false,
  displayOrder: 0,
  promotionalBadge: '',
  marketingTagline: '',
  isActive: true,
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  timezone: 'Asia/Kolkata',
  restrictions: {
    type: 'unlimited',
    dailyLimit: undefined,
    monthlyLimit: undefined,
    lifetimeLimit: undefined,
    perUserLimit: undefined,
  },
};
