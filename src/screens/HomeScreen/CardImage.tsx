import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { rtl } from '../../theme/rtlStyles';

const CardImage = ({ item, style, onPress, onLike, liked }: any) => {
  const heartScale = React.useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    onLike();
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity
        style={[styles.card, style]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <FadeImage uri={item.imageUrl} />

        <View style={styles.content}>
          <Text
            style={[styles.title, { textAlign: rtl.textAlign }]}
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <Text
            style={[styles.subtitle, { textAlign: rtl.textAlign }]}
            numberOfLines={1}
          >
            {item.author}
          </Text>

          <TouchableOpacity onPress={handleLike}>
            <Animated.View
              style={{
                transform: [{ scale: heartScale }],
                alignSelf: 'flex-start',
              }}
            >
              <Text style={styles.likes}>{liked ? '❤️' : '🤍'}</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

function FadeImage({ uri }: { uri: string }) {
  const opacity = useRef(new Animated.Value(0)).current;

  return (
    <Animated.Image
      source={{ uri }}
      style={{
        width: '100%',
        height: 150,
        opacity,
      }}
      resizeMode="cover"
      onLoad={() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }}
    />
  );
}

export default CardImage;

const styles = StyleSheet.create({
  shadowContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 3,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 150,
  },

  content: {
    padding: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },

  likes: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },
});
