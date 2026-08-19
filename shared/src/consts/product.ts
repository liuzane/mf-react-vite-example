// 枚举
import { ProductStatusEnum } from '@/enums';

// 类型
import type { ProductStatusType, ProductStatusMapConfig } from '@/models';

// 商品状态映射
export const PRODUCT_STATUS_MAP: Record<ProductStatusType, ProductStatusMapConfig> = {
  [ProductStatusEnum.OnSale]: { text: '上架', color: 'success' },
  [ProductStatusEnum.OffSale]: { text: '下架', color: 'default' },
  [ProductStatusEnum.OutOfStock]: { text: '缺货', color: 'error' },
  [ProductStatusEnum.LowStock]: { text: '库存紧张', color: 'warning' },
};
