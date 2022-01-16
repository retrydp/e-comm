import nc from 'next-connect';
import { connectToDatabase } from '../../utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParse: false,
  },
};

const handler = nc();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  res.end(req.query);
});

export default handler;
