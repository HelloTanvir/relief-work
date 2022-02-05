/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface State {
    isLoading?: boolean;
    title?: string;
}

const stateSlice = createSlice({
    name: 'state',
    initialState: {
        isLoading: false,
        title: '',
    },
    reducers: {
        setState: (
            state,
            action: {
                payload: State;
                type: string;
            }
        ) => {
            if (action.payload.isLoading) {
                state.isLoading = action.payload.isLoading;
            }

            if (action.payload.title) {
                state.title = action.payload.title;
            }
        },
    },
});

export const { setState } = stateSlice.actions;

const stateReducer = stateSlice.reducer;

export default stateReducer;
