import { ImageDetail } from '../types';

export const toImageDetail = (
  photo: { id: string; title: string },
  author: string,
): ImageDetail => ({
  id: photo.id,
  title: photo.title,
  imageUrl: `https://picsum.photos/seed/${photo.id}/800/600`,
  author: author ?? 'Unknown',
  description: `"${photo.title}" is part of the collection by ${
    author ?? 'an artist'
  }. This image showcases stunning visual composition.`,
  liked: false,
});
