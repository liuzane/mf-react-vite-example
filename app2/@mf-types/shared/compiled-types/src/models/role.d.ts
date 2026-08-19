import { RoleStatusEnum } from '@/enums';
export type RoleStatusType = typeof RoleStatusEnum[keyof typeof RoleStatusEnum];
export interface RoleStatusMapConfig {
    text: string;
    color: 'success' | 'default' | 'error' | 'warning' | 'processing';
}
