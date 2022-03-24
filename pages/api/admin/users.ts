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

export default handler;
