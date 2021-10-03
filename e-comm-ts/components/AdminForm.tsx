import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';
import { FormValues, AdminFormProps, Forms } from '../types';
import classNames from 'classnames';

const AdminForm: React.FC<AdminFormProps> = (props): JSX.Element => {
  const initialValues: FormValues = {
    productName: '',
    brand: '',
    category: '',
    availableColors: '',
    availableSizes: '',
    description: '',
    price: '',
    oldPrice: '',
    shipping: '',
  };

  const validationSchema = Yup.object({
    productName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    brand: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    category: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    availableColors: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
    availableSizes: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
    description: Yup.string().max(1500, 'Must be 1500 characters or less').required('Required'),
    price: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    shipping: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
    oldPrice: Yup.string().max(15, 'Must be 15 characters or less'),
  });

  const inputs: Forms[] = [
    { name: 'productName', labelName: 'Products' },
    { name: 'brand', labelName: 'Brand' },
    { name: 'category', labelName: 'Category' },
    { name: 'availableColors', labelName: 'Available colors', formType: 'textarea' },
    { name: 'availableSizes', labelName: 'Available sizes' },
    { name: 'description', labelName: 'Description', formType: 'textarea' },
    { name: 'price', labelName: 'Price' },
    { name: 'oldPrice', labelName: 'Old price' },
    { name: 'shipping', labelName: 'Shipping' },
  ];

  /**
   * Generates form item to render
   * @param name Form name
   * @param labelName Form description to display
   * @param errors FormikErrors
   * @param touched FormikTouched
   * @param formType Specific form type e.g. "textarea", "range" etc.
   * @returns Pregenerated form item
   */
  const formItem = (name: keyof FormValues, labelName: string, errors: FormikErrors<FormValues>, touched: FormikTouched<FormValues>, formType?: string | undefined): JSX.Element => (
    <div className="body__row" key={name}>
      <label htmlFor={name} className="body__input-label">
        {labelName}
      </label>
      <Field
        name={name}
        as={(formType ??= 'input')}
        type="text"
        className={classNames('body__input', {
          body__input_warning: Object.keys(errors).includes(name) && Object.keys(touched).includes(name),
          'body__input-textarea': formType === 'textarea',
        })}
      />
      <ErrorMessage name={name}>{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
    </div>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          props.getFormData(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="body__wrapper">
            {inputs.map(({ name, labelName, formType }) => formItem(name, labelName, errors, touched, formType))}
            <button type="submit" className="body__submit">
              Send
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminForm;
