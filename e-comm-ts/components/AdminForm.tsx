import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { FormValues, AdminFormProps, Forms, FormikFeatures } from '../types';
import classNames from 'classnames';

const AdminForm: React.FC<AdminFormProps> = (props): JSX.Element => {
  const initialValues: FormValues<string> = {
    productName: '',
    brand: '',
    category: '',
    availableColors: [{ color: '', value: '' }],
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
    availableColors: Yup.array()
      .of(
        Yup.object().shape({
          color: Yup.string().required('Required'),
          value: Yup.string().required('Required'),
        })
      )
      .min(1, 'Atleast one color is needed'),
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
    { name: 'availableColors', labelName: 'Available colors', formType: 'textarea', isExtendable: true },
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
   * @param formikFeatures Special formik methods
   * @param formType Specific form type e.g. "textarea", "range" etc.
   * @param isExtendable Additional values can be added.
   * @returns Pregenerated form item
   */
  const formItem = ({ name, labelName, formType, isExtendable }: Forms, { errors, touched, values }: FormikFeatures): JSX.Element => {
    if (isExtendable) {
      return (
        <FieldArray name={name} key={name}>
          {({ remove, push }) => (
            <div>
              {values[name].length > 0 &&
                (values[name] as []).map((_, index) => (
                  <div className="body__wrapper body__wrapper-sub" key={index}>
                    <div className="body__row">
                      <label htmlFor={`${name}.${index}.color`} className="body__input-label">
                        Color
                      </label>
                      <Field
                        name={`${name}.${index}.color`}
                        type="text"
                        className={classNames('body__input', {
                          body__input_warning: errors?.[name]?.[index]?.['color'] && touched?.[name]?.[index]?.['color'],
                        })}
                      />
                      <ErrorMessage name={`${name}.${index}.color`}>{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
                    </div>

                    <div className="body__row">
                      <label htmlFor={`${name}.${index}.value`} className="body__input-label">
                        Images
                      </label>
                      <Field
                        name={`${name}.${index}.value`}
                        as="textarea"
                        className={classNames('body__input', {
                          body__input_warning: errors?.[name]?.[index]?.['value'] && touched?.[name]?.[index]?.['value'],
                          'body__input-textarea': formType === 'textarea',
                        })}
                      />
                      <ErrorMessage name={`${name}.${index}.value`}>{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
                    </div>

                    <div className="body__row">
                      <button type="button" className="body__submit" onClick={() => remove(index)}>
                        Delete block
                      </button>
                    </div>
                  </div>
                ))}
              <button type="button" className="body__submit" onClick={() => push({ color: '', value: '' })}>
                Add color
              </button>
              {/* Error display */}
              {typeof errors[name] === 'string' ? <div className="body__input-error">{errors[name]}</div> : null}
            </div>
          )}
        </FieldArray>
      );
    }
    return (
      <div className="body__row" key={name}>
        <label htmlFor={name} className="body__input-label">
          {labelName}
        </label>
        <Field
          name={name}
          as={(formType ??= 'input')}
          type="text"
          className={classNames('body__input', {
            body__input_warning: errors[name] && touched[name],
            'body__input-textarea': formType === 'textarea',
          })}
        />
        <ErrorMessage name={name}>{(msg) => <div className="body__input-error">{msg}</div>}</ErrorMessage>
      </div>
    );
  };

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
      {(formikFeatures) => (
        <Form className="body__wrapper">
          {inputs.map((element) => formItem({ ...element }, { ...formikFeatures }))}
          <button type="submit" className="body__submit">
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AdminForm;
