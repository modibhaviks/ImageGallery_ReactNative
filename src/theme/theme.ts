const Colors = {
  baseBackground: '#F5F3FF',

  textInput: {
    border: '#C8C2E0',
    background: '#c0d5ddff',
  },
  buttonBackground: {
    primary: '#7C4DFF',
    secondary: '#D1C4E9',
  },
  card: '#cdbdfbff',
  border: '#C8C2E0',
  backIconColor: '#2C1A5E',
};

// Text Styles
export const TextStyles = {
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C1A5E',
  },

  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C1A5E',
  },

  body: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5D4B8B',
  },

  caption: {
    fontSize: 12,
    color: '#5D4B8B',
  },

  buttonTitle: {
    fontSize: 16,
    color: '#F5F3FF',
  },

  inputPlaceholder: {
    color: '#5D4B8B',
  },
} as const;

export default Colors;
