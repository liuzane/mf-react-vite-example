// 类型
import type { Product } from 'mockDB/data/products';
import type { ProductStatusType } from 'shared/models';

// 枚举
import { ProductCategoryEnum } from '@/enums/product.enum';

export type ProductCategoryType = typeof ProductCategoryEnum[keyof typeof ProductCategoryEnum];
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

export interface IProductEditForm {
  name: string;
  price: number;
  stock: number;
  category: ProductCategoryType;
  status: ProductStatusType;
  supplier: string;
  description: string;
}
