import { UserStatusEnum } from '@/enums';
export type UserStatusType = typeof UserStatusEnum[keyof typeof UserStatusEnum];
export interface UserStatusMapConfig {
    text: string;
    color: 'success' | 'default' | 'error' | 'warning' | 'processing';
}
