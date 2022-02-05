import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';
import registerReducer from './registerSlice';
import stateReducer from './stateSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        project: projectReducer,
        state: stateReducer,
    },
});

export default store;

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof store.getState>;
