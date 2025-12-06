export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BaseInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;