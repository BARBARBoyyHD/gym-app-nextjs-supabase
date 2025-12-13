import { BaseEntity } from './base';

export interface Membership extends BaseEntity {
  member_id: string;
  plan_id: number;
  start_date: Date;
  end_date: Date;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
}

// Input version with string dates for form handling
export interface MembershipInput {
  member_id: string;
  plan_id: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
}