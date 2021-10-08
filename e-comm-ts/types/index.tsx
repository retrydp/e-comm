import { FormikErrors, FormikTouched } from 'formik';

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
}

export interface AvailableColors<T, S> {
  color: T;
  images: S;
}

type ValueDifference = 'availableColors' | 'availableSizes' | 'price' | 'oldPrice';

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
  lastModified?: Date;
  salesCount?: number;
  rating?: number;
  itemsInStock?: number;
  comments?: Comments[];
}

export interface FormattedFormDataStrict extends Required<Omit<FormattedFormData, 'comments'>> {
  comments?: [] | Comments[];
}

export interface AdminFormProps {
  getFormData: (values: FormValues) => void;
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

export type TemplateType = 'extended' | 'grid';

export interface SliderValues {
  minValue: number;
  maxValue: number;
}

export interface Template {
  value: TemplateType;
}

export interface SliderProps {
  handler: (value: number[]) => void;
}

export type Products = string[];

export interface ProductProps {
  routerQueryType: string;
}
