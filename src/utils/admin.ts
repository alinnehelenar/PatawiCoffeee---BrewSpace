import { OrderStep } from './pricing';

export interface AdminMetrics {
  todaySales: number;
  pendingQRIS: number;
  readyToShip: number;
}

export type CourierStatus = 'idle' | 'searching' | 'assigned' | 'on_the_way';

export interface CourierAssignment {
  driverName: string;
  provider: 'GoSend' | 'GrabExpress';
  licensePlate: string;
  etaMinutes: number;
}

export function computeAdminMetrics(orders: { total: number; orderStep: OrderStep }[]): AdminMetrics {
  const baseSales = 1250000;
  const pendingCount = orders.filter((o) => o.orderStep === 1).length;
  const readyCount = orders.filter((o) => o.orderStep === 2 || o.orderStep === 3).length;

  return {
    todaySales: baseSales,
    pendingQRIS: pendingCount > 0 ? pendingCount : 1,
    readyToShip: readyCount > 0 ? readyCount + 2 : 3,
  };
}

export function getStockStatus(stock: number): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (stock <= 0) return 'out_of_stock';
  if (stock <= 5) return 'low_stock';
  return 'in_stock';
}

export function getNextCourierState(current: CourierStatus): { nextStatus: CourierStatus; step: OrderStep } {
  switch (current) {
    case 'idle':
      return { nextStatus: 'searching', step: 3 };
    case 'searching':
      return { nextStatus: 'assigned', step: 4 };
    case 'assigned':
      return { nextStatus: 'on_the_way', step: 5 };
    case 'on_the_way':
      return { nextStatus: 'on_the_way', step: 5 };
  }
}
