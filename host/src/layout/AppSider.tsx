// 基础模块
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeFilled, AppstoreOutlined } from '@ant-design/icons';

// 类型
import type { NavigateFunction, Location } from 'react-router-dom';
import type { MenuProps } from 'antd';

// 枚举
import { AppNameEnum } from '@/enums';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;

// 菜单配置
const menuItems: MenuItem[] = [
  {
    key: '/',
    label: '首页',
    icon: <HomeFilled />,
  },
  {
    key: AppNameEnum.App1,
    label: '微应用 1',
    icon: <AppstoreOutlined />,
    children: [
      { key: `/${AppNameEnum.App1}/order`, label: '订单管理' },
      { key: `/${AppNameEnum.App1}/product`, label: '商品管理' },
    ],
  },
  {
    key: AppNameEnum.App2,
    label: '微应用 2',
    icon: <AppstoreOutlined />,
    children: [
      { key: `/${AppNameEnum.App2}/user`, label: '用户管理' },
      { key: `/${AppNameEnum.App2}/role`, label: '角色管理' },
    ],
  },
];

/**
 * 侧边栏组件
 * 负责展示菜单导航和菜单状态管理
 */
export function AppSider() {
  // 导航函数
  const navigate: NavigateFunction = useNavigate();

  // 路由信息
  const location: Location = useLocation();

  // 菜单状态管理
  const [openKeys, setOpenKeys] = useState<string[]>([location.pathname.split('/')[1]]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([location.pathname]);

  /**
   * 监听路由变化，同步更新菜单选中状态
   */
  useEffect(() => {
    const pathname: string = location.pathname;
    const pathnamePieces: string[] = pathname.split('/');
    const appName: string = pathnamePieces[1];
    if (appName) {
      setOpenKeys([...new Set([...openKeys, appName])]);
      setSelectedKeys([pathname]);
    }
  }, [location.pathname]);

  /**
   * 菜单点击处理函数
   * @param param0 - 点击事件参数
   * @param param0.key - 点击的菜单项key
   */
  const onMenuClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    navigate(key);
  };

  /**
   * 菜单展开/收起处理函数
   * @param openKeys - 当前展开的菜单项keys
   */
  const onMenuOpenChange: MenuProps['onOpenChange'] = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };

  return (
    <Sider width={220} theme="dark" breakpoint="lg" collapsible>
      <div className="h-16 flex items-center justify-center text-white text-2xl font-bold letter-spacing-1 bg-white/5">
        Micro Frontend
      </div>
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        theme="dark"
        mode="inline"
        items={menuItems}
        onClick={onMenuClick}
        onOpenChange={onMenuOpenChange}
      />
    </Sider>
  );
}

export default AppSider;
