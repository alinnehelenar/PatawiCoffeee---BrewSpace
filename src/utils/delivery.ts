/**
 * Independent Delivery Order (DO) System
 * Strict 5 km radius enforcement and logistics validation
 */

export const MAX_DELIVERY_RADIUS_KM = 5.0;
export const DEFAULT_DELIVERY_DISTANCE_KM = 2.8;

export interface DeliveryValidationResult {
  isEligible: boolean;
  distanceKm: number;
  maxRadiusKm: number;
  fee: number;
  message: string;
}

/**
 * Validates whether an address falls strictly within the 5 km independent delivery boundary
 */
export function isWithinDeliveryRadius(
  distanceKm: number,
  maxRadiusKm: number = MAX_DELIVERY_RADIUS_KM
): boolean {
  if (typeof distanceKm !== 'number' || isNaN(distanceKm) || distanceKm < 0) {
    return false;
  }
  return distanceKm <= maxRadiusKm;
}

/**
 * Calculates delivery fee for independent courier dispatch (Flat Rp 15.000 for <= 5 km)
 */
export function calculateDeliveryFee(distanceKm: number): number {
  if (!isWithinDeliveryRadius(distanceKm)) {
    return 0; // Ineligible for delivery
  }
  return 15000;
}

/**
 * Full delivery validation helper for checkout and courier dispatch systems
 */
export function validateDeliveryOrder(
  distanceKm: number,
  deliveryMethod: 'gosend' | 'grab' | 'pickup'
): DeliveryValidationResult {
  if (deliveryMethod === 'pickup') {
    return {
      isEligible: true,
      distanceKm: 0,
      maxRadiusKm: MAX_DELIVERY_RADIUS_KM,
      fee: 0,
      message: 'Ambil di Toko: Bebas biaya antar dan tanpa batasan jarak.',
    };
  }

  const eligible = isWithinDeliveryRadius(distanceKm);
  return {
    isEligible: eligible,
    distanceKm,
    maxRadiusKm: MAX_DELIVERY_RADIUS_KM,
    fee: eligible ? calculateDeliveryFee(distanceKm) : 0,
    message: eligible
      ? `Jarak ${distanceKm} km memenuhi syarat radius maksimal ${MAX_DELIVERY_RADIUS_KM} km.`
      : `Alamat berada ${distanceKm} km dari outlet (Melebihi batas maksimal radius ${MAX_DELIVERY_RADIUS_KM} km). Silakan pilih opsi Ambil di Toko.`,
  };
}
