import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import TextField from '../../components/TextField';
import { setPersonalInfo } from '../../store/rootSlice';
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
    const registrationData = useSelector<RootState>((state) => state);

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data: FormData) => {
        try {
            dispatch(setPersonalInfo(data));

            setIsLoading(true);

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/auth/register`,
                registrationData
            );

            if (res) {
                setIsLoading(false);
                localStorage.setItem('token', res.data.token);
                router.push('/');
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    };

    return (
        <div>
            <Head>
                <title>Relief Work | Registration</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* loader */}
            {isLoading ? <Loader /> : null}

            <main className="flex justify-center py-9">
                <div className="flex flex-col items-center px-8 pt-6 pb-8 mb-4 rounded shadow-md">
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

                            {fields.orgInfo.map((field) => (
                                <TextField
                                    key={field.name}
                                    label={field.label}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    className="mt-4 md:w-96"
                                    error={errors[field.name]?.message}
                                    register={register}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 text-base font-semibold text-gray-100 bg-green-700 rounded-md hover:text-white hover:bg-green-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Register;