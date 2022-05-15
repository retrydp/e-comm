import { AxiosResponse } from 'axios';
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

export interface ProductSchema {
  slug: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  oldPrice: number;
  color: string;
  images: string[];
  rating?: number;
  salesCount?: number;
  itemsInStock: number;
  deliveryMethods?: string;
  reviews?: mongoose.Model<Reviews>;
  numReviews: number;
}

export type NavTitles = 'home' | 'bags' | 'sneakers' | 'belts' | 'contacts';

export interface GoodsProps {
  goods: ProductSchema[];
  minPrice?: number;
  maxPrice?: number;
  availableColors?: string[];
  availableBrands?: string[];
}

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
  price: string;
  oldPrice: string;
  color: string;
  itemsInStock: string;
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
