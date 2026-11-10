export type SizeOption = '200g' | '500g' | '1kg';
export type GrindOption = 'Whole Beans' | 'Espresso' | 'Filter' | 'Coarse';
export type PriceTier = 'regular' | 'member';
export type DeliveryMethod = 'gosend' | 'grab' | 'pickup';

export interface ProductVariant {
  size: SizeOption;
  grind: GrindOption;
  tier: PriceTier;
  quantity: number;
}

export const BASE_PRICES: Record<SizeOption, { regular: number; member: number }> = {
  '200g': { regular: 60000, member: 55000 },
  '500g': { regular: 110000, member: 105000 },
  '1kg': { regular: 200000, member: 195000 },
};

export const DELIVERY_FEES: Record<DeliveryMethod, number> = {
  gosend: 18000,
  grab: 19000,
  pickup: 0,
};

export interface PricingProduct {
  regularPrice: number;
  memberPrice: number;
  sizePricing?: Partial<Record<SizeOption, { regular: number; member: number }>>;
}

/**
 * Returns dynamic price based on the product's official pricelist variant matrix.
 * Falls back cleanly to regularPrice / memberPrice or baseline estimates.
 */
export function getProductPrice(
  product: PricingProduct,
  size: SizeOption,
  tier: PriceTier
): number {
  if (product.sizePricing?.[size]?.[tier] !== undefined) {
    return product.sizePricing[size]![tier];
  }

  // Fallback if specific size is not customized
  if (size === '200g') {
    return tier === 'member' ? product.memberPrice : product.regularPrice;
  }
  if (size === '500g') {
    const base = tier === 'member' ? product.memberPrice : product.regularPrice;
    return Math.round((base * 2.1) / 5000) * 5000;
  }
  if (size === '1kg') {
    const base = tier === 'member' ? product.memberPrice : product.regularPrice;
    return Math.round((base * 3.8) / 5000) * 5000;
  }

  return BASE_PRICES[size][tier];
}

export function calculateProductSubtotal(
  product: PricingProduct,
  size: SizeOption,
  tier: PriceTier,
  quantity: number
): number {
  return getProductPrice(product, size, tier) * quantity;
}

export function calculateItemPrice(size: SizeOption, tier: PriceTier): number {
  return BASE_PRICES[size][tier];
}

export function calculateSubtotal(size: SizeOption, tier: PriceTier, quantity: number): number {
  return calculateItemPrice(size, tier) * quantity;
}

export function calculateTotal(subtotal: number, deliveryMethod: DeliveryMethod): number {
  return subtotal + DELIVERY_FEES[deliveryMethod];
}

export function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export type OrderStep = 1 | 2 | 3 | 4 | 5 | 6;

export const ORDER_STEPS = [
  { step: 1, label: 'Payment Pending', desc: 'Awaiting QRIS scan & verification' },
  { step: 2, label: 'Payment Verified', desc: 'Settlement confirmed by Bank Indonesia' },
  { step: 3, label: 'Processing', desc: 'Beans measured, ground & heat-sealed' },
  { step: 4, label: 'Courier Booked', desc: 'Driver assigned for pickup' },
  { step: 5, label: 'On the Way', desc: 'Out for instant delivery in Purwokerto' },
  { step: 6, label: 'Completed', desc: 'Delivered to customer' },
] as const;
