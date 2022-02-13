import mongoose from 'mongoose';

export interface ProductSchema {
  slug: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  oldPrice: number;
  color: string;
  images: string[];
  rating: number;
  salesCount?: number;
  itemsInStock: number;
  deliveryMethods?: string;
  reviews?: mongoose.Model<Reviews>;
  numReviews: number;
}

interface Reviews {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

const reviewSchema = new mongoose.Schema<Reviews, mongoose.Model<Reviews>>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Products = new mongoose.Schema<
  ProductSchema,
  mongoose.Model<ProductSchema>
>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Product name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    color: { type: String, required: true },
    images: {
      type: [String],
      required: [true, 'Images are not provided'],
    },

    rating: {
      type: Number,
      required: [true, 'Please set a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must can not be more than 5'],
      default: 0,
    },
    salesCount: {
      type: Number,
      default: 0,
    },

    itemsInStock: {
      type: Number,
      required: [true, 'In items in stock was not set'],
    },
    deliveryMethods: { type: String },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', Products);

export default Product;