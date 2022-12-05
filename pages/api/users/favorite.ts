import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/database';
import User from '../../../models/User';
import Product from '../../../models/Product';
import { isAuth, UserAuth } from '../../../utils/auth';
import notificationMessages from '../../../constants/notificationMessages';

interface FavoriteRequest extends NextApiRequest {
  user: UserAuth;
}

const handler = nc<FavoriteRequest, NextApiResponse>();

handler.use(isAuth);

handler.put(async (req, res) => {
  try {
    await db.dbConnect();
    const { id } = req.body;
    const product = await Product.findOne({ slug: id });
    if (product) {
      const user = await User.findById(req.user._id);
      if (user) {
        if (user.favoritesId.includes(product.slug)) {
          res.status(409).json({
            success: false,
            message: notificationMessages.FAVORITES_ADD_ALREADY_EXISTS,
          });

          return;
        }
        user.favoritesId.push(product.slug);
        await user.save();
        res.status(200).json({
          success: true,
          message: notificationMessages.FAVORITES_ADD_SUCCESS,
        });
      } else {
        res.status(404).json({
          success: false,
          message: notificationMessages.USER_NOT_FOUND,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: notificationMessages.PRODUCT_NOT_FOUND,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

handler.get(async (req, res) => {
  try {
    await db.dbConnect();
    const user = await User.findById(req.user._id);
    const userFavorites = user?.favoritesId;
    const products = await Product.find({ slug: { $in: userFavorites } });
    res.status(200).json({
      success: true,
      payload: products,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

handler.delete(async (req, res) => {
  try {
    await db.dbConnect();
    const { id } = req.body;
    const product = await Product.findOne({ slug: id });
    if (product) {
      const user = await User.findById(req.user._id);
      if (user) {
        if (user.favoritesId.includes(product.slug)) {
          user.favoritesId = user.favoritesId.filter(
            (item: string) => item !== product.slug
          );
          await user.save();
          res.status(200).json({
            success: true,
            message: notificationMessages.FAVORITES_DELETE_SUCCESS,
          });
        } else {
          res.status(400).json({
            success: false,
            message: notificationMessages.FAVORITES_DELETE_NOT_FOUND,
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: notificationMessages.USER_NOT_FOUND,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: notificationMessages.PRODUCT_NOT_FOUND,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

export default handler;
