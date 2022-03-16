import mongoose from 'mongoose';

export interface Reviews {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}
export interface UserSchema {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
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
  rating: number;
  salesCount?: number;
  itemsInStock: number;
  deliveryMethods?: string;
  reviews?: mongoose.Model<Reviews>;
  numReviews: number;
}

export interface GoodsProps {
  goods: ProductSchema[];
}

export interface Inputs {
  name: string;
  icon: React.ReactNode;
  label: string;
  rules: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
  };
  helperText: React.ReactNode;
}
