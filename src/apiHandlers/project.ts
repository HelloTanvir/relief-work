import axios from 'axios';

export const createProject = async (data: any) => {
    try {
        const {
            data: { token },
        } = await axios.get('/api/get-token');

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/project`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return { success: true, createdProject: res.data };
    } catch (err) {
        return { success: false, createdProject: {} };
    }
};

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

export const updateProject = async (projectId: string, data: any) => {
    try {
        const {
            data: { token },
        } = await axios.get('/api/get-token');

        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API}/project/${projectId}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return { success: true, updatedProject: res.data };
    } catch (err) {
        return { success: false, updatedProject: {} };
    }
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
