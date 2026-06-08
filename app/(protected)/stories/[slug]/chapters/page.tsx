import { ContentLayout } from '@/components/dashboard';
import { ChaptersTableSection } from '@/components/stories/chapters';

export default function Chapters() {
  return (
    <ContentLayout centered={true} maxWidth="9xl">
      <ChaptersTableSection />
    </ContentLayout>
  );
}
