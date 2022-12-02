import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/database';
import User from '../../../models/User';
import notificationMessages from '../../../constants/notificationMessages';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    if (!req.body.password)
      return res.status(400).json({
        success: false,
        message: notificationMessages.AUTH_NO_PASSWORD,
      });
    await db.dbConnect();
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = signToken(user);
      res.json({
        success: true,
        payload: {
          token,
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: notificationMessages.AUTH_INVALID_USER_DATA,
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
