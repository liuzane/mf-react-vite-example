// 类型
import type { Role } from 'mockDB/data/roles';
import type { RoleStatusType } from 'shared/models';

export interface IRole extends Omit<Role, 'status'> {
  status: RoleStatusType;
  userCount: number;
}

export interface IRoleEditForm {
  name: string;
  code: string;
  status: RoleStatusType;
  description: string;
}
