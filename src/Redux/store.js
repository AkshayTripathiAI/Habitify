import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import habitsReducer from './habitsSlice';

const rootReducer = combineReducers({
  habits: habitsReducer,
});

// Habits are saved to AsyncStorage (localStorage on web) and restored on launch.
const persistConfig = {
  key: 'habitify',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['habits'],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches actions that carry functions.
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
