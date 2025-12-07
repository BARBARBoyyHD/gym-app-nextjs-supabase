import { BaseEntity, BaseInput } from './base';

export interface Membership extends BaseEntity {
  member_id: string;
  plan_id: string;
  start_date: Date;
  end_date: Date;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  auto_renew: boolean;
}

export type MembershipInput = BaseInput<Membership>;