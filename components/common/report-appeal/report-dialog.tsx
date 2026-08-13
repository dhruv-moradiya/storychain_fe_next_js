'use client';

import { useState } from 'react';

import { ReportReason, ReportType } from '@/type/reports';
import { AlertTriangle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { reason: ReportReason; description: string }) => Promise<void>;
  reportType: ReportType;
  relatedTitle?: string;
  isLoading?: boolean;
}

const REPORT_REASONS: Array<{ value: ReportReason; label: string }> = [
  { value: ReportReason.SPAM, label: 'Spam or misleading' },
  { value: ReportReason.HARASSMENT, label: 'Harassment or hate speech' },
  { value: ReportReason.INAPPROPRIATE_CONTENT, label: 'Inappropriate or explicit content' },
  { value: ReportReason.VIOLENCE, label: 'Violence or harm' },
  { value: ReportReason.COPYRIGHT, label: 'Copyright violation' },
  { value: ReportReason.MISINFORMATION, label: 'Misinformation' },
  { value: ReportReason.IMPERSONATION, label: 'Impersonation' },
  { value: ReportReason.UNDERAGE_CONTENT, label: 'Underage content' },
  { value: ReportReason.OFF_TOPIC, label: 'Off-topic or irrelevant' },
  { value: ReportReason.OTHER, label: 'Other issue' },
];

export function ReportDialog({
  open,
  onOpenChange,
  onSubmit,
  reportType,
  relatedTitle,
  isLoading = false,
}: ReportDialogProps) {
  const [reason, setReason] = useState<ReportReason | ''>('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!reason || !description.trim()) return;

    await onSubmit({
      reason,
      description: description.trim(),
    });
    setReason('');
    setDescription('');
    onOpenChange(false);
  };

  const getReportTypeLabel = () => {
    switch (reportType) {
      case 'CHAPTER':
        return 'Chapter';
      case 'COMMENT':
        return 'Comment';
      case 'USER':
        return 'User';
      case 'STORY':
        return 'Story';
      default:
        return 'Content';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 text-card-foreground max-w-md rounded-2xl p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-text-primary flex items-center gap-2 text-base font-semibold">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Report {getReportTypeLabel()}
          </DialogTitle>
          <DialogDescription className="text-text-secondary-65 text-xs">
            Help us keep the community safe. Reports are confidential and reviewed by moderators.
            {relatedTitle && (
              <span className="text-text-primary mt-1.5 block font-mono font-medium">
                &quot;{relatedTitle}&quot;
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2 text-xs">
          <div className="grid gap-1.5">
            <Label htmlFor="reason" className="text-text-secondary-65 text-xs font-semibold">
              Reason for report
            </Label>
            <Select value={reason} onValueChange={(value) => setReason(value as ReportReason)}>
              <SelectTrigger
                id="reason"
                className="border-border/50 bg-background/50 h-9 rounded-xl text-xs"
              >
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border/50 text-xs shadow-md">
                {REPORT_REASONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description" className="text-text-secondary-65 text-xs font-semibold">
              Additional details
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide specific details about the violation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-border/50 bg-background/50 focus:bg-background min-h-[90px] resize-none rounded-xl text-xs"
            />
          </div>
        </div>

        <DialogFooter className="flex items-center justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="border-border/50 bg-card hover:bg-muted/60 h-9 rounded-xl text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!reason || !description.trim() || isLoading}
            className="h-9 gap-1.5 rounded-xl bg-amber-600 text-xs font-semibold text-white hover:bg-amber-700"
          >
            {isLoading && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReportDialog;
