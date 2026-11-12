import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateItemPrice,
  calculateSubtotal,
  calculateTotal,
  formatRupiah,
  getProductPrice,
  ORDER_STEPS,
} from './pricing';
import { PRODUCTS } from '../data/products';

test('calculates correct unit prices for baseline regular and member tiers', () => {
  assert.equal(calculateItemPrice('200g', 'regular'), 60000);
  assert.equal(calculateItemPrice('200g', 'member'), 55000);
  assert.equal(calculateItemPrice('500g', 'regular'), 110000);
  assert.equal(calculateItemPrice('1kg', 'member'), 195000);
});

test('calculates subtotal based on quantity', () => {
  assert.equal(calculateSubtotal('200g', 'regular', 2), 120000);
  assert.equal(calculateSubtotal('200g', 'member', 2), 110000);
  assert.equal(calculateSubtotal('1kg', 'regular', 3), 600000);
});

test('calculates total with delivery fee options', () => {
  // 2x 200g at Member tier (110.000) + GoSend flat (15.000) = 125.000
  assert.equal(calculateTotal(110000, 'gosend'), 125000);
  assert.equal(calculateTotal(110000, 'grab'), 125000);
  assert.equal(calculateTotal(110000, 'pickup'), 110000);
});

test('strictly enforces maximum 5 km delivery radius restriction', async () => {
  const { isWithinDeliveryRadius, calculateDeliveryFee, validateDeliveryOrder, MAX_DELIVERY_RADIUS_KM } =
    await import('./delivery');

  assert.equal(MAX_DELIVERY_RADIUS_KM, 5.0);

  // Within 5 km radius
  assert.equal(isWithinDeliveryRadius(0.5), true);
  assert.equal(isWithinDeliveryRadius(2.8), true);
  assert.equal(isWithinDeliveryRadius(5.0), true);

  // Exceeds 5 km radius
  assert.equal(isWithinDeliveryRadius(5.1), false);
  assert.equal(isWithinDeliveryRadius(7.5), false);
  assert.equal(isWithinDeliveryRadius(12.0), false);
  assert.equal(isWithinDeliveryRadius(-1), false);

  // Fee calculation
  assert.equal(calculateDeliveryFee(2.8), 15000);
  assert.equal(calculateDeliveryFee(5.0), 15000);
  assert.equal(calculateDeliveryFee(5.2), 0);

  // Order validation helper
  const validOrder = validateDeliveryOrder(2.8, 'gosend');
  assert.equal(validOrder.isEligible, true);
  assert.equal(validOrder.fee, 15000);

  const outOfRangeOrder = validateDeliveryOrder(6.4, 'gosend');
  assert.equal(outOfRangeOrder.isEligible, false);
  assert.equal(outOfRangeOrder.fee, 0);

  const pickupOrder = validateDeliveryOrder(10.0, 'pickup');
  assert.equal(pickupOrder.isEligible, true);
  assert.equal(pickupOrder.fee, 0);
});

test('formats Rupiah currency strictly with Indonesian locale dots', () => {
  assert.equal(formatRupiah(60000), 'Rp 60.000');
  assert.equal(formatRupiah(55000), 'Rp 55.000');
  assert.equal(formatRupiah(128000), 'Rp 128.000');
});

test('order steps has 6 complete sequential statuses', () => {
  assert.equal(ORDER_STEPS.length, 6);
  assert.equal(ORDER_STEPS[0].label, 'Payment Pending');
  assert.equal(ORDER_STEPS[5].label, 'Completed');
});

test('contains strictly only official products from January 2026 pricelist', () => {
  assert.equal(PRODUCTS.length, 14);
  const fijne55 = PRODUCTS.find((p) => p.id === 'fijne-dag-55');
  assert.ok(fijne55);
  const fijne25 = PRODUCTS.find((p) => p.id === 'fijne-dag-25-75');
  assert.ok(fijne25);
  const mazzel100 = PRODUCTS.find((p) => p.id === 'mazzel-dragger-100');
  assert.ok(mazzel100);
  const robusta = PRODUCTS.find((p) => p.id === 'fine-robusta-temanggung');
  assert.ok(robusta);

  // Assert dummy products are deleted
  const gayo = PRODUCTS.find((p) => p.id === 'aceh-gayo-pantan-musara');
  assert.equal(gayo, undefined);
  const toraja = PRODUCTS.find((p) => p.id === 'toraja-sapan-washed');
  assert.equal(toraja, undefined);
  const bali = PRODUCTS.find((p) => p.id === 'bali-kintamani');
  assert.equal(bali, undefined);
  const signature = PRODUCTS.find((p) => p.id === 'patawi-signature');
  assert.equal(signature, undefined);
});

