import { useQuery } from '@apollo/client/react';
import { GET_PHOTOS } from '../graphql/queries/photos';
import { GetPhotosQuery } from '../graphql/types/types';
import { toImageDetail } from '../mappers/toImageDetail';

export const usePhotos = () => {
  const { data, loading, error, refetch } =
    useQuery<GetPhotosQuery>(GET_PHOTOS);

  const images =
    data?.users.flatMap(user =>
      user.albums.flatMap(album =>
        album.photos.map(photo => toImageDetail(photo, user.name)),
      ),
    ) ?? [];

  return { images, loading, error, refetch };
};
