import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/TextField';
import { setPersonalInfo } from '../../store/registerSlice';
import { RootState } from '../../store/store';
import fields from '../../utils/RegFormFields';
import schema from '../../utils/RegFormSchema';

interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    password: string;
}

const Register: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const registrationData = useSelector<RootState, RootState['register']>(
        (state) => state.register
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema.personalInfo),
        defaultValues: {
            name: registrationData.name,
            email: registrationData.email,
            phone: registrationData.phone,
            address: registrationData.address,
            role: registrationData.org.role,
            password: registrationData.password,
        },
    });

    // if org info form is not filled up, redirect to org info form
    useEffect(() => {
        const orgInfoValues = Object.values(registrationData.org);
        orgInfoValues
            .filter((v, i) => i !== orgInfoValues.length - 1) // filtering because role is not in the array now
            .forEach((field) => {
                if (!field) {
                    router.push('/register/organization-info');
                }
            });
    }, [router, registrationData.org]);

    const submitForm = (data: FormData) => {
        dispatch(setPersonalInfo(data));
        router.push('/register/review');
    };

    return (
        <div>
            <Head>
                <title>Relief Work | Registration</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main
                className="flex items-center justify-center min-h-screen py-12 md:py-0"
                style={{ backgroundImage: 'url("/background.jpg")' }}
            >
                <div className="flex flex-col items-center px-8 pt-6 pb-8 bg-white rounded-lg shadow-md">
                    {/* form header */}
                    <h1 className="mb-6 text-2xl font-medium">Register an account</h1>

                    {/* form body */}
                    <form
                        className="flex flex-col items-end gap-5"
                        onSubmit={handleSubmit(submitForm)}
                    >
                        <div>
                            <h3 className="-mb-2 text-xs italic text-gray-400">
                                Personal Information
                            </h3>

                            {fields.personalInfo.map((field) => (
                                <TextField
                                    key={field.name}
                                    label={field.label}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    className="mt-4 md:w-96"
                                    // @ts-ignore
                                    error={errors[field.name]?.message}
                                    register={register}
                                />
                            ))}
                        </div>

                        <div className="flex gap-2 mt-3 md:gap-4 md:mt-0">
                            <button
                                type="button"
                                onClick={() => {
                                    router.push('/register/organization-info');
                                }}
                                className="px-4 py-2 text-base font-semibold text-gray-100 bg-green-700 rounded-md hover:text-white hover:bg-green-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
                            >
                                Previous
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 text-base font-semibold text-gray-100 bg-green-700 rounded-md hover:text-white hover:bg-green-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
                            >
                                Review
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Register;
