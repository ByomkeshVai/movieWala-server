import { Schema, model } from 'mongoose';
import { TMovie } from './movie.interface';

const movieSchema = new Schema<TMovie>({
  title: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  quality: { type: String, enum: ['high', 'low', 'medium'], required: true },
  genres: { type: [Schema.Types.ObjectId], required: true, ref: 'Genre' },
  languages: { type: [Schema.Types.ObjectId], required: true, ref: 'Language' },
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
