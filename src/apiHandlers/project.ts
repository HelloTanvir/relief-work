import axios from 'axios';

export const getProjects = async (token: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/project`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { projects } = res.data;
        return { success: true, projects };
    } catch (err) {
        return { success: false, projects: [] };
    }
};

export const getSingleProject = async (projectId: string) => {
    console.log({ projectId });
};

export const updateProject = async (projectId: string) => {
    console.log({ projectId });
};

export const deleteProject = async (projectId: string) => {
    try {
        const {
            data: { token },
        } = await axios.get('/api/get-token');

        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API}/project/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return { success: true, deletedProject: res.data };
    } catch (err) {
        return { success: false, deletedProject: {} };
    }
};
