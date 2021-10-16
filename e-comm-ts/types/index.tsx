import { FormikErrors, FormikTouched } from 'formik';
import { AxiosResponse } from 'axios';

export interface AvailableColors<T, S> {
  color: T;
  images: S;
}

export interface AddItemRequest {
  action: string;
  values: FormValues;
}

export interface AddItemResponse extends Omit<AxiosResponse, 'data'> {
  data: ResponceAPI;
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

//props block
export interface ProductProps {
  routerQueryType: string;
}

export interface ModalProps {
  success: boolean;
  payload: string | string[];
  onClose: () => void;
}

export interface AdminFormProps {
  getFormData: (values: FormValues) => void;
}

export interface SliderProps {
  handler: (value: number[]) => void;
}
//props block end

export interface ModalOptions {
  modalVisible: boolean;
  success: boolean;
  payload: string | string[];
  onClose: () => void;
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

export interface ResponceAPI {
  success: boolean;
  error?: string;
  payload: string;
}

export type TemplateType = 'extended' | 'grid';

export interface Template {
  value: TemplateType;
}

export type Products = string[];
