import { Formik, Field, Form, ErrorMessage, FormikErrors, FormikTouched } from 'formik';
export interface FormValues {
  productName: string;
  brand: string;
  category: string;
  availableColors: AvailableColors[];
  availableSizes: string;
  description: string;
  price: string;
  oldPrice: string;
  shipping: string;
}

export interface AvailableColors {
  color: string;
  value: string;
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
