import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProject } from '../../apiHandlers/project';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Sidebar from '../../components/Sidebar';
import TextField from '../../components/TextField';
import { RootState } from '../../store/store';
import fields from '../../utils/ProjectFormFields';
import schema from '../../utils/ProjectFormSchema';

interface FormData {
    orgName: string;
    status: string;
    title: string;
    description: string;
    district: string;
    thana: string;
    venue: string;
    eventStartDate: string;
    eventEndDate: string;
}

const Projects = () => {
    const router = useRouter();

    const { id }: { id?: string } = router.query;

    const [isLoading, setIsLoading] = useState(false);

    const project = useSelector<RootState, RootState['project']>((state) => state.project);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            orgName: project.org.name,
            status: project.status,
            title: project.title,
            description: project.description,
            district: project.district,
            thana: project.thana,
            venue: project.venue,
            eventStartDate: project.eventStartDate,
            eventEndDate: project.eventEndDate,
        },
    });

    const submitForm = async (formData: FormData) => {
        if (!id) {
            toast.error('No product id found', { autoClose: 3000 });
            return;
        }

        const data: {
            org?: { name: string };
            status?: string;
            title?: string;
            description?: string;
            district?: string;
            thana?: string;
            venue?: string;
            eventStartDate?: string;
            eventEndDate?: string;
        } = {};

        // @ts-ignore
        const keys: (
            | 'org'
            | 'status'
            | 'title'
            | 'description'
            | 'district'
            | 'thana'
            | 'venue'
            | 'eventStartDate'
            | 'eventEndDate'
        )[] = Object.keys(project);

        keys.forEach((key) => {
            if (key === 'org' && formData.orgName && formData.orgName !== project.org.name) {
                data.org = { name: formData.orgName };
            } else if (key !== 'org' && formData[key] && formData[key] !== project[key]) {
                data[key] = formData[key];
            }
        });

        if (!Object.keys(data).length) {
            toast.warn('There is no change to update', { autoClose: 3000 });
            return;
        }

        setIsLoading(true);

        const { success } = await updateProject(id, data);

        setIsLoading(false);

        if (success) {
            router.push('/projects');
            toast.success('Updated successfully', { autoClose: 3000 });
        } else {
            toast.error('Update failed', { autoClose: 3000 });
        }
    };

    return (
        <div className="relative">
            <Head>
                <title>Relief Work | Project update</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* loader */}
            {isLoading ? <Loader /> : null}

            <Header />

            <main
                style={{ height: 'calc(100vh - 57px)' }}
                className="flex gap-2 md:gap-5 bg-gray-50"
            >
                <Sidebar />

                <div className="flex flex-col items-center flex-1 px-2 pt-6 pb-8 overflow-y-auto bg-white rounded-lg shadow-md md:px-8">
                    <form
                        className="flex flex-col items-end gap-5"
                        onSubmit={handleSubmit(submitForm)}
                    >
                        <div>
                            {fields.map((field) => (
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

                        <button
                            type="submit"
                            className="px-4 py-2 text-xs font-semibold text-gray-100 bg-green-700 rounded-md md:text-sm hover:text-white hover:bg-green-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Projects;
