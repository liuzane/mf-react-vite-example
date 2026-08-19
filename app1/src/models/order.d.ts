// 类型
import type { Order } from 'mockDB/data/orders';
import type { OrderStatusType } from 'shared/models';

export interface IOrder extends Omit<Order, 'status'> {
  status: OrderStatusType;
}

export interface IOrderEditForm {
  productName: string;
  amount: number;
  status: OrderStatusType;
  customerName: string;
  phone: string;
  address: string;
}
