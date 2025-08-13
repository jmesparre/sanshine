import { Timestamp } from 'firebase/firestore';


export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  serviceName: string;
  serviceId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: Timestamp;
  paymentMethod: 'mercadopago' | 'paypal' | 'transfer';
}

export interface Prices {
  [key: string]: number;
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface BulletPoint {
  text: string;
  icon: string;
}

export interface LeftColumn {
  title: string;
  prices: Prices;
  bulletPoints: BulletPoint[];
}

export interface RightColumn {
  image: string;
  text: string;
  accordion: AccordionItem[];
}

export interface Service {
  id: string;
  isActive: boolean;
  order: number;
  leftColumn: LeftColumn;
  rightColumn: RightColumn;
}
