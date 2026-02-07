import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import type { ReportType, ReportReason, CreateReportData } from '@/type/report.type';

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateReportData) => Promise<void>;
  reportType: ReportType;
  relatedId: string;
  relatedTitle?: string;
  isLoading?: boolean;
}

const REPORT_REASONS: Array<{ value: ReportReason; label: string }> = [
  { value: 'SPAM', label: 'Spam or misleading' },
  { value: 'HARASSMENT', label: 'Harassment or hate speech' },
  { value: 'INAPPROPRIATE_CONTENT', label: 'Inappropriate content' },
  { value: 'COPYRIGHT', label: 'Copyright violation' },
  { value: 'OFF_TOPIC', label: 'Off-topic or irrelevant' },
  { value: 'OTHER', label: 'Other issue' },
];

export function ReportDialog({
  open,
  onOpenChange,
  onSubmit,
  reportType,
  relatedId,
  relatedTitle,
  isLoading = false,
}: ReportDialogProps) {
  const [reason, setReason] = useState<ReportReason | ''>('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!reason || !description) return;

    await onSubmit({
      reportType,
      relatedId,
      reason,
      description,
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Report {getReportTypeLabel()}
          </DialogTitle>
          <DialogDescription>
            Help us keep the community safe. Reports are anonymous and reviewed by our moderation
            team.
            {relatedTitle && (
              <span className="mt-1 block font-medium">&quot;{relatedTitle}&quot;</span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason for report</Label>
            <Select value={reason} onValueChange={(value) => setReason(value as ReportReason)}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_REASONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Additional details</Label>
            <Textarea
              id="description"
              placeholder="Please provide specific details about the violation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24 resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!reason || !description || isLoading}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
