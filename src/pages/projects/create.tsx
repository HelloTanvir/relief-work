import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createProject } from '../../apiHandlers/project';
import TextField from '../../components/TextField';
import { setState } from '../../store/stateSlice';
import fields from '../../utils/ProjectFormFields';
import { schemaForCreate as schema } from '../../utils/ProjectFormSchema';

interface FormData {
    orgName: string;
    title: string;
    description: string;
    district: string;
    thana: string;
    venue: string;
    eventStartDate: string;
    eventEndDate: string;
}

const CreateProject = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setState({ title: 'Project Create' }));
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (formData: FormData) => {
        dispatch(setState({ isLoading: true }));

        const data: {
            org: { name: string };
            title: string;
            description: string;
            district: string;
            thana: string;
            venue: string;
            eventStartDate: Date;
            eventEndDate?: Date;
        } = {
            org: { name: formData.orgName },
            title: formData.title,
            description: formData.description,
            district: formData.district,
            thana: formData.thana,
            venue: formData.venue,
            eventStartDate: new Date(formData.eventStartDate),
        };

        if (formData.eventEndDate) {
            data.eventEndDate = new Date(formData.eventEndDate);
        }

        const { success } = await createProject(data);

        dispatch(setState({ isLoading: false }));

        if (success) {
            router.push('/projects');
            toast.success('Created successfully', { autoClose: 3000 });
        } else {
            toast.error('Creation failed', { autoClose: 3000 });
        }
    };

    return (
        <div className="flex flex-col items-center flex-1 px-2 pt-6 pb-8 overflow-y-auto bg-white rounded-lg shadow-md md:px-8">
            <form className="flex flex-col items-end gap-5" onSubmit={handleSubmit(submitForm)}>
                <div>
                    {fields
                        .filter((field) => field.forCreate)
                        .map((field) => (
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
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateProject;