test('official January 2026 pricing: Fijne Dag 25/75', () => {
  const p = PRODUCTS.find((it) => it.id === 'fijne-dag-25-75')!;
  assert.ok(p);
  assert.equal(getProductPrice(p, '200g', 'regular'), 45000);
  assert.equal(getProductPrice(p, '200g', 'member'), 40000);
  assert.equal(getProductPrice(p, '500g', 'regular'), 100000);
  assert.equal(getProductPrice(p, '500g', 'member'), 95000);
  assert.equal(getProductPrice(p, '1kg', 'regular'), 175000);
  assert.equal(getProductPrice(p, '1kg', 'member'), 170000);
});

test('official January 2026 pricing: Fijne Dag 55', () => {
  const p = PRODUCTS.find((it) => it.id === 'fijne-dag-55')!;
  assert.ok(p);
  assert.equal(getProductPrice(p, '200g', 'regular'), 60000);
  assert.equal(getProductPrice(p, '200g', 'member'), 55000);
  assert.equal(getProductPrice(p, '500g', 'regular'), 110000);
  assert.equal(getProductPrice(p, '500g', 'member'), 105000);
  assert.equal(getProductPrice(p, '1kg', 'regular'), 200000);
  assert.equal(getProductPrice(p, '1kg', 'member'), 195000);
});

test('official January 2026 pricing: Fijne Dag 100', () => {
  const p = PRODUCTS.find((it) => it.id === 'fijne-dag-100')!;
  assert.ok(p);
  assert.equal(getProductPrice(p, '200g', 'regular'), 90000);
  assert.equal(getProductPrice(p, '200g', 'member'), 85000);
  assert.equal(getProductPrice(p, '500g', 'regular'), 130000);
  assert.equal(getProductPrice(p, '500g', 'member'), 125000);
  assert.equal(getProductPrice(p, '1kg', 'regular'), 250000);
  assert.equal(getProductPrice(p, '1kg', 'member'), 240000);
});

test('official January 2026 pricing: Mazzel Dragger (1000g only)', () => {
  const m25 = PRODUCTS.find((it) => it.id === 'mazzel-dragger-25-75')!;
  assert.ok(m25);
  assert.equal(getProductPrice(m25, '1kg', 'regular'), 160000);
  assert.equal(getProductPrice(m25, '1kg', 'member'), 155000);

  const m46 = PRODUCTS.find((it) => it.id === 'mazzel-dragger-46')!;
  assert.ok(m46);
  assert.equal(getProductPrice(m46, '1kg', 'regular'), 170000);
  assert.equal(getProductPrice(m46, '1kg', 'member'), 165000);

  const m55 = PRODUCTS.find((it) => it.id === 'mazzel-dragger-55')!;
  assert.ok(m55);
  assert.equal(getProductPrice(m55, '1kg', 'regular'), 175000);
  assert.equal(getProductPrice(m55, '1kg', 'member'), 170000);

  const m64 = PRODUCTS.find((it) => it.id === 'mazzel-dragger-64')!;
  assert.ok(m64);
  assert.equal(getProductPrice(m64, '1kg', 'regular'), 185000);
  assert.equal(getProductPrice(m64, '1kg', 'member'), 180000);

  const m73 = PRODUCTS.find((it) => it.id === 'mazzel-dragger-73')!;
  assert.ok(m73);
  assert.equal(getProductPrice(m73, '1kg', 'regular'), 190000);
  assert.equal(getProductPrice(m73, '1kg', 'member'), 185000);

  const m100 = PRODUCTS.find((it) => it.id === 'mazzel-dragger-100')!;
  assert.ok(m100);
  assert.equal(getProductPrice(m100, '1kg', 'regular'), 225000);
  assert.equal(getProductPrice(m100, '1kg', 'member'), 215000);
});

test('official January 2026 pricing: Robusta Series', () => {
  const fine = PRODUCTS.find((it) => it.id === 'fine-robusta-temanggung')!;
  assert.ok(fine);
  assert.equal(getProductPrice(fine, '200g', 'regular'), 55000);
  assert.equal(getProductPrice(fine, '200g', 'member'), 50000);
  assert.equal(getProductPrice(fine, '500g', 'regular'), 85000);
  assert.equal(getProductPrice(fine, '500g', 'member'), 80000);
  assert.equal(getProductPrice(fine, '1kg', 'regular'), 160000);
  assert.equal(getProductPrice(fine, '1kg', 'member'), 155000);

  const komersial = PRODUCTS.find((it) => it.id === 'komersial-robusta')!;
  assert.ok(komersial);
  assert.equal(getProductPrice(komersial, '200g', 'regular'), 45000);
  assert.equal(getProductPrice(komersial, '200g', 'member'), 40000);
  assert.equal(getProductPrice(komersial, '500g', 'regular'), 80000);
  assert.equal(getProductPrice(komersial, '500g', 'member'), 75000);
  assert.equal(getProductPrice(komersial, '1kg', 'regular'), 145000);
  assert.equal(getProductPrice(komersial, '1kg', 'member'), 140000);
});
