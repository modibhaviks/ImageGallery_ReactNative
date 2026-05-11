import { Animated, Image, Text, View } from 'react-native';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenIdentifier } from '../../utils/navigationConstants';
import ScreenContainer from '../../components/ScreenContainer';
import { TextStyles } from '../../theme/theme';
import styles from './styles';
import React, { useRef } from 'react';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof ScreenIdentifier.imageDetailScreen
>;

function ImageDetailScreen({ route }: Props) {
  const { imageDetail } = route.params;

  return (
    <ScreenContainer>
      <Text style={[TextStyles.title, { textAlign: 'center' }]}>
        {imageDetail.title}
      </Text>
      <View style={styles.imageContainer}>
        <View style={styles.card}>
          <ZoomFadeImage uri={imageDetail.imageUrl} />
        </View>
      </View>

      <Text style={[TextStyles.caption, { textAlign: 'right' }]}>
        Author: {imageDetail.author}
      </Text>
    </ScreenContainer>
  );
}

const ZoomFadeImage = ({ uri }: { uri: string }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1.1)).current;

  return (
    <Animated.Image
      source={{ uri }}
      style={{
        width: '100%',
        aspectRatio: 1.5,
        opacity,
        transform: [{ scale }],
      }}
      resizeMode="cover"
      onLoad={() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
      }}
    />
  );
};

export default ImageDetailScreen;
