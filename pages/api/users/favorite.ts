import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/database';
import User from '../../../models/User';
import Product from '../../../models/Product';
import { isAuth, UserAuth } from '../../../utils/auth';

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
            message: 'Product already in favorites.',
          });
          return;
        }
        user.favoritesId.push(product.slug);
        await user.save();
        res.status(200).json({
          success: true,
          message: 'Product successfully added to favorites.',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found.',
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

export default handler;
