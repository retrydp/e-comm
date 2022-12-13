namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    MONGODB_URI: string;
    JWT_TOKEN_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    NEXT_AUTH_SECRET: string;
    NODE_OPTIONS: string;
  }
}
