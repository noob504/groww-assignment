import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false, // to save non-serializable values like Date objects
  }),
});

// export const useAppDispatch = () => useDispatch();
// export const persistor = persistStore(store);
export default store;
