import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../utils/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const data = await db.collection('products').find({}).toArray();
  res.json({ success: true, data, length: data.length });
};

export default handler;
