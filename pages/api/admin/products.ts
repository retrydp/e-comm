import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/database';
import Product from '../../../models/Product';
import { isAdmin, isAuth } from '../../../utils/auth';
import notificationMessages from '../../../constants/notificationMessages';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAuth).use(isAdmin);

handler.get(async (req, res) => {
  try {
    await db.dbConnect();
    const products = await Product.find({});

    res.json({ success: true, payload: products });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    /* FIXME:  define specific type for error */
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

handler.delete(async (req, res) => {
  try {
    await db.dbConnect();
    const product = await Product.findOne({ slug: req.body });
    if (product) {
      await product.remove();
      res.status(202).json({
        success: true,
        payload: notificationMessages.PRODUCT_DELETED,
      });
    } else {
      res.status(400).json({
        success: false,
        message: notificationMessages.PRODUCT_NOT_FOUND,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    /* FIXME:  define specific type for error */
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

export default handler;
