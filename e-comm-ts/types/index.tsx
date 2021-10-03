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
