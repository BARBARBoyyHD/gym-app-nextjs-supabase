import { BaseEntity, BaseInput } from './base';

export interface Course extends BaseEntity {
  title: string;
  description: string;
  instructor: string;
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price: number;
  thumbnailUrl?: string;
  videoUrl?: string;
}

export type CourseInput = BaseInput<Course>;