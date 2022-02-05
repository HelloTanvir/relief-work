/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteProject, getProjects } from '../../apiHandlers/project';
import BenefisiariesList from '../../components/BenefisiariesList';
import { setProject } from '../../store/projectSlice';
import { setState } from '../../store/stateSlice';

export interface Project {
    _id: string;
    org: {
        name: string;
    };
    status: string;
    title: string;
    description: string;
    district: string;
    thana: string;
    venue: string;
    eventStartDate: string;
    eventEndDate: string;
    benefisiaries: {
        _id: string;
        status: string;
        name: string;
        occupasion: string;
    }[];
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const token = req.cookies.relief_work_token || '';

    const { success, projects } = await getProjects(token);

    if (!success) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { projects },
    };
};

const Projects = ({ projects }: { projects: Project[] }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setState({ title: 'Projects' }));
    }, [dispatch]);

    const deleteHandler = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) {
            return;
        }

        dispatch(setState({ isLoading: true }));

        const { success } = await deleteProject(id);

        if (success) {
            // re render the page to see the update
            router.replace(router.asPath);
        }

        dispatch(setState({ isLoading: false }));
    };

    const updateHandler = (id: string) => {
        const project = projects.find((p) => p._id === id);

        if (!project) {
            toast.error('No product id found', { autoClose: 3000 });
            return;
        }

        dispatch(setProject(project));
        router.push(`${router.asPath}/${id}`);
    };

    return (
        <div className="flex flex-col items-center flex-1 gap-5 py-5 overflow-y-auto">
            {projects.map((project) => (
                <div
                    key={project._id}
                    className="flex flex-col max-w-xl gap-2 px-5 py-6 bg-white divide-y shadow-md rounded-xl md:w-screen"
                >
                    <div className="flex flex-col w-full gap-3 md:gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-lg font-medium tracking-wide">
                                {project.title}
                            </span>
                            <span className="text-sm tracking-wide text-gray-500">
                                ({project.status})
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-gray-700">Organization :</span>
                            <span className="text-sm tracking-wide text-gray-500">
                                {project.org?.name}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-gray-700">District :</span>
                            <span className="text-sm tracking-wide text-gray-500">
                                {project.district}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-gray-700">Thana :</span>
                            <span className="text-sm tracking-wide text-gray-500">
                                {project.thana}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-gray-700">Venue :</span>
                            <span className="text-sm tracking-wide text-gray-500">
                                {project.venue}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-gray-700">Event Start Date :</span>
                            <span className="text-sm tracking-wide text-gray-500">
                                {new Date(project.eventStartDate).toLocaleDateString('en-US')}
                            </span>
                        </div>

                        {project.eventEndDate ? (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium text-gray-700">Event End Date :</span>
                                <span className="text-sm tracking-wide text-gray-500">
                                    {new Date(project.eventEndDate).toLocaleDateString('en-US')}
                                </span>
                            </div>
                        ) : null}

                        <BenefisiariesList benefisiaries={project.benefisiaries} />

                        <p className="text-sm font-medium text-gray-900">{project.description}</p>
                    </div>

                    {/* update and delete buttons */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            type="button"
                            className="flex items-center gap-1 px-2 py-1 text-xs text-green-600 transition-all duration-75 rounded-md shadow-md hover:shadow"
                            onClick={() => updateHandler(project._id)}
                        >
                            <FiEdit />
                            update
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-1 px-2 text-xs text-red-600 transition-all duration-75 rounded-md shadow-md hover:shadow"
                            onClick={() => deleteHandler(project._id)}
                        >
                            <MdDeleteForever />
                            delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Projects;
