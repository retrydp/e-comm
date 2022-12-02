import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/database';
import User from '../../../models/User';
import { isAdmin, isAuth } from '../../../utils/auth';
import notificationMessages from '../../../constants/notificationMessages';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAuth).use(isAdmin);

handler.get(async (req, res) => {
  try {
    await db.dbConnect();
    const products = await User.find({});
    res.json({ success: true, payload: products });
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
    const user = await User.findOne({ _id: req.body });
    if (user) {
      await user.remove();
      res.status(202).json({
        success: true,
        payload: notificationMessages.USER_DELETED,
      });
    } else {
      res.status(400).json({
        success: false,
        message: notificationMessages.USER_NOT_FOUND,
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
