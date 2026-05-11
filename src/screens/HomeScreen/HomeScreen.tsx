import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageDetail, RootStackParamList } from '../../types';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import { useNavigation } from '@react-navigation/native';
import { usePhotos } from '../../hooks/usePhotos';
import ScreenContainer from '../../components/ScreenContainer';
import CardImage from './CardImage';
import styles from './styles';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.homeScreen
>;

function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { images, loading, error } = usePhotos();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error loading images{error.message}</Text>
      </View>
    );
  }

  function handleImagePress(image: ImageDetail) {
    navigation.navigate(ScreenIdentifier.imageDetailScreen, {
      imageDetail: image,
    });
  }

  function handleImageLike(image: ImageDetail) {}

  return (
    <ScreenContainer>
      <FlatList
        data={images}
        numColumns={2}
        removeClippedSubviews
        windowSize={5}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        updateCellsBatchingPeriod={50}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item: ImageDetail) => item.id}
        renderItem={({ item }) => (
          <CardImage
            item={item}
            liked={false}
            onPress={() => handleImagePress(item)}
            onLike={() => handleImageLike(item)}
          />
        )}
      />
    </ScreenContainer>
  );
}

export default HomeScreen;
