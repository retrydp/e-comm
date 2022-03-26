import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/database';
import User from '../../../models/User';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    if (!req.body.password)
      return res.status(400).json({
        success: false,
        message: 'Password is not set.',
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
      res
        .status(401)
        .json({ success: false, message: 'Invalid email or password.' });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

export default handler;
