import { BaseEntity, BaseInput } from "./base";

export interface Payment extends BaseEntity {
  member_id: string;
  membership_id: string;
  amount: number;
  method:
    | "credit_card"
    | "debit_card"
    | "paypal"
    | "bank_transfer"
    | "cash";
  paid_at: string;
}

export interface PaymentWithDetails {
  id: string;
  member_id: string;
  membership_id: string;
  amount: number;
  method:
    | "credit_card"
    | "debit_card"
    | "paypal"
    | "bank_transfer"
    | "cash";
  createdAt: string;
  updatedAt: string;
  paid_at: string;
  members: {
    id: string;
    full_name: string;
  };
  memberships: {
    id: string;
    plan_id: number;
    membership_plans: {
      id: number;
      name: string;
    };
  };
}

export type PaymentInput = BaseInput<Payment> & {
  member_id: string;
  membership_id: string;
  amount: number;
  method:
    | "credit_card"
    | "debit_card"
    | "paypal"
    | "bank_transfer"
    | "cash";
};
