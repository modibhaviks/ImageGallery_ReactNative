import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageDetail, RootStackParamList } from '../../types';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import { useNavigation } from '@react-navigation/native';
import { usePhotos } from '../../hooks/usePhotos';
import ScreenContainer from '../../components/ScreenContainer';
import CardImage from './CardImage';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextStyles } from '../../theme/theme';

import { RootState } from '../../redux/store';
import { toggleLike } from '../../redux/slices/likesSlice';
import { preloadAndNavigate } from '../../utils/imagePreload';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  typeof ScreenIdentifier.homeScreen
>;

function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<Nav>();
  const { images, loading, error, refetch } = usePhotos();
  const [refreshing, setRefreshing] = useState(false);

  const likedImages = useSelector(
    (state: RootState) => state.likes.likedImages,
  );

  const handleImagePress = (image: ImageDetail) => {
    preloadAndNavigate(image.imageUrl, () => {
      navigation.navigate(ScreenIdentifier.imageDetailScreen, {
        imageDetail: image,
      });
    });
  };

  const handleImageLike = (image: ImageDetail) => {
    dispatch(toggleLike(image.id));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.replace(ScreenIdentifier.loginScreen);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons
            name={'log-out-outline'}
            size={24}
            color={TextStyles.body.color}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
        renderItem={({ item }) => {
          const isLiked = likedImages.includes(item.id);
          return (
            <CardImage
              item={item}
              liked={isLiked}
              onPress={() => handleImagePress(item)}
              onLike={() => handleImageLike(item)}
            />
          );
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ScreenContainer>
  );
}

export default HomeScreen;
