export type GetPhotosQuery = {
  users: {
    name: string;
    albums: {
      photos: {
        id: string;
        title: string;
      }[];
    }[];
  }[];
};
