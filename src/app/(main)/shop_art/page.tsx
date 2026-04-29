import { ShopArt } from '@/webcomponents/public';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Art | The Art of Reform',
  description: 'Shop art at The Art of Reform.',
  keywords: [
    'The Art of Reform',
    'Reform',
    'Art',
    'Shop Art',
    'Prison Art',
    'Inmate Art',
    'Art Behind Bars',
    'Art for Social Change',
  ],
};

export default function ShopArtPage() {
  return <ShopArt />;
}
