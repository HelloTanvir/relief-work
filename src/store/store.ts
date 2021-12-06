import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './rootSlice';

const store = configureStore({
    reducer,
});

export default store;

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof store.getState>;
