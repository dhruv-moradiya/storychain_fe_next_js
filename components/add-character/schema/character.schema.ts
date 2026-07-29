import { z } from 'zod';

// Image Upload Schema
// Supports both client-side File objects and URL strings (e.g. from DB)
// ---------------------------------------------------------------------------
export const CharacterImageSchema = z
  .union([
    // If it's a URL string
    z.string().trim().url('Invalid image URL').or(z.literal('')),
    // If it's a File object (supported by react-hook-form / dropzone)
    z
      .custom<File>((val) => val instanceof File, 'Invalid image file')
      .refine((file) => file.size <= 5 * 1024 * 1024, 'Max image size is 5MB')
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        'Only JPG, PNG, and WebP formats are supported'
      ),
    // If it's an uploaded Cloudinary asset object
    z.object({
      url: z.string(),
      publicId: z.string(),
    }),
  ])
  .optional()
  .nullable();

// Helper schema for attribute levels (must be a number between 1 and 10, or undefined)
const AttributeLevelSchema = z
  .number({
    message: 'Attribute level must be a number',
  })
  .min(1, 'Attribute level must be at least 1')
  .max(10, 'Attribute level cannot exceed 10')
  .optional();

// ---------------------------------------------------------------------------
// Main Character Form Schema
// ---------------------------------------------------------------------------
export const CharacterFormSchema = z.object({
  // Basic Information
  image: CharacterImageSchema,

  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .max(100, 'Full name cannot exceed 100 characters'),

  title: z
    .string()
    .trim()
    .max(100, 'Title/Nickname cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),

  roleInStory: z.string().min(1, 'Role in story is required'),

  age: z.string().trim().max(50, 'Age cannot exceed 50 characters').optional().or(z.literal('')),

  gender: z
    .string()
    .trim()
    .max(50, 'Gender cannot exceed 50 characters')
    .optional()
    .or(z.literal('')),

  nationality: z
    .string()
    .trim()
    .max(100, 'Nationality cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),

  occupation: z
    .string()
    .trim()
    .max(100, 'Occupation cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),

  status: z.string().optional().or(z.literal('')),

  // About the Character
  biography: z
    .string()
    .trim()
    .min(1, 'Biography / Background is required')
    .max(1000, 'Biography / Background cannot exceed 1000 characters'),

  personality: z
    .string()
    .trim()
    .max(500, 'Personality cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),

  motivation: z
    .string()
    .trim()
    .max(500, 'Motivation / Goal cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),

  // Personal Details
  languages: z
    .string()
    .trim()
    .max(200, 'Languages list cannot exceed 200 characters')
    .optional()
    .or(z.literal('')),

  birthplace: z
    .string()
    .trim()
    .max(150, 'Birthplace cannot exceed 150 characters')
    .optional()
    .or(z.literal('')),

  family: z
    .string()
    .trim()
    .max(300, 'Family description cannot exceed 300 characters')
    .optional()
    .or(z.literal('')),

  education: z
    .string()
    .trim()
    .max(300, 'Education details cannot exceed 300 characters')
    .optional()
    .or(z.literal('')),

  // Appearance
  appearance: z
    .object({
      height: z
        .string()
        .trim()
        .max(50, 'Height cannot exceed 50 characters')
        .optional()
        .or(z.literal('')),
      build: z
        .string()
        .trim()
        .max(100, 'Build cannot exceed 100 characters')
        .optional()
        .or(z.literal('')),
      hair: z
        .string()
        .trim()
        .max(100, 'Hair description cannot exceed 100 characters')
        .optional()
        .or(z.literal('')),
      eyes: z
        .string()
        .trim()
        .max(100, 'Eyes description cannot exceed 100 characters')
        .optional()
        .or(z.literal('')),
      distinctiveFeatures: z
        .string()
        .trim()
        .max(300, 'Distinctive features cannot exceed 300 characters')
        .optional()
        .or(z.literal('')),
      clothingStyle: z
        .string()
        .trim()
        .max(300, 'Clothing style description cannot exceed 300 characters')
        .optional()
        .or(z.literal('')),
    })
    .optional(),

  // Character Attributes (Mapped to radar chart levels, typically scale of 1-10)
  attributes: z
    .object({
      bravery: AttributeLevelSchema,
      intelligence: AttributeLevelSchema,
      loyalty: AttributeLevelSchema,
      cunning: AttributeLevelSchema,
      empathy: AttributeLevelSchema,
      ambition: AttributeLevelSchema,
    })
    .optional(),

  // Relationships (Dynamic list of character connections)
  relationships: z
    .array(
      z.object({
        characterId: z.string().min(1, 'Please select a character'),
        relationType: z.string().trim().min(1, 'Relationship type is required'),
      })
    )
    .optional(),

  // Additional Details
  strengths: z
    .string()
    .trim()
    .max(300, 'Strengths cannot exceed 300 characters')
    .optional()
    .or(z.literal('')),

  weaknesses: z
    .string()
    .trim()
    .max(300, 'Weaknesses cannot exceed 300 characters')
    .optional()
    .or(z.literal('')),

  greatestFear: z
    .string()
    .trim()
    .max(300, 'Greatest fear cannot exceed 300 characters')
    .optional()
    .or(z.literal('')),

  habitsQuirks: z
    .string()
    .trim()
    .max(300, 'Habits / Quirks cannot exceed 300 characters')
    .optional()
    .or(z.literal('')),

  secrets: z
    .string()
    .trim()
    .max(500, 'Secrets cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),

  // Tags
  tags: z.array(z.string().trim()).optional(),
});

export type TCharacterFormValues = z.infer<typeof CharacterFormSchema>;
