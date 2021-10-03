export interface FormValues {
  productName: string;
  brand: string;
  category: string;
  availableColors: string;
  availableSizes: string;
  description: string;
  price: string;
  oldPrice: string;
  shipping: string;
}

export interface AdminFormProps {
  getFormData: (values: FormValues) => void;
}

export interface Forms {
  name: keyof FormValues;
  labelName: string;
  formType?: string | undefined;
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
