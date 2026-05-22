'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Info } from 'lucide-react';

import { toast } from '@/components/shared/toast/toast';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/lib/animations';

import { TipBanner } from '../common/tip-banner';
import { AboutCharacterSection } from './about-character';
import { AdditionalDetailsSection } from './additional-details';
import { AppearanceSection } from './appearance';
import { BasicInfoSection } from './basic-info';
import { CharacterAttributesSection } from './character-attributes';
import { PersonalDetailsSection } from './personal-details';
import { RelationshipsSection } from './relationships';
import { CharacterFormSchema, type TCharacterFormValues } from './schema';
import { TagsSection } from './tags';

const defaultValues: TCharacterFormValues = {
  fullName: '',
  title: '',
  role: '',
  age: '',
  gender: '',
  nationality: '',
  occupation: '',
  status: '',
  biography: '',
  personality: '',
  motivation: '',
  languages: '',
  birthplace: '',
  family: '',
  education: '',
  appearance: {
    height: '',
    build: '',
    hair: '',
    eyes: '',
    distinctiveFeatures: '',
    clothingStyle: '',
  },
  attributes: {
    bravery: undefined,
    intelligence: undefined,
    loyalty: undefined,
    cunning: undefined,
    empathy: undefined,
    ambition: undefined,
  },
  relationships: [],
  strengths: '',
  weaknesses: '',
  greatestFear: '',
  habitsQuirks: '',
  secrets: '',
  tags: [],
};

export function AddCharacterForm() {
  const router = useRouter();
  const { slug } = useParams();
  const storySlug = Array.isArray(slug) ? slug[0] : slug;

  const methods = useForm<TCharacterFormValues>({
    resolver: zodResolver(CharacterFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: TCharacterFormValues) => {
    try {
      console.log('Submitted Character Data:', data);

      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Character added successfully!');

      // Redirect back to overview tab
      router.push(`/stories/${storySlug}/overview`);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please check your fields and try again.');
    }
  };

  const handleCancel = () => {
    router.push(`/stories/${storySlug}/overview`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-7xl space-y-6 pb-12">
        {/* Header & Controls Panel */}
        <FadeInView delay={0.05}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                type="button"
                onClick={handleCancel}
                className="group text-muted-foreground hover:text-text-primary mb-2 flex items-center gap-1.5 text-xs font-medium transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Back to Story Overview
              </button>
              <h2 className="text-text-primary text-2xl font-bold tracking-tight">Add Character</h2>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Create a new character and add them to your story.
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="border-border/60 hover:bg-muted/50 h-9 rounded-md px-4 text-sm font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-pink-500 hover:bg-brand-pink-600 active:bg-brand-pink-700 h-9 rounded-md px-4 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
              >
                {isSubmitting ? 'Saving...' : 'Save Character'}
              </Button>
            </div>
          </div>
        </FadeInView>

        {/* Form Grid */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <FadeInView delay={0.1}>
              <BasicInfoSection />
            </FadeInView>
            <FadeInView delay={0.15}>
              <PersonalDetailsSection />
            </FadeInView>
            <FadeInView delay={0.2}>
              <RelationshipsSection />
            </FadeInView>
            <FadeInView delay={0.25}>
              <AppearanceSection />
            </FadeInView>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <FadeInView delay={0.12}>
              <AboutCharacterSection />
            </FadeInView>
            <FadeInView delay={0.17}>
              <CharacterAttributesSection />
            </FadeInView>
            <FadeInView delay={0.22}>
              <AdditionalDetailsSection />
            </FadeInView>
            <FadeInView delay={0.27}>
              <TagsSection />
            </FadeInView>
          </div>
        </div>

        {/* Tip Banner */}
        <FadeInView delay={0.3}>
          <TipBanner
            className="bg-bg-cream-dark/50 border-border/30 text-muted-foreground flex items-start gap-3 rounded-xl border p-4 text-xs"
            icon={<Info className="text-brand-pink-500 mt-0.5 h-4 w-4 shrink-0" />}
            title={`You can always edit this character's profile later from the Characters section of your story dashboard.`}
          />
        </FadeInView>
      </form>
    </FormProvider>
  );
}
