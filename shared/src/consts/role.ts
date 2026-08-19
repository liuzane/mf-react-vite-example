// 枚举
import { RoleStatusEnum } from '@/enums';

// 类型
import type { RoleStatusType, RoleStatusMapConfig } from '@/models';

export const ROLE_STATUS_MAP: Record<RoleStatusType, RoleStatusMapConfig> = {
  [RoleStatusEnum.Active]: { text: '启用', color: 'success' },
  [RoleStatusEnum.Inactive]: { text: '停用', color: 'default' },
};
