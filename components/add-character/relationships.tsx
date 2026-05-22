'use client';

import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Plus, Trash2, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { TCharacterFormValues } from './schema';

export function RelationshipsSection() {
  const { control } = useFormContext<TCharacterFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'relationships',
  });

  const [charName, setCharName] = useState('');
  const [relation, setRelation] = useState('');
  const [error, setError] = useState('');

  const handleAddRelationship = () => {
    setError('');
    const trimmedChar = charName.trim();
    const trimmedRelation = relation.trim();

    if (!trimmedChar) {
      setError('Character name is required');
      return;
    }
    if (!trimmedRelation) {
      setError('Relationship type is required');
      return;
    }

    append({
      characterId: trimmedChar,
      relationType: trimmedRelation,
    });

    setCharName('');
    setRelation('');
  };

  return (
    <div className="border-border/50 space-y-6 rounded-2xl border p-5 md:p-6">
      <div className="flex items-center gap-2">
        <span className="text-brand-pink-500 text-lg font-semibold">
          <Users className="text-brand-pink-500 size-5" />
        </span>
        <h3 className="text-text-primary text-base font-semibold">Relationships</h3>
      </div>
      <p className="text-muted-foreground -mt-3 text-xs">
        Define this character's relationships with other characters.
      </p>

      {/* Input Row */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-text-secondary text-xs font-semibold">Character Name</Label>
            <Input
              value={charName}
              onChange={(e) => setCharName(e.target.value)}
              placeholder="Search or type name..."
              className="border-border/50 h-9 rounded-lg bg-transparent text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-text-secondary text-xs font-semibold">Relationship Type</Label>
            <Input
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              placeholder="e.g., Sibling, Ally, Rival"
              className="border-border/50 h-9 rounded-lg bg-transparent text-sm"
            />
          </div>
        </div>

        {error && <p className="text-destructive text-xs font-medium">{error}</p>}

        <Button
          type="button"
          onClick={handleAddRelationship}
          variant="outline"
          size="sm"
          className="text-brand-pink-500 border-brand-pink-500/30 hover:bg-brand-pink-500/5 flex h-9 w-full items-center justify-center gap-1 rounded-lg"
        >
          <Plus size={14} />
          Add Relationship
        </Button>
      </div>

      {/* Relationships List */}
      <div className="space-y-3 pt-2">
        {fields.length === 0 ? (
          <div className="border-border/40 bg-bg-cream/20 flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <div className="bg-brand-pink-500/10 mb-3 flex h-10 w-10 items-center justify-center rounded-full">
              <Users className="text-brand-pink-500 h-5 w-5" />
            </div>
            <h4 className="text-text-primary text-xs font-semibold">No relationships added yet.</h4>
            <p className="text-muted-foreground mt-1 max-w-[240px] text-[11px]">
              Add relationships to show how this character connects with others in your story.
            </p>
          </div>
        ) : (
          <div className="border-border/40 divide-border/20 bg-bg-cream/10 divide-y overflow-hidden rounded-xl border">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center justify-between p-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-text-primary font-bold">{field.characterId}</span>
                  <span className="text-muted-foreground">is</span>
                  <span className="bg-brand-pink-500/10 text-brand-pink-500 rounded-full px-2 py-0.5 font-semibold">
                    {field.relationType}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 w-7"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
