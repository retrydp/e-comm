import nc from 'next-connect';
import Product from '../../../../../models/Product';
import { Error } from 'mongoose';
import db from '../../../../../utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import { MongoError } from 'mongodb';
import { isAdmin, isAuth } from '../../../../../utils/auth';

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

handler.get(async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findOne({ slug: req.query.slug });
    if (product) {
      res.json({
        success: true,
        payload: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
});

handler.patch(async (req, res) => {
  try {
    await db.connect();
    const editProduct = await Product.findOne({ slug: req.query.slug });
    if (editProduct) {
      editProduct.name = req.body.name;
      editProduct.slug = slug(req.body.name);
      editProduct.description = req.body.description;
      editProduct.category = req.body.category;
      editProduct.brand = req.body.brand;
      editProduct.price = req.body.price;
      editProduct.oldPrice = req.body.oldPrice;
      editProduct.color = req.body.color;
      editProduct.itemsInStock = req.body.itemsInStock;
      editProduct.images = req.body.images;
      await editProduct.save();
      res.status(202).json({ success: true, payload: editProduct });
      await db.disconnect();
    } else {
      await db.disconnect();
      res.status(404).json({ success: false, message: 'Product not found.' });
    }
  } catch (error: any) {
    await db.disconnect();
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: error.toString(),
      });
    }
  }
});

export default handler;
