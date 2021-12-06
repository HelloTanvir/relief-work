import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup
        .string()
        .min(3, 'Name should be atleast 3 characters long')
        .required('Name is required'),

    email: yup.string().email().required('Email is required'),

    phone: yup.string().required('Phone number is required'),

    address: yup.string().required('Address is required'),

    password: yup
        .string()
        .min(6, 'Password should be atleast 6 characters long')
        .required('Password is required'),

    orgName: yup
        .string()
        .min(3, 'Organization name should be atleast 3 characters long')
        .required('Organization name is required'),

    website: yup.string().url('Website is not valid').required('Organization website is required'),

    role: yup.string().required('Role is required'),

    country: yup.string().required('Country is required'),

    orgAddress: yup.string().required('Address is required'),

    description: yup.string().required('Organization description is required'),
});

export default schema;
