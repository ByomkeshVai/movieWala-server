import { Types } from 'mongoose';

export interface TMovie {
  title: string;
  description: string;
  category: Types.ObjectId;
  quality: 'high' | 'low' | 'medium';
  genres: Types.ObjectId[];
  languages: Types.ObjectId[];
  tags: string[];
  movieLink: string[] | string;
  trailerLink: string;
  isDeleted?: boolean;
}
