import { FileText, Settings } from 'lucide-react';

export const STEPS = [
  { id: 1, label: 'Basic Info', icon: FileText },
  { id: 2, label: 'Settings', icon: Settings },
] as const;

export type StepId = (typeof STEPS)[number]['id'];
