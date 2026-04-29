import { SearchArtists } from '@/webcomponents/public';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artists | The Art of Reform',
  description: 'Discover talented artists at The Art of Reform.',
  keywords: [
    'The Art of Reform',
    'Reform',
    'Art',
    'Artists',
    'Prison Art',
    'Inmate Art',
    'Art Behind Bars',
    'Art for Social Change',
  ],
};

export default function SearchArtistsPage() {
  return <SearchArtists />;
}
