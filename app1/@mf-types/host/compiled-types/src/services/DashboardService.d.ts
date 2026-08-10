import type { Result } from 'mockDB/types';
declare const BaseService: typeof import("mockDB/services/BaseService").default;
export default class DashboardService extends BaseService {
    private orderMapper;
    private productMapper;
    private userMapper;
    private roleMapper;
    private initPromise?;
    private isReady;
    constructor();
    /**
     * 等待初始化任务完成
     */
    private ready;
    initData(): Promise<void>;
    /**
     * 获取订单统计信息
     * @returns 订单统计信息
     */
    queryOrderStatistics(): Promise<Result<Record<string, number>>>;
    /**
     * 获取商品统计信息
     * @returns 商品统计信息
     */
    queryProductStatistics(): Promise<Result<Record<string, number>>>;
    /**
     * 获取用户统计信息
     * @returns 用户统计信息
     */
    queryUserStatistics(): Promise<Result<Record<string, number>>>;
    /**
     * 获取角色统计信息
     * @returns 角色统计信息
     */
    queryRoleStatistics(): Promise<Result<Record<string, number>>>;
}
export {};
