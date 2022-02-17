import nc from 'next-connect';
import User from '../../../models/User';
import { Error } from 'mongoose';
import db from '../../../utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { MongoError } from 'mongodb';
import jwt from 'jsonwebtoken';
const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await db.connect();
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: false,
    });
    const user = await newUser.save();
    await db.disconnect();
    const accessToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_TOKEN_SECRET as string
    );
    res.send({
      token: accessToken,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
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
      message: error,
    });
  }
});

export default handler;
