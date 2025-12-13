import { BaseEntity, BaseInput } from "./base";

export interface Course extends BaseEntity {
  title: string;
  description: string;
  category: string;
  created_at: string;
  video_embed_url: string;
}

export type CourseInput = BaseInput<Course>;
