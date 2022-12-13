import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import notificationMessages from '../constants/notificationMessages';
import { getSession } from 'next-auth/react';
export interface UserAuth {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthRequest extends NextApiRequest {
  user?: string | jwt.JwtPayload;
}

interface AuthAdmin extends NextApiRequest {
  user: UserAuth;
}

const isAuth = async (
  req: AuthRequest,
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
  req: AuthAdmin,
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
