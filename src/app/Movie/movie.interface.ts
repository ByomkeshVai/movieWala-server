export interface TMovie {
  title: string;
  description: string;
  category: string;
  quality: 'high' | 'low' | 'medium';
  genres: string[];
  languages: string[];
  tags: string[];
  cast: string[];
  movieLink: string[];
  trailerLink: string;
  isDeleted?: boolean;
  posterImage?: string;
}
