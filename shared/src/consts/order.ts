// 枚举
import { OrderStatusEnum } from '@/enums';

// 类型
import type { OrderStatusType, OrderStatusMapConfig } from '@/models';

// 订单状态映射
export const ORDER_STATUS_MAP: Record<OrderStatusType, OrderStatusMapConfig> = {
  [OrderStatusEnum.Pending]: { text: '待支付', color: 'warning' },
  [OrderStatusEnum.Paid]: { text: '已支付', color: 'processing' },
  [OrderStatusEnum.Shipped]: { text: '已发货', color: 'success' },
  [OrderStatusEnum.Cancelled]: { text: '已取消', color: 'error' },
  [OrderStatusEnum.Completed]: { text: '已完成', color: 'default' },
};
