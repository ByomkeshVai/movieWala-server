import { Schema, model } from 'mongoose';
import { TMovie } from './movie.interface';

const movieSchema = new Schema<TMovie>({
  title: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, ref: 'Category' },
  releaseYear: { type: String, required: true },
  rating: { type: String, required: true },
  stars: { type: [String], required: true },
  quality: {
    type: String,
    enum: ['high', 'low', 'medium'],
    required: false,
    default: 'medium',
  },
  genre: { type: [String], required: true, ref: 'Genre' },
  language: { type: [String], required: true, ref: 'Language' },
  tags: { type: [String], required: true },
  movieLink: { type: [String], required: true },
  trailerLink: { type: String, required: true },
  posterImage: { type: String, required: false },
  isDeleted: { type: Boolean, default: false },
});

movieSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

movieSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Movie = model<TMovie>('Movie', movieSchema);
