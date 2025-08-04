export type Currency = 'ARG' | 'USD' | 'EUR' | 'MEX';

export interface PaymentMethod {
  name: string;
  icon: string;
}

export interface Price {
  currency: Currency;
  amount: number;
  paymentMethods: PaymentMethod[];
}

export interface Service {
  id: string;
  title: string;
  features: string[];
  prices: Price[];
  image: string;
  description: string;
}
