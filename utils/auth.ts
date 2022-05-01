import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

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

const signToken = (user: UserAuth) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_TOKEN_SECRET as string,
    {
      expiresIn: '30d',
    }
  );
};

const isAuth = async (
  req: AuthRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_TOKEN_SECRET as string, (err, decode) => {
      if (err) {
        res.status(401).json({ message: 'Token is not valid' });
      } else {
        req.user = decode;

        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Token is not supplied' });
  }
};

const isAdmin = async (
  req: AuthAdmin,
  res: NextApiResponse,
  next: NextHandler
) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'User is not admin' });
  }
};

export { signToken, isAuth, isAdmin };
