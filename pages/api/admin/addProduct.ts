import nc from 'next-connect';
import Product from '../../../models/Product';
import { Error } from 'mongoose';
import db from '../../../utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import { MongoError } from 'mongodb';
import { isAdmin, isAuth } from '../../../utils/auth';

const handler = nc<NextApiRequest, NextApiResponse>();

const slug = (str: string) =>
  slugify(str, {
    replacement: '-',
    lower: true,
    strict: true,
    locale: 'vi', // language code of the locale to use
    trim: true,
  });

handler.use(isAuth).use(isAdmin);

handler.post(async (req, res) => {
  try {
    await db.connect();
    const newProduct = new Product({
      name: req.body.name,
      slug: slug(req.body.name),
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      color: req.body.color,
      itemsInStock: req.body.itemsInStock,
      images: req.body.images,
      rating: 1,
    });
    const product = await newProduct.save();
    await db.disconnect();
    res.send(product);
  } catch (error: any) {
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    } else if ((error as MongoError).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This product is already registered.',
      });
    }
    res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
});

export default handler;
