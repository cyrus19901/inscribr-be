export enum OrderStatus {
  AWAITING_FUNDING = 'awaiting-funding',
  AWAITING_PARENT = 'awaiting-parent',
  AWAITING_ORDINALS = 'awaiting-ordinal',
  BROADCASTING = 'broadcasting',
  AWAITING_CONFIRMATION = 'awaiting-confirmation',
  CONFIRMED = 'confirmed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}
