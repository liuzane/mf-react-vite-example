// 枚举
import { OrderStatusEnum } from '@/enums';

export type OrderStatusType = typeof OrderStatusEnum[keyof typeof OrderStatusEnum];

export interface OrderStatusMapConfig {
  text: string;
  color: 'warning' | 'processing' | 'success' | 'default' | 'error';
}
