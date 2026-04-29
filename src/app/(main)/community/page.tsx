import { Community } from '@/webcomponents/public';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | The Art of Reform',
  description: 'Join the community at The Art of Reform.',
  keywords: [
    'The Art of Reform',
    'Reform',
    'Art',
    'Community',
    'Prison Art',
    'Inmate Art',
    'Art Behind Bars',
    'Art for Social Change',
  ],
};

export default function CommunityPage() {
  return <Community />;
}
