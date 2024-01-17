import { Schema, model } from 'mongoose';
import { TGenre } from './genre.interface';

const genreSchema = new Schema<TGenre>(
  {
    genre: {
      type: String,
      required: [true, 'Genre Name is required'],
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Genre = model<TGenre>('Genre', genreSchema);

export default Genre;
