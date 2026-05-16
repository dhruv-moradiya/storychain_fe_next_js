import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ISortSelectProps {
  value: string;
  onChange?: (value: string) => void;
}

export const SortSelect = ({ value, onChange }: ISortSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          'border-soft bg-background h-11 min-w-45 rounded-md border',
          'text-sm shadow-none'
        )}
      >
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="latest">Latest First</SelectItem>
        <SelectItem value="popular">Most Popular</SelectItem>
        <SelectItem value="oldest">Oldest First</SelectItem>
      </SelectContent>
    </Select>
  );
};
