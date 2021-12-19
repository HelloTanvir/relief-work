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

export const getSingleProject = async (token: string, orgId: string) => {
    console.log({ token, orgId });
};

export const updateProject = async (token: string, orgId: string) => {
    console.log({ token, orgId });
};

export const deleteProject = async (token: string, orgId: string) => {
    console.log({ token, orgId });
};
