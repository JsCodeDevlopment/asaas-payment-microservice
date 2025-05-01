export const BillingTypeEnum = {
  UNDEFINED: 'UNDEFINED',
  BOLETO: 'BOLETO',
  CREDIT_CARD: 'CREDIT_CARD',
  PIX: 'PIX',
} as const;
export type BillingType = keyof typeof BillingTypeEnum;
