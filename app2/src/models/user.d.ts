// 类型
import type { User } from 'mockDB/data/users';
import type { UserStatusType } from 'shared/models';

export interface IUser extends Omit<User, 'status'> {
  status: UserStatusType;
}

export interface IUserEditForm {
  name: string;
  email: string;
  phone: string;
  status: UserStatusType;
  roleName: string;
}
