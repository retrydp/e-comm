import nc from 'next-connect';
import { Error } from 'mongoose';
import db from '../../../../../utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import User from '../../../../../models/User';
import notificationMessages from '../../../../../constants/notificationMessages';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAuth).use(isAdmin);

handler.get(async (req, res) => {
  try {
    await db.dbConnect();
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
        message: notificationMessages.USER_NOT_FOUND,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unexpected error`, // TODO log this error
    });
  }
});

handler.patch(async (req, res) => {
  try {
    await db.dbConnect();
    const editUser = await User.findOne({ _id: req.query.id });
    if (editUser) {
      editUser.name = req.body.name;
      editUser.email = req.body.email;
      editUser.isAdmin = req.body.isAdmin;
      await editUser.save();
      editUser.password = null;
      res.status(202).json({ success: true, payload: editUser });
    } else {
      res
        .status(404)
        .json({ success: false, message: notificationMessages.USER_NOT_FOUND });
    }
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: `Unexpected error`, // TODO log this error
      });
    } else {
      return res.status(500).json({
        success: false,
        message: `Unexpected error`, // TODO log this error
      });
    }
  }
});

export default handler;
