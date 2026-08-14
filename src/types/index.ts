/* ============================================================
   AURUM domain types — mirror the Prisma schema (TRD §4.3)
   ============================================================ */

export type Availability = 'in-stock' | 'limited' | 'out-of-stock';

export interface ProductVariantOption {
  label: string;
  value: string;
  /** Optional hex swatch for color/material visualisation. */
  swatch?: string;
  available?: boolean;
}

export interface ProductVariantGroup {
  /** e.g. "Material", "Size", "Color" */
  name: string;
  type: 'swatch' | 'chip' | 'select';
  options: ProductVariantOption[];
}

export interface ProductDetailSection {
  title: string;
  body: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  /** Longer editorial narrative for the product page. */
  story?: string;
  price: number;
  images: string[];
  category: string; // maps to collection slug, e.g. "rings"
  material: string;
  color?: string;
  stoneType?: string;
  weightGrams?: number;
  stock: number;
  availability: Availability;
  isNew?: boolean;
  collections: string[];
  variants?: ProductVariantGroup[];
  details?: ProductDetailSection[];
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  count?: number;
}

export interface CartItem {
  id: string; // unique per product+variant combo
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  material?: string;
  variant?: Record<string, string>;
}

export interface WishlistEntry {
  productId: string;
  addedAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'dispatched'
  | 'delivered'
  | 'returned'
  | 'cancelled';

export interface OrderLineItem {
  productName: string;
  image: string;
  quantity: number;
  priceAtPurchase: number;
  variant?: Record<string, string>;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery?: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  trackingNumber?: string;
  shippingAddress: Address;
  lineItems: OrderLineItem[];
  notes?: string;
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  image: string;
  author: string;
  body?: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}
