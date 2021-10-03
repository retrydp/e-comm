import { Formik, Field, Form, ErrorMessage, FormikErrors, FormikTouched } from 'formik';

export interface FormValues<T> {
  productName: T;
  brand: T;
  category: T;
  availableColors: AvailableColors<T>[];
  availableSizes: T;
  description: T;
  price: T;
  oldPrice: T;
  shipping: T;
}

export interface AvailableColors<T> {
  color: T;
  value: T;
}

export interface AdminFormProps {
  getFormData: (values: FormValues<string>) => void;
}

export interface FormikFeatures {
  errors: FormikErrors<FormValues<string>>;
  touched: FormikTouched<FormValues<string>>;
  values: FormValues<string>;
}

export interface Forms {
  name: keyof FormValues<string>;
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
