import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { isAdmin, isAuth } from '../../../utils/auth';
import streamifier from 'streamifier';

interface FileRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const onError = async (err: any, req: NextApiRequest, res: NextApiResponse) => {
  res.status(500).send({
    success: false,
    message: err.message.toString() || err.toString(),
  });
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = nc<FileRequest, NextApiResponse>({ onError });

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer();

handler.use(isAuth).use(isAdmin).use(upload.single('file'));

handler.post(async (req, res) => {
  const streamUpload = (req: FileRequest) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  const result: any = await streamUpload(req);

  res.send({ success: true, payload: result.secure_url });
});

export default handler;
