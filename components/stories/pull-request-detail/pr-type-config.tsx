import { PRType } from '@/type';
import { FileEdit, Plus, Trash2 } from 'lucide-react';

export const PR_TYPE_CONFIG: Record<
  PRType,
  { icon: React.ElementType; label: string; color: string }
> = {
  NEW_CHAPTER: {
    icon: Plus,
    label: 'New Chapter',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  EDIT_CHAPTER: {
    icon: FileEdit,
    label: 'Edit Chapter',
    color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/30',
  },
  DELETE_CHAPTER: {
    icon: Trash2,
    label: 'Delete Chapter',
    color: 'text-red-600 bg-red-50 border-red-200',
  },
};
