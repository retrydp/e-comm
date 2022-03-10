import nc from 'next-connect';
import User from '../../../models/User';
import { Error } from 'mongoose';
import db from '../../../utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { MongoError } from 'mongodb';
import { signUser } from '../../../utils/auth';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    if (!req.body.password)
      return res.status(400).json({
        success: false,
        message: 'Password is not set.',
      });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.connect();
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: false,
    });
    const user = await newUser.save();
    await db.disconnect();
    res.send({
      token: signUser(user),
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error: any) {
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    } else if ((error as MongoError).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered.',
      });
    }
    res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
});

export default handler;
