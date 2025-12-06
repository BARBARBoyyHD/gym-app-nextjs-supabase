import { BaseEntity, BaseInput } from './base';

export interface Membership extends BaseEntity {
  memberId: string;
  membershipPlanId: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  autoRenew: boolean;
}

export type MembershipInput = BaseInput<Membership>;