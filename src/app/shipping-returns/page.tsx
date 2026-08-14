import { PolicyPage } from '@/components/common/PolicyPage';

export const metadata = { title: 'Shipping & Returns' };

export default function ShippingReturnsPage() {
  return (
    <PolicyPage
      title="Shipping & Returns"
      intro="Every AURUM order is delivered insured, in our signature case, with a certificate of authenticity."
      updated="July 2026"
      sections={[
        {
          heading: 'Delivery',
          paragraphs: [
            'Signature Delivery is complimentary on all orders and arrives within 5–7 business days, fully insured and requiring a signature on receipt.',
            'Private Courier is available for $65 and delivers within 2–3 business days, hand-carried where local service permits.',
          ],
        },
        {
          heading: 'Packaging',
          paragraphs: [
            'Each piece is presented in a lacquered case within discreet outer packaging. Gift orders may include a handwritten note at no charge — simply add your message at checkout.',
          ],
        },
        {
          heading: 'Returns',
          paragraphs: [
            'Unworn pieces may be returned within 30 days of delivery for exchange or full credit. Items must be returned in their original case with all documentation.',
            'Engraved pieces and bespoke commissions are made to order and are therefore final sale.',
            'To arrange a return, contact client care and we will provide an insured, prepaid shipping label.',
          ],
        },
        {
          heading: 'Servicing',
          paragraphs: [
            'Every AURUM piece is accompanied by complimentary lifetime cleaning and servicing at any of our ateliers. We recommend a service every two years for pieces worn daily.',
          ],
        },
      ]}
    />
  );
}
