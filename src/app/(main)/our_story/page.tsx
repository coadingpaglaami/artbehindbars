import { OurStory } from '@/webcomponents/public';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | The Art of Reform',
  description: 'Learn about The Art of Reform and our mission.',
  keywords: [
    'The Art of Reform',
    'Reform',
    'Art',
    'Prison Art',
    'Inmate Art',
    'Art Behind Bars',
    'Art for Social Change',
    'Our Story',
  ],
};

export default function OurStoryPage() {
  return <OurStory />;
}
