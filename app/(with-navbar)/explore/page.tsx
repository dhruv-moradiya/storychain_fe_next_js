import { AuthorsSection } from '@/components/explore/authors-section';
import { CommunityPicksSection } from '@/components/explore/community-picks-section';
import { CompletedStoriesSection } from '@/components/explore/completed-stories-section';
import { ExperimentalSection } from '@/components/explore/experimental-section';
import { ExploreFilters } from '@/components/explore/explore-filters';
import { FeaturedCollectionsSection } from '@/components/explore/featured-collections-section';
import { GenresSection } from '@/components/explore/genres-section';
import { MostBranchedSection } from '@/components/explore/most-branched-section';
import { NewReleasesSection } from '@/components/explore/new-releases-section';
import { PersonalizedSection } from '@/components/explore/personalized-section';
import { RecentlyUpdatedSection } from '@/components/explore/recently-updated-section';
import { TagsSection } from '@/components/explore/tags-section';
import { TrendingSection } from '@/components/explore/trending-section';

export default function ExplorePage() {
  // In a real implementation, you would check auth state here
  const isAuthenticated = false; // Toggle this to true to see personalized recommendations

  return (
    <div className="container mx-auto max-w-7xl px-4 pt-6 pb-20 sm:px-6 lg:px-8">
      {/* Top Navigation / Filter Bar */}
      <ExploreFilters />

      {/* Main Content Sections */}
      <div className="mt-8 space-y-16">
        {/* Section 1 — Hero / Featured Stories */}
        <TrendingSection />

        {/* Section 2 — New Releases */}
        <NewReleasesSection />

        {/* Section 3 — Most Branched Stories */}
        <MostBranchedSection />

        {/* Section 4 — Community Picks */}
        <CommunityPicksSection />

        {/* Section 5 — By Genre */}
        <GenresSection />

        {/* Section 6 — Recently Updated */}
        <RecentlyUpdatedSection />

        {/* Section 7 — Hall of Fame / Completed Stories */}
        <CompletedStoriesSection />

        {/* Section 8 — Authors to Follow */}
        <AuthorsSection />

        {/* Section 9 — Based on Your Reading (Personalized) */}
        <PersonalizedSection isAuthenticated={isAuthenticated} />

        {/* Section 10 — Best Challenges (UGC / Experimental) */}
        <ExperimentalSection />

        {/* Section 11 — Highlighted / Promoted (Optional) */}
        <FeaturedCollectionsSection />

        {/* Section 12 — Browse by Tags */}
        <TagsSection />
      </div>
    </div>
  );
}
