import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/database';
import Product from '../../models/Product';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    await db.dbConnect();
    const productRandom = await Product.aggregate([{ $sample: { size: 3 } }]);
    const bestOfAll = await Product.find({}).limit(3).sort({ salesCount: -1 });
    const bestOfBelts = await Product.find({ category: 'belts' })
      .limit(3)
      .sort({ salesCount: -1 });
    const bestOfBags = await Product.find({ category: 'bags' })
      .limit(3)
      .sort({ salesCount: -1 });
    const bestOfSneakers = await Product.find({ category: 'sneakers' })
      .limit(3)
      .sort({ salesCount: -1 });

    res.status(200).json({
      success: true,
      payload: {
        productRandom,
        bestOfAll,
        bestOfBelts,
        bestOfBags,
        bestOfSneakers,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.toString(),
    });
  }
});

export default handler;
