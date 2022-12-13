import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/' {
  interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  }

  interface Session {
    // what ever properties added, add type here
    user: User;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  }
}
