import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: [true, 'Category Name is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Category = model<TCategory>('Category', categorySchema);

export default Category;
