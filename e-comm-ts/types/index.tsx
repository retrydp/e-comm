import { FormikErrors, FormikTouched } from 'formik';

export interface AvailableColors<T, S> {
  color: T;
  images: S;
}

export interface FormValues {
  productName: string;
  brand: string;
  category: string;
  availableColors: AvailableColors<string, string>[];
  availableSizes: string;
  description: string;
  price: string;
  oldPrice: string;
  shipping: string;
  itemsInStock: string;
}

type ValueDifference = 'availableColors' | 'availableSizes' | 'price' | 'oldPrice' | 'itemsInStock';

interface Comments {
  userId: string;
  rating: number;
  text: string;
  date: Date;
}

export interface FormattedFormData extends Omit<FormValues, ValueDifference> {
  availableColors: AvailableColors<string, string[]>[];
  availableSizes: string[];
  price: number;
  oldPrice: number;
  itemsInStock: number;
  lastModified?: Date;
  salesCount?: number;
  rating?: number;
  comments?: Comments[];
  createdAt?: Date;
}

export interface FormattedFormDataStrict extends Required<Omit<FormattedFormData, 'comments'>> {
  comments?: [] | Comments[];
}

export interface AdminFormProps {
  getFormData: (values: FormValues) => void;
}

export interface SliderProps {
  handler: (value: number[]) => void;
}

export interface FormikFeatures {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  values: FormValues;
}

export interface Forms {
  name: keyof FormValues;
  labelName: string;
  formType?: string;
  isExtendable?: boolean;
}

export interface SliderValues {
  minValue: number;
  maxValue: number;
}

export type TemplateType = 'extended' | 'grid';

export interface Template {
  value: TemplateType;
}

export type Products = string[];

export interface ProductProps {
  routerQueryType: string;
}
