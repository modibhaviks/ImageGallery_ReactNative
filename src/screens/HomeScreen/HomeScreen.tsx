import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageDetail, RootStackParamList } from '../../types';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import { useNavigation } from '@react-navigation/native';
import { usePhotos } from '../../hooks/usePhotos';
import ScreenContainer from '../../components/ScreenContainer';
import CardImage from './CardImage';
import styles from './styles';
import { useCallback, useState } from 'react';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.homeScreen
>;

function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { images, loading, error, refetch } = usePhotos();
  const [refreshing, setRefreshing] = useState(false);

  function handleImagePress(image: ImageDetail) {
    navigation.navigate(ScreenIdentifier.imageDetailScreen, {
      imageDetail: image,
    });
  }

  function handleImageLike(image: ImageDetail) {}

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (e) {
      console.log('Refresh error:', e);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

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
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ScreenContainer>
  );
}

export default HomeScreen;
