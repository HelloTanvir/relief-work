import * as yup from 'yup';

const schema = yup.object().shape({
    orgName: yup.string().required('Organization name is required'),

    status: yup.string().required('Project status is required'),

    title: yup.string().required('Project title is required'),

    description: yup.string().required('Project description is required'),

    district: yup.string().required('District is required'),

    thana: yup.string().required('Thana is required'),

    venue: yup.string().required('Venue is required'),

    eventStartDate: yup.string().required('Event start date is required'),
});

export default schema;
