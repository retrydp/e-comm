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

export interface FormattedFormData extends Omit<FormValues, 'availableColors' | 'availableSizes' | 'price' | 'oldPrice'> {
  availableColors: AvailableColors<string, string[]>[];
  availableSizes: string[];
  price: number;
  oldPrice: number;
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
