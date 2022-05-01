import mongoose from 'mongoose';import { UserSchema } from '../utils/types';

const Users = new mongoose.Schema<UserSchema, mongoose.Model<UserSchema>>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      min: [2, 'Name is to short'],
      max: [25, 'Name maximum length is 25 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isAdmin: { type: Boolean, default: false },
    favoritesId: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', Users);

export default User;
