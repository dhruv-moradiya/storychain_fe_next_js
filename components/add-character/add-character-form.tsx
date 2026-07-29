'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Info } from 'lucide-react';

import { toast } from '@/components/shared/toast/toast';
import { Button } from '@/components/ui/button';
import {
  useAddCharacter,
  useGenerateCharacterSignature,
} from '@/services/characters/characters.mutation';

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
  roleInStory: '',
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
  const storySlug = (Array.isArray(slug) ? slug[0] : slug) ?? '';

  const generateSignature = useGenerateCharacterSignature(storySlug);
  const addCharacter = useAddCharacter(storySlug);

  const methods = useForm<TCharacterFormValues>({
    resolver: zodResolver(CharacterFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const isSaving = isSubmitting || generateSignature.isPending || addCharacter.isPending;

  const onSubmit = async (data: TCharacterFormValues) => {
    console.log('data :>> ', data);
    try {
      let uploadedImage: { url: string; publicId: string } | undefined = undefined;

      // 1. Call API to get upload signature if an image file was selected
      if (data.image instanceof File) {
        const signatureRes = await generateSignature.mutateAsync();
        const uploadURL = signatureRes.data.data?.uploadURL;

        if (!uploadURL) {
          toast.error('Failed to get image upload signature');
          return;
        }

        // 2. Upload image to Cloudinary using signature upload URL
        const url = new URL(uploadURL);
        const searchParams = url.searchParams;

        const formData = new FormData();
        formData.append('file', data.image);

        const timestamp = searchParams.get('timestamp');
        const signature = searchParams.get('signature');
        const apiKey = searchParams.get('api_key');
        const folder = searchParams.get('folder');
        const eager = searchParams.get('eager');

        if (timestamp) formData.append('timestamp', timestamp);
        if (signature) formData.append('signature', signature);
        if (apiKey) formData.append('api_key', apiKey);
        if (folder) formData.append('folder', folder);
        if (eager) formData.append('eager', eager);

        const uploadEndpoint = `${url.origin}${url.pathname}`;
        const cloudinaryRes = await fetch(uploadEndpoint, {
          method: 'POST',
          body: formData,
        });

        if (!cloudinaryRes.ok) {
          toast.error('Failed to upload character image');
          return;
        }

        const cloudinaryData = await cloudinaryRes.json();
        uploadedImage = {
          url: cloudinaryData.secure_url,
          publicId: cloudinaryData.public_id,
        };
      }

      // 3. Call Add Character API with payload
      const payload: TCharacterFormValues = {
        ...data,
        image: uploadedImage ?? (typeof data.image === 'string' ? data.image : undefined),
      };

      const res = await addCharacter.mutateAsync(payload);

      if (res.data.success) {
        // 4. Redirect user to route "/stories/{slug}/overview?tab=characters"
        router.push(`/stories/${storySlug}/overview?tab=characters`);
      }
    } catch (err) {
      console.error('Error submitting character:', err);
    }
  };

  const handleCancel = () => {
    router.push(`/stories/${storySlug}/overview?tab=characters`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-7xl space-y-6 pb-12">
        {/* Header & Controls Panel */}
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
              disabled={isSaving}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 active:bg-brand-pink-700 h-9 rounded-md px-4 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
            >
              {isSaving ? 'Saving...' : 'Save Character'}
            </Button>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <BasicInfoSection />
            <PersonalDetailsSection />
            <RelationshipsSection />
            <AppearanceSection />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AboutCharacterSection />
            <CharacterAttributesSection />
            <AdditionalDetailsSection />
            <TagsSection />
          </div>
        </div>

        {/* Tip Banner */}
        <TipBanner
          className="bg-bg-cream-dark/50 border-border/30 text-muted-foreground flex items-start gap-3 rounded-xl border p-4 text-xs"
          icon={<Info className="text-brand-pink-500 mt-0.5 h-4 w-4 shrink-0" />}
          title={`You can always edit this character's profile later from the Characters section of your story dashboard.`}
        />
      </form>
    </FormProvider>
  );
}
