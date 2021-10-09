import type { NextApiRequest, NextApiResponse } from 'next';
import { ADD_NEW_PRODUCT, NO_ACTION, PRODUCT_ADDED_SUCCESS, DATABASE_ERROR, VALIDATION_ERROR, PRODUCT_ADDED_SUCCESS_TEXT, DATABASE_ERROR_TEXT, NO_ACTION_TEXT } from '../../constants/apiVars';
import { connectToDatabase } from '../../utils/database';
import { FormattedFormData, FormValues, FormattedFormDataStrict } from '../../types';
import * as Yup from 'yup';

interface Responce {
  success: boolean;
  error?: string;
  payload: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Responce>) => {
  const {
    body: { action, values },
  } = req;

  const { db } = await connectToDatabase();

  switch (action) {
    case ADD_NEW_PRODUCT:
      const validationSchema = Yup.object({
        productName: Yup.string().max(15, 'Must be 15 characters or less').required('Product name is required'),
        brand: Yup.string().max(20, 'Brand must be 20 characters or less').required('Brand is required'),
        category: Yup.string().max(20, 'Must be 20 characters or less').required('Category is required'),
        availableColors: Yup.array()
          .of(
            Yup.object().shape({
              color: Yup.string().required('Color is required'),
              images: Yup.string().required('Images is required'),
            })
          )
          .min(1, 'Atleast one color is needed in available colors'),
        availableSizes: Yup.string()
          .matches(/^(\d|[a-zA-Z])+(?:, ?(\d|[a-zA-Z])+)*$/, 'Available sizes must be a comma-separated list')
          .max(100, 'Available sizes must be 100 characters or less')
          .required('Available sizes is required'),
        description: Yup.string().max(1500, 'Must be 1500 characters or less').required('Description is required'),
        itemsInStock: Yup.string()
          .matches(/^[0-9]+$/, 'Items in stock must be a number')
          .required('Items in stock is required'),
        price: Yup.string()
          .matches(/^[0-9]+$/, 'Price must be a number')
          .max(15, 'Price must be 15 characters or less')
          .required('Price is required'),
        shipping: Yup.string().max(50, 'Shipping must be 50 characters or less').required('Shipping is required'),
        oldPrice: Yup.string()
          .matches(/^[0-9]+$/, 'Old price must be a number')
          .max(15, 'Old price must be 15 characters or less'),
      });
      const userFormData: FormValues = values;

      await validationSchema
        .validate(userFormData, { abortEarly: false })
        .then(async () => {
          const valuesFormatted: FormattedFormData = {
            ...userFormData,
            availableColors: userFormData.availableColors.map(({ images, color }) => ({ color, images: images.split(',') })),
            availableSizes: userFormData.availableSizes.split(','),
            price: Number(userFormData.price),
            oldPrice: Number(userFormData.oldPrice),
            itemsInStock: Number(userFormData.itemsInStock),
          };

          const addQuery: FormattedFormDataStrict = {
            ...valuesFormatted,
            lastModified: new Date(),
            createdAt: new Date(),
            salesCount: 0,
            rating: 0,
            comments: [],
          };

          try {
            const data = await db.collection('products').insertOne(addQuery);

            res.json({
              success: true,
              payload: PRODUCT_ADDED_SUCCESS_TEXT,
            });
          } catch (error) {
            res.json({ success: false, error: DATABASE_ERROR, payload: DATABASE_ERROR_TEXT });
          }
        })
        .catch(({ errors }) => res.json({ success: false, error: VALIDATION_ERROR, payload: errors }));
      break;

    default:
      res.json({ success: false, error: NO_ACTION, payload: NO_ACTION_TEXT });
      break;
  }
};

export default handler;
