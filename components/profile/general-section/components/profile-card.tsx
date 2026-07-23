'use client';

import { useRef, useState } from 'react';

import { useUser } from '@clerk/nextjs';
import { Camera, Loader2, Pencil, Save, X } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ProfileCard() {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [name, setName] = useState(user?.fullName || user?.username || '');
  const [bio, setBio] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (JPG, PNG, GIF)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      await user.setProfileImage({ file });
      toast.success('Profile photo updated successfully!');
    } catch (err: unknown) {
      console.error('Failed to update avatar:', err);
      toast.error('Failed to update profile photo. Please try again.');
    } finally {
      setIsUploading(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  return (
    <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
      <div className="mb-4">
        <h2 className="text-text-primary text-base font-semibold">Profile</h2>
        <p className="text-text-secondary-65 text-sm">Your public profile information</p>
      </div>

      {/* Hidden File Input */}
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleAvatarChange} />

      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div
            className="group relative cursor-pointer"
            onClick={handleAvatarClick}
            role="button"
            tabIndex={0}
            aria-label="Change profile photo"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleAvatarClick();
              }
            }}
          >
            <Avatar className="ring-background h-20 w-20 shadow-md ring-4">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'Avatar'} />
              <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-500 text-xl font-semibold">
                {user?.firstName?.[0] || user?.username?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>

            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-xs transition group-hover:opacity-100">
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              ) : (
                <Camera className="h-6 w-6 text-white" />
              )}
            </div>
          </div>

          <div>
            <p className="text-text-primary text-sm font-medium">Profile Photo</p>
            <p className="text-text-secondary-65 text-xs">JPG, PNG or GIF. Max size 5MB.</p>
            <Button
              variant="outline"
              size="sm"
              className="border-border/60 hover:bg-muted mt-2 cursor-pointer"
              onClick={handleAvatarClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="text-brand-pink-500 mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Camera className="text-brand-pink-500 mr-2 h-4 w-4" />
                  Change Photo
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label className="text-text-primary">Display Name</Label>
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
                <Button
                  size="icon"
                  className="bg-green-500/10 text-green-600 hover:bg-green-500/20"
                  onClick={() => setIsEditingName(false)}
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setIsEditingName(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <p className="text-text-primary text-sm font-medium">{name || 'Not set'}</p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-brand-pink-500/10 hover:text-brand-pink-500"
                  onClick={() => setIsEditingName(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label className="text-text-primary">Bio</Label>
          {isEditingBio ? (
            <>
              <Textarea
                value={bio}
                rows={3}
                className="resize-none"
                onChange={(e) => setBio(e.target.value)}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setIsEditingBio(false)}>
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditingBio(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-start gap-2">
              <p className="text-text-secondary-65 text-sm">
                {bio || 'No bio set. Add a short description.'}
              </p>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-brand-pink-500/10 hover:text-brand-pink-500"
                onClick={() => setIsEditingBio(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
