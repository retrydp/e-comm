import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/database';
import User from '../../../models/User';
import { isAdmin, isAuth } from '../../../utils/auth';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAuth).use(isAdmin);

handler.get(async (req, res) => {
  try {
    await db.connect();
    const products = await User.find({});
    await db.disconnect();
    res.json({ success: true, payload: products });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

handler.delete(async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOne({ _id: req.body });
    if (user) {
      await user.remove();
      await db.disconnect();
      res.status(202).json({
        success: true,
        payload: 'Deleted successfully',
      });
    } else {
      await db.disconnect();
      res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error: any) {
    await db.disconnect();
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

export default handler;
