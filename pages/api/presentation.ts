import nc from 'next-connect';import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/database';
import Product from '../../models/Product';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    await db.dbConnect();
    const products = await Product.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json({ success: true, payload: products });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

export default handler;
