import { IImageAsset } from '..';
import {
  APPEARANCE_ROLES,
  ATTRIBUTE_LEVELS,
  CHARACTER_GENDERS,
  CHARACTER_ROLES,
  CHARACTER_STATUSES,
  RELATIONSHIP_TYPES,
} from './character-enum';

// ========================================
// DERIVED TYPES
// ========================================

export type TCharacterRole = (typeof CHARACTER_ROLES)[number];
export type TCharacterGender = (typeof CHARACTER_GENDERS)[number];
export type TCharacterStatus = (typeof CHARACTER_STATUSES)[number];
export type TAttributeLevel = (typeof ATTRIBUTE_LEVELS)[number];
export type TRelationshipType = (typeof RELATIONSHIP_TYPES)[number];
export type TAppearanceRole = (typeof APPEARANCE_ROLES)[number];

// ========================================
// EMBEDDED SUB-DOCUMENT INTERFACES
// ========================================

export interface ICharacterAppearance {
  height?: string;
  build?: string;
  hair?: string;
  eyes?: string;
  distinctiveFeatures?: string;
  clothingStyle?: string;
}

export interface ICharacterAttributes {
  bravery?: TAttributeLevel;
  intelligence?: TAttributeLevel;
  loyalty?: TAttributeLevel;
  cunning?: TAttributeLevel;
  empathy?: TAttributeLevel;
  ambition?: TAttributeLevel;
}

export interface ICharacterRelationship {
  _id: string;
  toCharacterId: string;
  relationshipType?: TRelationshipType;
  /** Human-readable label e.g. "Father", "Sister", "Rival" */
  label?: string;
  description?: string;
  /** 0–100 strength percentage */
  strengthPercentage: number;
}

export interface ICharacterChapterAppearance {
  _id: string;
  chapterSlug: string;
  role?: TAppearanceRole;
  description?: string;
}

// ========================================
// ROOT INTERFACE
// ========================================

export interface ICharacter {
  _id: string;
  storySlug: string;
  createdBy: string;

  // Basic Information
  image?: IImageAsset;
  fullName: string;
  nickname?: string;
  roleInStory: TCharacterRole;
  age?: number;
  gender?: TCharacterGender;
  nationality?: string;
  occupation?: string;
  statusInStory?: TCharacterStatus;

  // About
  biography?: string;
  personality?: string;
  motivationGoal?: string;

  // Personal Details
  languages: string[];
  birthplace?: string;
  family?: string;
  education?: string;

  // Additional Details
  strengths: string[];
  weaknesses: string[];
  greatestFear?: string;
  habitsQuirks?: string;
  secrets?: string;

  // Appearance
  appearance: ICharacterAppearance;

  // Attributes (radar chart)
  attributes: ICharacterAttributes;

  // Detail extras
  quote?: string;
  quickFacts: string[];
  firstAppearsChapterSlug?: string;

  tags: string[];

  // Embedded arrays
  relationships: ICharacterRelationship[];
  appearances: ICharacterChapterAppearance[];

  createdAt: Date;
  updatedAt: Date;
}
