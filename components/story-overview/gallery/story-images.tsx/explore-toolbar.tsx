import { Actions } from './actions';
import { Filters } from './filters';

const filters = [
  { label: 'All', count: 32, value: 'all' },
  { label: 'Locations', count: 12, value: 'locations' },
  { label: 'Characters', count: 8, value: 'characters' },
  { label: 'Objects', count: 6, value: 'objects' },
  { label: 'Events', count: 6, value: 'events' },
];

interface IExploreToolbarProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

export const ExploreToolbar = ({
  view,
  onViewChange,
  filter,
  onFilterChange,
}: IExploreToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <Filters items={filters} activeFilter={filter} onChange={onFilterChange} />

      <Actions view={view} sort="latest" onViewChange={onViewChange} />
    </div>
  );
};
