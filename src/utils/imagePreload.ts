import { Image } from 'react-native';

export async function preloadAndNavigate(
  imageUrl: string,
  navigate: () => void,
) {
  try {
    await Image.prefetch(imageUrl);
  } catch (e) {
    console.log('Prefetch failed:', e);
  }

  navigate();
}
