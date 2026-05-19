import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';
import likesReducer from './slices/likesSlice';
import { encryptTransform } from 'redux-persist-transform-encrypt';

/// Store Auth in encrypted form and Likes in plain form (as they are not sensitive)
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  transforms: [
    encryptTransform({
      secretKey: 'imageGallery@#$xo93',
      onError: error => {
        console.log(error);
      },
    }),
  ],
};

const likesPersistConfig = {
  key: 'likes',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  likes: persistReducer(likesPersistConfig, likesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
