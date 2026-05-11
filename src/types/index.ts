export type ImageDetail = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  liked: boolean | false;
};

export type RootStackParamList = {
  registrationScreen: undefined;
  loginScreen: undefined;
  homeScreen: undefined;
  imageDetailScreen: { imageDetail: ImageDetail };
  deviceDetailsScreen: undefined;
};
