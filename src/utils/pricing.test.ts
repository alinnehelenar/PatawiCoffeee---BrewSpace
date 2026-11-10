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
  // 2x 200g at Member tier (110.000) + GoSend (18.000) = 128.000
  assert.equal(calculateTotal(110000, 'gosend'), 128000);
  assert.equal(calculateTotal(110000, 'grab'), 129000);
  assert.equal(calculateTotal(110000, 'pickup'), 110000);
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

test('contains exactly 14 official products without dummy items', () => {
  assert.equal(PRODUCTS.length, 14);
  const dummyFound = PRODUCTS.some(p => p.name.includes('Gayo') || p.name.includes('Toraja') || p.name.includes('Flores'));
  assert.equal(dummyFound, false);
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
