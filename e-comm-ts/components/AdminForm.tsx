import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormValues, AdminFormProps } from '../types';

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
      <Form className="body__wrapper">
        <div className="body__row">
          <label htmlFor="productName" className="body__input-label">
            Product name
          </label>
          <Field name="productName" type="text" className="body__input" />
          <ErrorMessage name="productName">{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
        </div>

        <div className="body__row">
          <label htmlFor="brand" className="body__input-label">
            Brand
          </label>
          <Field name="brand" type="text" className="body__input" />
          <ErrorMessage name="brand">{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
        </div>

        <div className="body__row">
          <label htmlFor="category" className="body__input-label">
            Category
          </label>
          <Field name="category" type="text" className="body__input" />
          <ErrorMessage name="category">{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
        </div>

        <div className="body__row">
          <label htmlFor="availableColors" className="body__input-label">
            Available colors
          </label>
          <Field name="availableColors" type="text" className="body__input" />
          <ErrorMessage name="availableColors">{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
        </div>

        <div className="body__row">
          <label htmlFor="availableSizes" className="body__input-label">
            Available sizes
          </label>
          <Field name="availableSizes" type="text" className="body__input" />
          <ErrorMessage name="availableSizes">{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
        </div>

        <div className="body__row">
          <label htmlFor="description" className="body__input-label">
            Description
          </label>
          <Field name="description" as="textarea" className="body__input" rows={4} style={{ resize: 'vertical' }} />
          <ErrorMessage name="description">{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
        </div>

        <div className="body__row">
          <label htmlFor="price" className="body__input-label">
            Price
          </label>
          <Field name="price" type="text" className="body__input" />
          <ErrorMessage name="price">{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
        </div>

        <div className="body__row">
          <label htmlFor="oldPrice" className="body__input-label">
            Old price
          </label>
          <Field name="oldPrice" type="text" className="body__input" />
          <ErrorMessage name="oldPrice">{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
        </div>

        <div className="body__row">
          <label htmlFor="shipping" className="body__input-label">
            Shipping
          </label>
          <Field name="shipping" type="text" className="body__input" />
          <ErrorMessage name="shipping">{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
        </div>

        <button type="submit" className="body__submit">
          Send
        </button>
      </Form>
    </Formik>
  );
};

export default AdminForm;
