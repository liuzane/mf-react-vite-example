// 类型
import type { Product } from 'mockDB/data/products';

// 枚举
import { ProductStatusEnum, ProductCategoryEnum } from '@/enums/product.enum';

export interface IProductSearchParams {
  currentPage?: number;
  pageSize?: number;
  searchText?: string;
  category?: ProductCategoryType | '';
  status?: ProductStatusType | '';
}

export interface IProduct extends Omit<Product, 'category' | 'status'> {
  category: ProductCategoryType;
  status: ProductStatusType;
}

export interface IStatistics {
  total: number;
  onSale: number;
  offSale: number;
  outOfStock: number;
  lowStock: number;
}

export type ProductStatusType = typeof ProductStatusEnum[keyof typeof ProductStatusEnum];
export type ProductCategoryType = typeof ProductCategoryEnum[keyof typeof ProductCategoryEnum];

export interface IStatusConfig {
  text: string;
  color: 'success' | 'default' | 'error' | 'warning';
}

export interface IProductEditForm {
  name: string;
  price: number;
  stock: number;
  category: ProductCategoryType;
  status: ProductStatusType;
  supplier: string;
  description: string;
}
