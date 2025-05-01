export const CardBrandsEnum = {
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD',
  ELO: 'ELO',
  DINERS: 'DINERS',
  DISCOVER: 'DISCOVER',
  AMEX: 'AMEX',
  HIPERCARD: 'HIPERCARD',
  CABAL: 'CABAL',
  BANESCARD: 'BANESCARD',
  CREDZ: 'CREDZ',
  SOROCRED: 'SOROCRED',
  CREDSYSTEM: 'CREDSYSTEM',
  JCB: 'JCB',
  UNKNOWN: 'UNKNOWN',
} as const;
export type CardBrandsType = keyof typeof CardBrandsEnum;
