import nc from 'next-connect';
import { Error } from 'mongoose';
import db from '../../../../../utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import User from '../../../../../models/User';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAuth).use(isAdmin);

handler.get(async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOne({ _id: req.query.id });
    if (user) {
      user.password = null;
      res.json({
        success: true,
        payload: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
});

handler.patch(async (req, res) => {
  try {
    await db.connect();
    const editUser = await User.findOne({ _id: req.query.id });
    if (editUser) {
      editUser.name = req.body.name;
      editUser.email = req.body.email;
      editUser.isAdmin = req.body.isAdmin;
      await editUser.save();
      editUser.password = null;
      res.status(202).json({ success: true, payload: editUser });
      await db.disconnect();
    } else {
      await db.disconnect();
      res.status(404).json({ success: false, message: 'User not found.' });
    }
  } catch (error: any) {
    await db.disconnect();
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }
});

export default handler;
