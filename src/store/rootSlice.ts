/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        name: '',
        password: '',
        phone: '',
        email: '',
        address: '',
        org: {
            name: '',
            website: '',
            role: '',
            address: '',
            description: '',
            country: '',
        },
    },
    reducers: {
        setOrgInfo: (
            state,
            action: {
                payload: {
                    name: string;
                    website: string;
                    role: string;
                    address: string;
                    description: string;
                    country: string;
                };
                type: string;
            }
        ) => {
            state.org = action.payload;
        },
    },
});

export const { reducer } = rootSlice;

export const { setOrgInfo } = rootSlice.actions;
