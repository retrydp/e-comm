import type { NextApiRequest, NextApiResponse } from 'next';
import { ADD_NEW_PRODUCT, NO_ACTION, PRODUCT_ADDED_SUCCESS } from '../../constants/apiVars';
import { connectToDatabase } from '../../utils/database';
import { FormattedFormData, FormValues, FormattedFormDataStrict } from '../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { action, values },
  } = req;

  const { db } = await connectToDatabase();

  switch (action) {
    case ADD_NEW_PRODUCT:
      const userFormData: FormValues = values;

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
          status: PRODUCT_ADDED_SUCCESS,
          addQuery,
          data,
        });
      } catch (error) {
        res.json({ success: false, error });
      }
      break;

    default:
      res.json({ success: false, error: NO_ACTION });
      break;
  }
};

export default handler;
