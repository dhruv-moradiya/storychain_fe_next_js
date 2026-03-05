import { TSubmitRequestType } from '@/type/submit-reuqest/submit-request.type';
import { FileEdit, Plus, Trash2 } from 'lucide-react';

export interface SubmitRequestTypeConfig {
  value: TSubmitRequestType;
  label: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}

export const SUBMIT_REQUEST_TYPES: SubmitRequestTypeConfig[] = [
  {
    value: 'new_chapter',
    label: 'New Chapter',
    description: 'Add a new chapter to the story',
    icon: Plus,
    colorClass: 'text-[#10b981]',
    bgClass: 'bg-[#10b981]/15',
  },
  {
    value: 'edit_chapter',
    label: 'Edit Chapter',
    description: 'Propose changes to an existing chapter',
    icon: FileEdit,
    colorClass: 'text-brand-blue',
    bgClass: 'bg-brand-blue/15',
  },
  {
    value: 'delete_chapter',
    label: 'Delete Chapter',
    description: 'Request removal of a chapter',
    icon: Trash2,
    colorClass: 'text-[#ef4444]',
    bgClass: 'bg-[#ef4444]/15',
  },
];
