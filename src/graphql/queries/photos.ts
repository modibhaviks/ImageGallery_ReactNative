import { gql } from '@apollo/client';

export const GET_PHOTOS = gql`
  query GetPhotos {
    users {
      name
      albums {
        photos {
          id
          title
        }
      }
    }
  }
`;
