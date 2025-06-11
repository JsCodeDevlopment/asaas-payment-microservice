export interface BasePaymentValidation {
  customer?: string;
  value?: number;
  totalValue?: number;
  dueDate?: string;
}

export interface CreditCardValidation extends BasePaymentValidation {
  creditCardHolderInfo?: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    phone: string;
  };
  encryptedCreditCard?: {
    encryptedData: string;
  };
  remoteIp?: string;
}
