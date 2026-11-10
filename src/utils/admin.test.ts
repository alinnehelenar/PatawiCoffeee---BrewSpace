import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeAdminMetrics,
  getStockStatus,
  getNextCourierState,
} from './admin';

test('determines correct stock status thresholds', () => {
  assert.equal(getStockStatus(24), 'in_stock');
  assert.equal(getStockStatus(5), 'low_stock');
  assert.equal(getStockStatus(3), 'low_stock');
  assert.equal(getStockStatus(0), 'out_of_stock');
  assert.equal(getStockStatus(-1), 'out_of_stock');
});

test('transitions courier dispatch progression accurately', () => {
  const step1 = getNextCourierState('idle');
  assert.equal(step1.nextStatus, 'searching');
  assert.equal(step1.step, 3);

  const step2 = getNextCourierState('searching');
  assert.equal(step2.nextStatus, 'assigned');
  assert.equal(step2.step, 4);

  const step3 = getNextCourierState('assigned');
  assert.equal(step3.nextStatus, 'on_the_way');
  assert.equal(step3.step, 5);
});

test('computes admin metrics with fallback defaults', () => {
  const metrics = computeAdminMetrics([{ total: 128000, orderStep: 1 }]);
  assert.equal(metrics.todaySales, 1250000);
  assert.equal(metrics.pendingQRIS, 1);
  assert.equal(metrics.readyToShip, 3);
});
