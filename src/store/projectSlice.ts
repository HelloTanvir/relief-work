/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { Project } from '../pages/projects';

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        org: {
            name: '',
        },
        status: '',
        title: '',
        description: '',
        district: '',
        thana: '',
        venue: '',
        eventStartDate: '',
        eventEndDate: '',
        // benefisiaries: [],
    },
    reducers: {
        setProject: (
            state,
            action: {
                payload: Project;
                type: string;
            }
        ) => {
            state.org.name = action.payload.org.name;
            state.status = action.payload.status;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.district = action.payload.district;
            state.thana = action.payload.thana;
            state.venue = action.payload.venue;
            state.eventStartDate = action.payload.eventStartDate;
            state.eventEndDate = action.payload.eventEndDate;
        },
    },
});

export const { setProject } = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
