import { PolicyPage } from '@/components/common/PolicyPage';

export const metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of Service"
      intro="The terms on which we offer our pieces and this website."
      updated="July 2026"
      sections={[
        {
          heading: 'Use of the site',
          paragraphs: [
            'By accessing this website you agree to use it lawfully and not to interfere with its operation or security. All content, imagery, and design remain the intellectual property of the house.',
          ],
        },
        {
          heading: 'Orders & pricing',
          paragraphs: [
            'All orders are subject to acceptance and availability. Prices are shown in US dollars and may be revised without notice; the price applied is that confirmed at the time of order.',
            'We reserve the right to decline or cancel any order, including where a pricing or description error has occurred, with a full refund where payment has been taken.',
          ],
        },
        {
          heading: 'Authenticity',
          paragraphs: [
            'Every piece is accompanied by a certificate of authenticity. Materials and stone characteristics are described in good faith; natural stones vary and minor variation is inherent to hand craftsmanship.',
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'To the fullest extent permitted by law, our liability is limited to the value of the piece purchased. Nothing in these terms excludes liability that cannot lawfully be excluded.',
          ],
        },
      ]}
    />
  );
}
