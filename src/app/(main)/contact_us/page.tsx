import { ContactUs } from '@/webcomponents/public';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | The Art of Reform',
  description: 'Get in touch with The Art of Reform.',
  keywords: [
    'The Art of Reform',
    'Reform',
    'Art',
    'Contact Us',
    'Prison Art',
    'Inmate Art',
    'Art Behind Bars',
    'Art for Social Change',
  ],
};

export default function ContactUsPage() {
  return <ContactUs />;
}
