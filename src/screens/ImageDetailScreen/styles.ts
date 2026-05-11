import { StyleSheet } from 'react-native';
import Colors from '../../theme/theme';

export default StyleSheet.create({
  imageContainer: {
    borderRadius: 12,
    paddingTop: 16,
    paddingBottom: 16,
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
    aspectRatio: 1.5,
  },
});
