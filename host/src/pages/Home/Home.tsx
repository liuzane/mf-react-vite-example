// 基础模块
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';

// 类型
import type { NavigateFunction } from 'react-router-dom';
import type { RootState, AppDispatch } from 'shared/store';

// 模块联邦远程模块
const [
  {
    ORDER_STATUS_MAP,
    PRODUCT_STATUS_MAP,
    USER_STATUS_MAP,
    ROLE_STATUS_MAP,
  },
  {
    AppNameEnum,
    OrderStatusEnum,
    ProductStatusEnum,
    UserStatusEnum,
    RoleStatusEnum,
  },
  {
    queryOrderStatistics,
    queryProductStatistics,
    queryUserStatistics,
    queryRoleStatistics,
  },
] = await Promise.all([
  import('shared/consts'),
  import('shared/enums'),
  import('shared/store/slices/dashboardSlice'),
]);

export default function Home() {
  // 导航函数
  const navigate: NavigateFunction = useNavigate();

  // 全局状态管理
  const orderStatistics: Record<string, number> = useSelector((state: RootState) => state.dashboardSlice.order);
  const productStatistics: Record<string, number> = useSelector((state: RootState) => state.dashboardSlice.product);
  const userStatistics: Record<string, number> = useSelector((state: RootState) => state.dashboardSlice.user);
  const roleStatistics: Record<string, number> = useSelector((state: RootState) => state.dashboardSlice.role);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(queryOrderStatistics());
    dispatch(queryProductStatistics());
    dispatch(queryUserStatistics());
    dispatch(queryRoleStatistics());
  }, []);

  return (
    <Card variant="outlined" className="min-h-full">
      {/* 订单统计 */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">订单统计</h2>

        <div className="mb-4 grid grid-cols-6 gap-4 text-center">
          <Card>
            <div className="text-sm text-[#666]">总订单</div>
            <div className="text-2xl">
              <span
                className="text-primary cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/order`)}
              >
                {orderStatistics.total}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{ORDER_STATUS_MAP[OrderStatusEnum.Pending].text}</div>
            <div className="text-2xl">
              <span
                className="text-warning cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/order?status=${OrderStatusEnum.Pending}`)}
              >
                {orderStatistics.pending}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{ORDER_STATUS_MAP[OrderStatusEnum.Paid].text}</div>
            <div className="text-2xl">
              <span
                className="text-primary cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/order?status=${OrderStatusEnum.Paid}`)}
              >
                {orderStatistics.paid}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{ORDER_STATUS_MAP[OrderStatusEnum.Shipped].text}</div>
            <div className="text-2xl">
              <span
                className="text-success cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/order?status=${OrderStatusEnum.Shipped}`)}
              >
                {orderStatistics.shipped}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{ORDER_STATUS_MAP[OrderStatusEnum.Cancelled].text}</div>
            <div className="text-2xl">
              <span
                className="text-danger cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/order?status=${OrderStatusEnum.Cancelled}`)}
              >
                {orderStatistics.cancelled}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{ORDER_STATUS_MAP[OrderStatusEnum.Completed].text}</div>
            <div className="text-2xl">
              <span
                className="text-gray-500 cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/order?status=${OrderStatusEnum.Completed}`)}
              >
                {orderStatistics.completed}
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* 商品统计 */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">商品统计</h2>

        <div className="mb-4 grid grid-cols-5 gap-4 text-center">
          <Card>
            <div className="text-sm text-[#666]">总商品</div>
            <div className="text-2xl">
              <span
                className="text-primary cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/product`)}
              >
                {productStatistics.total}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{PRODUCT_STATUS_MAP[ProductStatusEnum.OnSale].text}</div>
            <div className="text-2xl">
              <span
                className="text-success cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/product?status=${ProductStatusEnum.OnSale}`)}
              >
                {productStatistics.onSale}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{PRODUCT_STATUS_MAP[ProductStatusEnum.OutOfStock].text}</div>
            <div className="text-2xl">
              <span
                className="text-danger cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/product?status=${ProductStatusEnum.OutOfStock}`)}
              >
                {productStatistics.outOfStock}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{PRODUCT_STATUS_MAP[ProductStatusEnum.LowStock].text}</div>
            <div className="text-2xl">
              <span
                className="text-warning cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/product?status=${ProductStatusEnum.LowStock}`)}
              >
                {productStatistics.lowStock}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{PRODUCT_STATUS_MAP[ProductStatusEnum.OffSale].text}</div>
            <div className="text-2xl">
              <span
                className="text-gray-500 cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App1}/product?status=${ProductStatusEnum.OffSale}`)}
              >
                {productStatistics.offSale}
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* 用户统计 */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">用户统计</h2>

        <div className="mb-4 grid grid-cols-3 gap-4 text-center">
          <Card>
            <div className="text-sm text-[#666]">总用户</div>
            <div className="text-2xl">
              <span
                className="text-primary cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App2}/user`)}
              >
                {userStatistics.total}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{USER_STATUS_MAP[UserStatusEnum.Active].text}</div>
            <div className="text-2xl">
              <span
                className="text-success cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App2}/user?status=${UserStatusEnum.Active}`)}
              >
                {userStatistics.active}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{USER_STATUS_MAP[UserStatusEnum.Disabled].text}</div>
            <div className="text-2xl">
              <span
                className="text-danger cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App2}/user?status=${UserStatusEnum.Disabled}`)}
              >
                {userStatistics.disabled}
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* 角色统计 */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">角色统计</h2>

        <div className="mb-4 grid grid-cols-3 gap-4 text-center">
          <Card>
            <div className="text-sm text-[#666]">总角色</div>
            <div className="text-2xl">
              <span
                className="text-primary cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App2}/role`)}
              >
                {roleStatistics.total}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{ROLE_STATUS_MAP[RoleStatusEnum.Active].text}</div>
            <div className="text-2xl">
              <span
                className="text-success cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App2}/role?status=${RoleStatusEnum.Active}`)}
              >
                {roleStatistics.active}
              </span>
            </div>
          </Card>
          <Card>
            <div className="text-sm text-[#666]">{ROLE_STATUS_MAP[RoleStatusEnum.Inactive].text}</div>
            <div className="text-2xl">
              <span
                className="text-danger cursor-pointer hover:opacity-75"
                onClick={() => navigate(`${AppNameEnum.App2}/role?status=${RoleStatusEnum.Inactive}`)}
              >
                {roleStatistics.inactive}
              </span>
            </div>
          </Card>
        </div>
      </section>
    </Card>
  );
}
