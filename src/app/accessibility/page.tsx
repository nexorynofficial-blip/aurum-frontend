import { PolicyPage } from '@/components/common/PolicyPage';

export const metadata = { title: 'Accessibility' };

export default function AccessibilityPage() {
  return (
    <PolicyPage
      title="Accessibility"
      intro="We want every client to experience AURUM with ease, whatever the means of access."
      updated="July 2026"
      sections={[
        {
          heading: 'Our commitment',
          paragraphs: [
            'This website is designed to meet WCAG 2.1 AA standards. We build with semantic HTML, maintain colour contrast of at least 4.5:1 for text, provide visible focus indicators, and support full keyboard navigation throughout.',
          ],
        },
        {
          heading: 'Motion & preferences',
          paragraphs: [
            'Animations are subtle by design and honour the system “reduced motion” setting. Text scales with your browser and device settings without loss of content or function.',
          ],
        },
        {
          heading: 'Assistance',
          paragraphs: [
            'If you encounter any barrier, or would prefer to place an order with the help of an advisor, please contact client care. We are glad to assist by telephone or email.',
          ],
        },
      ]}
    />
  );
}
