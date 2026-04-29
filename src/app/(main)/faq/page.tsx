import { FAQ } from '@/webcomponents/public';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | The Art of Reform',
  description: 'Frequently Asked Questions about The Art of Reform.',
  keywords: [
    'The Art of Reform',
    'Reform',
    'Art',
    'FAQ',
    'Prison Art',
    'Inmate Art',
    'Art Behind Bars',
    'Art for Social Change',
  ],
};

export default function FAQPage() {
  return <FAQ />;
}
