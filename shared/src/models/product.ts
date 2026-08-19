// 枚举
import { ProductStatusEnum } from '@/enums';

export type ProductStatusType = typeof ProductStatusEnum[keyof typeof ProductStatusEnum];

export interface ProductStatusMapConfig {
  text: string;
  color: 'success' | 'default' | 'error' | 'warning';
}
