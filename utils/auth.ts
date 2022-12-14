import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import notificationMessages from '../constants/notificationMessages';
import { getSession } from 'next-auth/react';

const isAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const session = await getSession({ req });
  if (session?.user) {
    next();
  } else {
    res
      .status(401)
      .json({ message: notificationMessages.AUTH_TOKEN_NOT_SUPPLIED });
  }
};

const isAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const session = await getSession({ req });
  if (session?.user?.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: notificationMessages.AUTH_NOT_ADMIN });
  }
};

export { isAuth, isAdmin };
