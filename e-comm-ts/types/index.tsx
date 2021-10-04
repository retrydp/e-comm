import { FormikErrors, FormikTouched } from 'formik';

export interface FormValues {
  productName: string;
  brand: string;
  category: string;
  availableColors: AvailableColors<string>[];
  availableSizes: string;
  description: string;
  price: string;
  oldPrice: string;
  shipping: string;
}

export interface AvailableColors<T> {
  color: T;
  images: T;
}

export interface FormattedFormColor {
  color: string;
  images: string[];
}

export type FomatedFormSize = string[];

export interface FormattedFormData {
  availableColors: FormattedFormColor[];
  availableSizes: FomatedFormSize;
  productName: string;
  brand: string;
  category: string;
  description: string;
  price: string;
  oldPrice: string;
  shipping: string;
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
  formType?: string | undefined;
  isExtendable?: boolean | undefined;
}

export type TemplateType = 'extended' | 'grid';

export interface SliderValues<T> {
  minValue: T;
  maxValue: T;
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
