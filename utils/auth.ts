import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
interface AuthRequest extends NextApiRequest {
  user?: string | jwt.JwtPayload;
}
const signUser = (user: User) => {
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
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_TOKEN_SECRET as string, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not supplied' });
  }
};

export { signUser, isAuth };
