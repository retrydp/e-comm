import User from 'models/User';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from 'utils/database';
import bcrypt from 'bcryptjs';
import notificationMessages from 'constants/notificationMessages';
import { ValidationError } from 'utils/customErrors';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email)
          throw new ValidationError(notificationMessages.AUTH_NO_EMAIL);
        if (!credentials?.password)
          throw new ValidationError(notificationMessages.AUTH_NO_PASSWORD);
        try {
          const { email, password } = credentials;
          await db.dbConnect();
          const user = await User.findOne({ email });

          if (user && bcrypt.compareSync(password, user.password)) {
            return {
              email: user.email,
              id: user._id.toString(),
              name: user.name,
              isAdmin: user.isAdmin,
            };
          } else {
            throw new ValidationError(
              notificationMessages.AUTH_INVALID_USER_DATA
            );
          }
        } catch (error) {
          if (error instanceof ValidationError) throw error;
          throw new Error(`Unexpected error`); // TODO: log this error
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user && user.id) token.id = user.id;
      if (user && user.email) token.email = user.email;
      if (user && user.name) token.name = user.name;
      if (user && 'isAdmin' in user) token.isAdmin = user.isAdmin;

      return token;
    },
    session: async ({ session, token }) => {
      if (token.id) session.user.id = token.id;
      if (token.email) session.user.email = token.email;
      if (token.name) session.user.name = token.name;
      if ('isAdmin' in token) session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  jwt: {
    secret: process.env.JWT_TOKEN_SECRET,
  },
});
