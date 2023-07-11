// import { configureStore } from '@reduxjs/toolkit';
// import { contactsSlice } from './contactsSlice';
// import { filterSlice } from './filtersSlice';

// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REHYDRATE,
//   DEFAULT_VERSION,
// } from 'redux-persist'
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedContactsReducer = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );

// export const store = configureStore({
//   reducer: {
//     contacts: persistedContactsReducer,
//     filters: filterSlice,
//   },
//   middleware(getDefaultmiddleware) {
//     return getDefaultmiddleware({
//       serializableCheck: {
//         ignoreActions: [
//           FLUSH,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REHYDRATE,
//           DEFAULT_VERSION,
//         ],
//       },
//     });
//   },
// });

// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import { filterSlice } from './filterSlice';
import { contactsApi } from './contactsSlice';
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import { contactsSlice } from './contactsSlice';

// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedContactReducer = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );

export const store = configureStore({
  reducer: {
    // contacts: persistedContactReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),
    getDefaultMiddleware().concat(contactsApi.middleware),
});

// export const persistor = persistStore(store);
