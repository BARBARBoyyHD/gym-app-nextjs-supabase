export interface BaseEntity {
  id: string;
  createdAt: Date;
}

export type BaseInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;