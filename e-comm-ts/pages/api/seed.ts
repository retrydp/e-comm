import nc from 'next-connect';
import Product from '../../models/Product';
import db from '../../utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import data from '../../utils/data';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.disconnect();
    res.send({ message: 'seeded successfully' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Could not create product due to some invalid fields!',
        error: messages,
      });
    } else if ((error as MongoError).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A product with this unique key(slug) already exists!',
      });
    }
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', error });
  }
});

export default handler;
