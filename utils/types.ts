import { AxiosResponse } from 'axios';
import { menuItems } from '../constants/common';
import mongoose from 'mongoose';

export interface Reviews {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

export interface UserSchema {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  favoritesId?: string[];
}

export interface UserInfo extends Omit<UserSchema, 'favoritesId' | '_id'> {
  id: string;
}

export interface ProductSchema extends ProductRequest {
  slug: string;
  rating?: number;
  salesCount?: number;
  deliveryMethods?: string;
  reviews?: mongoose.Model<Reviews>;
  numReviews: number;
}

export interface GoodsProps {
  goods: ProductSchema[];
  minPrice?: number;
  maxPrice?: number;
  availableColors?: string[];
  availableBrands?: string[];
  productsQuantity: number;
}

export type WrapperProps = Pick<GoodsProps, 'goods'>;

export interface Inputs {
  name: string;
  icon: string;
  label: string;
  rules: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
  };
  helperText: string;
  inputType?: string;
  selectTypeContent?: string[];
}

export interface ProductRequest {
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  oldPrice: number;
  color: string;
  itemsInStock: number;
  images: string[];
}

export type InnerPayload<T extends ProductSchema = ProductSchema> = Record<
  | 'productRandom'
  | 'bestOfAll'
  | 'bestOfBelts'
  | 'bestOfBags'
  | 'bestOfSneakers',
  T[]
>;

export type AppResponse<
  T extends
    | UserSchema[]
    | ProductSchema[]
    | ProductSchema
    | UserSchema
    | string
    | InnerPayload
> = AxiosResponse<{
  payload: T;
  success: boolean;
}>;

export type NavTitles = typeof menuItems[number]['title'];
