import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { isAdmin, isAuth } from '../../../utils/auth';

interface FileRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const onError = async (err: any, req: NextApiRequest, res: NextApiResponse) => {
  res.status(500).send({
    success: false,
    message: err.toString(),
  });
};

const handler = nc<FileRequest, NextApiResponse>({ onError });

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/assets/img/productsImg');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

handler.use(isAuth).use(isAdmin).use(upload.single('file'));

handler.post(async (req, res) => {
  try {
    console.log(req.file);
    res.json({
      success: true,
      payload: req.file.destination.slice(8) + '/' + req.file.filename,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

export default handler;
