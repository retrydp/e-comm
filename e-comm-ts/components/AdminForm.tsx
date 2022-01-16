// import React from 'react';

// import { FormValues, AdminFormProps, Forms } from '../types';

// const AdminForm: React.FC<AdminFormProps> = (props): JSX.Element => {
//   const initialValues: FormValues = {
//     productName: '',
//     brand: '',
//     category: '',
//     availableColors: [
//       {
//         color: '',
//         images: '',
//       },
//     ],
//     availableSizes: '',
//     description: '',
//     price: '',
//     oldPrice: '',
//     shipping: '',
//     itemsInStock: '',
//   };

//   // const validationSchema = Yup.object({
//   //   productName: Yup.string()
//   //     .max(50, 'Must be 50 characters or less')
//   //     .required('Required'),
//   //   brand: Yup.string()
//   //     .max(20, 'Must be 20 characters or less')
//   //     .required('Required'),
//   //   category: Yup.string()
//   //     .max(20, 'Must be 20 characters or less')
//   //     .required('Required'),
//   //   availableColors: Yup.array()
//   //     .of(
//   //       Yup.object().shape({
//   //         color: Yup.string().required('Required'),
//   //         images: Yup.string().required('Required'),
//   //       })
//   //     )
//   //     .min(1, 'Atleast one color is needed'),
//   //   availableSizes: Yup.string()
//   //     .matches(
//   //       /^(\d.?|[a-zA-Z])+(?:, ?(\d.?|[a-zA-Z])+)*$/,
//   //       'Comma-separated list'
//   //     )
//   //     .max(100, 'Must be 100 characters or less')
//   //     .required('Required'),
//   //   description: Yup.string()
//   //     .max(1500, 'Must be 1500 characters or less')
//   //     .required('Required'),
//   //   itemsInStock: Yup.string()
//   //     .matches(/^[0-9]+$/, 'Must be a number')
//   //     .required('Required'),
//   //   price: Yup.string()
//   //     .matches(/^\d+(\.\d+)?$/, 'Must be a number')
//   //     .max(15, 'Must be 15 characters or less')
//   //     .required('Required'),
//   //   shipping: Yup.string()
//   //     .max(50, 'Must be 50 characters or less')
//   //     .required('Required'),
//   //   oldPrice: Yup.string()
//   //     .matches(/^\d+(\.\d+)?$/, 'Must be a number')
//   //     .max(15, 'Must be 15 characters or less'),
//   // });

//   const inputs: Forms[] = [
//     {
//       name: 'productName',
//       labelName: 'Products',
//     },
//     {
//       name: 'brand',
//       labelName: 'Brand',
//     },
//     {
//       name: 'category',
//       labelName: 'Category',
//     },
//     {
//       name: 'availableColors',
//       labelName: 'Available colors',
//       formType: 'textarea',
//       isExtendable: true,
//     },
//     {
//       name: 'availableSizes',
//       labelName: 'Available sizes',
//     },
//     {
//       name: 'description',
//       labelName: 'Description',
//       formType: 'textarea',
//     },
//     {
//       name: 'price',
//       labelName: 'Price',
//     },
//     {
//       name: 'oldPrice',
//       labelName: 'Old price',
//     },
//     {
//       name: 'shipping',
//       labelName: 'Shipping',
//     },
//     {
//       name: 'itemsInStock',
//       labelName: 'Items in stock',
//     },
//   ];

