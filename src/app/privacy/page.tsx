import { PolicyPage } from '@/components/common/PolicyPage';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="We collect only what we need to serve you well, and we never sell your data."
      updated="July 2026"
      sections={[
        {
          heading: 'What we collect',
          paragraphs: [
            'We collect the information you provide when creating an account or placing an order — name, contact details, shipping and billing addresses — and technical data such as device and usage information gathered through cookies.',
          ],
        },
        {
          heading: 'How we use it',
          paragraphs: [
            'Your information is used to process orders, provide client care, and — only with your consent — to share news of new arrivals and events. Payment details are handled entirely by our PCI-compliant payment processor and are never stored on our servers.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'You may access, correct, or request deletion of your personal data at any time by contacting client care. You may unsubscribe from marketing communications through any email we send, or from your account settings.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use essential cookies to operate the site and, with your consent, analytics cookies to understand and improve the experience. You can manage preferences through your browser at any time.',
          ],
        },
      ]}
    />
  );
}
