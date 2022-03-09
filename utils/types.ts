import { ProductSchema } from '../models/Product';

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
