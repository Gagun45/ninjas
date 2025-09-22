import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { superpowersApi } from "./apis/superpowersApi";
import { superheroesApi } from "./apis/superheroesApi";

export const store = configureStore({
  reducer: {
    [superpowersApi.reducerPath]: superpowersApi.reducer,
    [superheroesApi.reducerPath]: superheroesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(superpowersApi.middleware)
      .concat(superheroesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
