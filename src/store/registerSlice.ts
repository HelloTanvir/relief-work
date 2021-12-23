/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
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
            country: '',
            address: '',
            description: '',
            role: '',
        },
    },
    reducers: {
        setOrgInfo: (
            state,
            action: {
                payload: {
                    orgName: string;
                    website: string;
                    country: string;
                    orgAddress: string;
                    description: string;
                };
                type: string;
            }
        ) => {
            state.org.name = action.payload.orgName;
            state.org.website = action.payload.website;
            state.org.country = action.payload.country;
            state.org.address = action.payload.orgAddress;
            state.org.description = action.payload.description;
        },

        setPersonalInfo: (
            state,
            action: {
                payload: {
                    name: string;
                    email: string;
                    phone: string;
                    address: string;
                    role: string;
                    password: string;
                };
                type: string;
            }
        ) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.address = action.payload.address;
            state.org.role = action.payload.role;
            state.password = action.payload.password;
        },
    },
});

export const { setOrgInfo, setPersonalInfo } = registerSlice.actions;

const registerReducer = registerSlice.reducer;

export default registerReducer;
