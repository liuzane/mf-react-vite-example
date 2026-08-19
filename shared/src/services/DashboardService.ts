// 类型
import type { Result } from 'mockDB/types';
import type { DatabaseMapper } from 'mockDB/mapper';
import type { Order } from 'mockDB/data/orders';
import type { Product } from 'mockDB/data/products';
import type { User } from 'mockDB/data/users';
import type { Role } from 'mockDB/data/roles';

// 数据库名称
import { DATABASE_NAME } from '@/consts';

// 枚举
import {
  OrderStatusEnum,
  ProductStatusEnum,
  UserStatusEnum,
  RoleStatusEnum,
} from '@/enums';

// 远程模块
const [
  {
    ORDER_STORE_NAME,
    PRODUCT_STORE_NAME,
    USER_STORE_NAME,
    ROLE_STORE_NAME,
  },
  { DatabaseMapper: Mapper }, // 数据库映射器
  { default: BaseService }, // 基础类服务
] = await Promise.all([
  import('mockDB/store-names'),
  import('mockDB/mapper'),
  import('mockDB/services/base-service'),
]);

export default class DashboardService extends BaseService {
  private orderMapper: DatabaseMapper<Order>;
  private productMapper: DatabaseMapper<Product>;
  private userMapper: DatabaseMapper<User>;
  private roleMapper: DatabaseMapper<Role>;
  private initPromise?: Promise<void>;
  private isReady: boolean;

  constructor() {
    super();
    this.orderMapper = new Mapper<Order>(DATABASE_NAME, ORDER_STORE_NAME);
    this.productMapper = new Mapper<Product>(DATABASE_NAME, PRODUCT_STORE_NAME);
    this.userMapper = new Mapper<User>(DATABASE_NAME, USER_STORE_NAME);
    this.roleMapper = new Mapper<Role>(DATABASE_NAME, ROLE_STORE_NAME);
    this.isReady = false;
  }

  /**
   * 等待初始化任务完成
   */
  private async ready(): Promise<void> {
    // 已初始化
    if (this.isReady) {
      return;
    }

    // 正在初始化，等待初始化完成
    if (this.initPromise) {
      return this.initPromise;
    }

    // 创建唯一初始化任务
    this.initPromise = this.initData();

    try {
      await this.initPromise;
      this.isReady = true;
    } finally {
      // 初始化结束（成功或失败）都清除锁
      this.initPromise = undefined;
    }
  }

  async initData(): Promise<void> {
    // 并行获取四个表的记录数
    const countResults: PromiseSettledResult<number>[] = await Promise.allSettled([
      this.orderMapper.count(),
      this.productMapper.count(),
      this.userMapper.count(),
      this.roleMapper.count(),
    ]);

    // 提取计数
    const [orderCount, productCount, userCount, roleCount] = countResults.map((result: PromiseSettledResult<number>) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error('获取表记录数失败:', result.reason);
        return -1;
      }
    });

    // 根据计数决定需要初始化的表，每个表封装为一个异步任务
    const initTasks: Promise<void>[] = [];

    if (orderCount === 0) {
      initTasks.push((async () => {
        console.log('订单表为空，开始初始化...');
        const { default: orders } = await import('mockDB/data/orders');
        await this.orderMapper.insertBatch(orders);
      })());
    }

    if (productCount === 0) {
      initTasks.push((async () => {
        console.log('商品表为空，开始初始化...');
        const { default: products } = await import('mockDB/data/products');
        await this.productMapper.insertBatch(products);
      })());
    }

    if (userCount === 0) {
      initTasks.push((async () => {
        console.log('用户表为空，开始初始化...');
        const { default: users } = await import('mockDB/data/users');
        await this.userMapper.insertBatch(users);
      })());
    }

    if (roleCount === 0) {
      initTasks.push((async () => {
        console.log('角色表为空，开始初始化...');
        const { default: roles } = await import('mockDB/data/roles');
        await this.roleMapper.insertBatch(roles);
      })());
    }

    // 并行执行所有初始化任务（使用 allSettled 避免某个失败影响其他）
    if (initTasks.length > 0) {
      await Promise.allSettled(initTasks);
    }
  }

  /**
   * 获取订单统计信息
   * @returns 订单统计信息
   */
  async queryOrderStatistics(): Promise<Result<Record<string, number>>> {
    await this.ready();
    const allOrders: Order[] = await this.orderMapper.selectAll();
    return this.success({
      total: allOrders.length,
      pending: allOrders.filter((item: Order) => item.status === OrderStatusEnum.Pending).length,
      paid: allOrders.filter((item: Order) => item.status === OrderStatusEnum.Paid).length,
      shipped: allOrders.filter((item: Order) => item.status === OrderStatusEnum.Shipped).length,
      completed: allOrders.filter((item: Order) => item.status === OrderStatusEnum.Completed).length,
      cancelled: allOrders.filter((item: Order) => item.status === OrderStatusEnum.Cancelled).length,
    });
  }

  /**
   * 获取商品统计信息
   * @returns 商品统计信息
   */
  async queryProductStatistics(): Promise<Result<Record<string, number>>> {
    await this.ready();
    const allProducts: Product[] = await this.productMapper.selectAll();
    return this.success({
      total: allProducts.length,
      onSale: allProducts.filter((item: Product) => item.status === ProductStatusEnum.OnSale).length,
      offSale: allProducts.filter((item: Product) => item.status === ProductStatusEnum.OffSale).length,
      outOfStock: allProducts.filter((item: Product) => item.status === ProductStatusEnum.OutOfStock).length,
      lowStock: allProducts.filter((item: Product) => item.stock > 0 && item.stock < 10).length,
    });
  }

  /**
   * 获取用户统计信息
   * @returns 用户统计信息
   */
  async queryUserStatistics(): Promise<Result<Record<string, number>>> {
    await this.ready();
    const allUsers: User[] = await this.userMapper.selectAll();
    return this.success({
      total: allUsers.length,
      active: allUsers.filter((item: User) => item.status === UserStatusEnum.Active).length,
      disabled: allUsers.filter((item: User) => item.status === UserStatusEnum.Disabled).length,
    });
  }

  /**
   * 获取角色统计信息
   * @returns 角色统计信息
   */
  async queryRoleStatistics(): Promise<Result<Record<string, number>>> {
    await this.ready();
    const allRoles: Role[] = await this.roleMapper.selectAll();
    return this.success({
      total: allRoles.length,
      active: allRoles.filter((item: Role) => item.status === RoleStatusEnum.Active).length,
      inactive: allRoles.filter((item: Role) => item.status === RoleStatusEnum.Inactive).length,
    });
  }
}
