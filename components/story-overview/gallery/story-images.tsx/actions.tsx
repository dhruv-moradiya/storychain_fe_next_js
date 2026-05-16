import { SortSelect } from './sort-selecte';
import { ViewToggle } from './view-toggle';

interface IActionsProps {
  view: 'grid' | 'list';
  sort: string;
  onViewChange?: (view: 'grid' | 'list') => void;
  onSortChange?: (value: string) => void;
}

export const Actions = ({ view, sort, onViewChange, onSortChange }: IActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      <ViewToggle view={view} onChange={onViewChange} />

      <SortSelect value={sort} onChange={onSortChange} />
    </div>
  );
};
