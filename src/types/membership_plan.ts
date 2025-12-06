import { BaseEntity, BaseInput } from './base';

export interface MembershipPlan extends BaseEntity {
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number; // in days
  features: string[];
  maxCheckInsPerWeek?: number;
  isActive: boolean;
}

export type MembershipPlanInput = BaseInput<MembershipPlan> & {
  currency?: string;
};