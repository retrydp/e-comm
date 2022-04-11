import { Inputs } from './types';
interface FormSettings<T = Inputs[]> {
  register: T;
  login: T;
  create: T;
  edit: T;
  editUser: T;
}

const formSettings = (errors: { [x: string]: any }): FormSettings => ({
  register: [
    {
      name: 'name',
      label: 'Name',
      icon: 'person',
      rules: {
        required: true,
        minLength: 2,
      },
      helperText: errors.name
        ? errors.name.type === 'minLength'
          ? 'Name is to short'
          : 'Name is required'
        : '',
    },
    {
      name: 'email',
      label: 'E-mail',
      icon: 'mail',
      rules: {
        required: true,
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      },
      helperText: errors.email
        ? errors.email.type === 'pattern'
          ? 'Email is not valid'
          : 'Email is required'
        : '',
    },
    {
      name: 'password',
      label: 'Password',
      icon: 'password',
      rules: {
        required: true,
        minLength: 6,
      },
      helperText: errors.password
        ? errors.password.type === 'minLength'
          ? 'Password is too short'
          : 'Password is required'
        : '',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      icon: 'password',
      rules: {
        required: true,
        minLength: 6,
      },
      helperText: errors.confirmPassword
        ? errors.confirmPassword.type === 'minLength'
          ? 'Confirm Password is too short'
          : 'Confirm Password is required'
        : '',
    },
  ],
  login: [
    {
      name: 'email',
      label: 'E-mail',
      icon: 'mail',
      rules: {
        required: true,
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      },
      helperText: errors.email
        ? errors.email.type === 'pattern'
          ? 'Email is not valid'
          : 'Email is required'
        : '',
    },
    {
      name: 'password',
      label: 'Password',
      icon: 'password',
      rules: {
        required: true,
        minLength: 6,
      },
      helperText: errors.password
        ? errors.password.type === 'minLength'
          ? 'Password is too short'
          : 'Password is required'
        : '',
    },
  ],
  create: [
    {
      name: 'name',
      label: 'Name',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.name
        ? errors.name.type === 'minLength'
          ? 'Name is to short'
          : 'Name is required'
        : '',
    },
    {
      name: 'description',
      label: 'Description',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'textarea',
      helperText: errors.description
        ? errors.description.type === 'minLength'
          ? 'Description is to short'
          : 'Description is required'
        : '',
    },
    {
      name: 'category',
      label: 'Category',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      selectTypeContent: ['sneakers', 'belts', 'bags'],
      helperText: errors.category
        ? errors.category.type === 'minLength'
          ? 'Category is to short'
          : 'Category is required'
        : '',
    },
    {
      name: 'brand',
      label: 'Brand',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      selectTypeContent: ['nike', 'adidas', 'airmax'],
      helperText: errors.brand
        ? errors.brand.type === 'minLength'
          ? 'Brand is to short'
          : 'Brand is required'
        : '',
    },
    {
      name: 'price',
      label: 'Price',
      icon: '',
      rules: {
        required: true,
        minLength: 1,
      },
      inputType: 'number',
      helperText: errors.price
        ? errors.price.type === 'minLength'
          ? 'Price is to short'
          : 'Price is required'
        : '',
    },
    {
      name: 'oldPrice',
      label: 'Old Price',
      icon: '',
      rules: {
        required: true,
        minLength: 1,
      },
      inputType: 'number',
      helperText: errors.oldPrice
        ? errors.oldPrice.type === 'minLength'
          ? 'OldPrice is to short'
          : 'OldPrice is required'
        : '',
    },
    {
      name: 'color',
      label: 'Color',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.color
        ? errors.color.type === 'minLength'
          ? 'Color is to short'
          : 'Color is required'
        : '',
    },

    {
      name: 'itemsInStock',
      label: 'Items In Stock',
      icon: '',
      rules: {
        required: true,
        minLength: 1,
      },
      inputType: 'number',
      helperText: errors.itemsInStock
        ? errors.itemsInStock.type === 'minLength'
          ? 'Items In Stock is to short'
          : 'Items In Stock is required'
        : '',
    },
    {
      name: 'images',
      label: 'Images',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.images
        ? errors.images.type === 'minLength'
          ? 'Images is to short'
          : 'Images is required'
        : '',
    },
  ],
  edit: [
    {
      name: 'name',
      label: 'Name',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.name
        ? errors.name.type === 'minLength'
          ? 'Name is to short'
          : 'Name is required'
        : '',
    },
    {
      name: 'description',
      label: 'Description',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'textarea',
      helperText: errors.description
        ? errors.description.type === 'minLength'
          ? 'Description is to short'
          : 'Description is required'
        : '',
    },
    {
      name: 'category',
      label: 'Category',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      selectTypeContent: ['sneakers', 'belts', 'bags'],
      helperText: errors.category
        ? errors.category.type === 'minLength'
          ? 'Category is to short'
          : 'Category is required'
        : '',
    },
    {
      name: 'brand',
      label: 'Brand',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      selectTypeContent: ['nike', 'adidas', 'airmax'],
      helperText: errors.brand
        ? errors.brand.type === 'minLength'
          ? 'Brand is to short'
          : 'Brand is required'
        : '',
    },
    {
      name: 'price',
      label: 'Price',
      icon: '',
      rules: {
        required: true,
        minLength: 1,
      },
      inputType: 'number',
      helperText: errors.price
        ? errors.price.type === 'minLength'
          ? 'Price is to short'
          : 'Price is required'
        : '',
    },
    {
      name: 'oldPrice',
      label: 'Old Price',
      icon: '',
      rules: {
        required: true,
        minLength: 1,
      },
      inputType: 'number',
      helperText: errors.oldPrice
        ? errors.oldPrice.type === 'minLength'
          ? 'OldPrice is to short'
          : 'OldPrice is required'
        : '',
    },
    {
      name: 'color',
      label: 'Color',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.color
        ? errors.color.type === 'minLength'
          ? 'Color is to short'
          : 'Color is required'
        : '',
    },

    {
      name: 'itemsInStock',
      label: 'Items In Stock',
      icon: '',
      rules: {
        required: true,
        minLength: 1,
      },
      inputType: 'number',
      helperText: errors.itemsInStock
        ? errors.itemsInStock.type === 'minLength'
          ? 'Items In Stock is to short'
          : 'Items In Stock is required'
        : '',
    },
    {
      name: 'images',
      label: 'Images',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.images
        ? errors.images.type === 'minLength'
          ? 'Images is to short'
          : 'Images is required'
        : '',
    },
  ],
  editUser: [
    {
      name: 'name',
      label: 'Name',
      icon: '',
      rules: {
        required: true,
        minLength: 2,
      },
      inputType: 'text',
      helperText: errors.name
        ? errors.name.type === 'minLength'
          ? 'Name is to short'
          : 'Name is required'
        : '',
    },
    {
      name: 'email',
      label: 'E-mail',
      icon: '',
      rules: {
        required: true,
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      },
      inputType: 'text',
      helperText: errors.email
        ? errors.email.type === 'pattern'
          ? 'Email is not valid'
          : 'Email is required'
        : '',
    },
    {
      name: 'isAdmin',
      label: 'Is Admin',
      icon: '',
      rules: {
        required: false,
        minLength: 2,
      },
      inputType: 'text',
      selectTypeContent: ['true', 'false'],
      helperText: errors.brand
        ? errors.brand.type === 'minLength'
          ? 'Brand is to short'
          : 'Brand is required'
        : '',
    },
  ],
});

export default formSettings;
