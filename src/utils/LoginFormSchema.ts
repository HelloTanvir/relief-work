import * as yup from 'yup';

const schema = yup.object().shape({
    phone: yup.string().required('Phone number is required'),

    password: yup
        .string()
        .min(6, 'Password should be atleast 6 characters long')
        .required('Password is required'),
});

export default schema;
