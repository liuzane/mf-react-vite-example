// 枚举
import { UserStatusEnum } from '@/enums';

// 类型
import type { UserStatusType, UserStatusMapConfig } from '@/models';

export const USER_STATUS_MAP: Record<UserStatusType, UserStatusMapConfig> = {
  [UserStatusEnum.Active]: { text: '启用', color: 'success' },
  [UserStatusEnum.Disabled]: { text: '禁用', color: 'default' },
};
