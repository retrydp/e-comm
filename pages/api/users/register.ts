import nc from 'next-connect';import User from '../../../models/User';
import { Error } from 'mongoose';
import db from '../../../utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { MongoError } from 'mongodb';
import { signToken } from '../../../utils/auth';
import notificationMessages from '../../../constants/notificationMessages';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    if (!req.body.password)
      return res.status(400).json({
        success: false,
        message: notificationMessages.AUTH_NO_PASSWORD,
      });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.dbConnect();
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: false,
      favoritesId: [],
    });
    const user = await newUser.save();
    res.json({
      success: true,
      payload: {
        token: signToken(user),
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error: any) {
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    } else if ((error as MongoError).code === 11000) {
      return res.status(409).json({
        success: false,
        message: notificationMessages.AUTH_EMAIL_EXISTS,
      });
    }
    res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
});

export default handler;
