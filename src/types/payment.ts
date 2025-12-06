import { BaseEntity, BaseInput } from './base';

export interface Payment extends BaseEntity {
  memberId: string;
  membershipPlanId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash';
}

export type PaymentInput = BaseInput<Payment> & {
  currency?: string;
};