//   /**
//    * Generates form item to render.
//    * @param name Form name.
//    * @param labelName Form description to display.
//    * @param formikFeatures Special formik methods.
//    * @param formType Specific form type e.g. "textarea", "range" etc.
//    * @param isExtendable Additional values can be added.
//    * @returns Pregenerated form item.
//    */
//   // const formItem = (
//   //   { name, labelName, formType, isExtendable }: Forms,
//   //   { errors, touched, values, setFieldValue }: FormikProps<FormValues>
//   // ): JSX.Element => {
//   //   if (isExtendable) {
//   //     return (
//   //       <FieldArray name={name} key={name}>
//   //         {({ remove, push }) => (
//   //           <div>
//   //             {values[name].length > 0 &&
//   //               (values[name] as []).map((_, index) => (
//   //                 <div className="body__wrapper body__wrapper-sub" key={index}>
//   //                   <div className="body__row">
//   //                     <label
//   //                       htmlFor={`${name}.${index}.color`}
//   //                       className="body__input-label"
//   //                     >
//   //                       Color
//   //                     </label>
//   //                     <Field
//   //                       name={`${name}.${index}.color`}
//   //                       type="text"
//   //                       className={classNames('body__input', {
//   //                         body__input_warning:
//   //                           errors?.[name]?.[index]?.['color'] &&
//   //                           touched?.[name]?.[index]?.['color'],
//   //                       })}
//   //                     />
//   //                     <ErrorMessage name={`${name}.${index}.color`}>
//   //                       {(msg) => (
//   //                         <div className="body__input-error">{msg}</div>
//   //                       )}
//   //                     </ErrorMessage>
//   //                   </div>

//   //                   <div className="body__row">
//   //                     <label
//   //                       htmlFor={`${name}.${index}.images`}
//   //                       className="body__input-label"
//   //                     >
//   //                       Images
//   //                     </label>
//   //                     <Field
//   //                       name={`${name}.${index}.images`}
//   //                       type="file"
//   //                       value={undefined}
//   //                       onChange={(
//   //                         event: React.ChangeEvent<HTMLInputElement>
//   //                       ) =>
//   //                         setFieldValue(
//   //                           `${name}.${index}.images`,
//   //                           event.target.files
//   //                         )
//   //                       }
//   //                       className={classNames('body__input', {
//   //                         body__input_warning:
//   //                           errors?.[name]?.[index]?.['images'] &&
//   //                           touched?.[name]?.[index]?.['images'],
//   //                         'body__input-textarea': formType === 'textarea',
//   //                       })}
//   //                     />
//   //                     <ErrorMessage name={`${name}.${index}.images`}>
//   //                       {(msg) => (
//   //                         <div className="body__input-error">{msg}</div>
//   //                       )}
//   //                     </ErrorMessage>
//   //                   </div>

//   //                   <div className="body__row">
//   //                     <button
//   //                       type="button"
//   //                       className="body__submit"
//   //                       onClick={() => remove(index)}
//   //                     >
//   //                       Delete block
//   //                     </button>
//   //                   </div>
//   //                 </div>
//   //               ))}

//   //             <button
//   //               type="button"
//   //               className="body__submit"
//   //               onClick={() => push({ color: '', images: '' })}
//   //             >
//   //               Add color
//   //             </button>
//   //             {/* Error display */}
//   //             {typeof errors[name] === 'string' ? (
//   //               <div className="body__input-error">{errors[name]}</div>
//   //             ) : null}
//   //           </div>
//   //         )}
//   //       </FieldArray>
//   //     );
//   //   }

//   //   return (
//   //     <div className="body__row" key={name}>
//   //       <label htmlFor={name} className="body__input-label">
//   //         {labelName}
//   //       </label>
//   //       <Field
//   //         name={name}
//   //         as={(formType ??= 'input')}
//   //         type="text"
//   //         className={classNames('body__input', {
//   //           body__input_warning: errors[name] && touched[name],
//   //           'body__input-textarea': formType === 'textarea',
//   //         })}
//   //       />
//   //       <ErrorMessage name={name}>
//   //         {(msg) => <div className="body__input-error">{msg}</div>}
//   //       </ErrorMessage>
//   //     </div>
//   //   );
//   // };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           props.getFormData(values);

//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {(formikProps) => (
//         <Form className="body__wrapper">
//           {inputs.map((element) =>
//             formItem({ ...element }, { ...formikProps })
//           )}
//           <button type="submit" className="body__submit">
//             Send
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default AdminForm;
