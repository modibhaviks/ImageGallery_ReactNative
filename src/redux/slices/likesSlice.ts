import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LikesState = {
  likedImages: string[];
};

const initialState: LikesState = {
  likedImages: [],
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const imageId = action.payload;

      const alreadyLiked = state.likedImages.includes(imageId);

      if (alreadyLiked) {
        state.likedImages = state.likedImages.filter(id => id !== imageId);
      } else {
        state.likedImages.push(imageId);
      }
    },
  },
});

export const { toggleLike } = likesSlice.actions;

export default likesSlice.reducer;
