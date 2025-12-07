import { BaseEntity, BaseInput } from './base';

export interface MembershipPlan extends BaseEntity {
  name: string;
  description: string;
  price: number;
  duration_day: number; // in days
}

export type MembershipPlanInput = BaseInput<MembershipPlan> & {
  name: string;
  description?: string;
  price: number;
  duration_day: number;
};