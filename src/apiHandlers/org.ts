import axios from 'axios';

export const getOrgs = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/org`);
        const organizations = res.data;
        return { success: true, organizations };
    } catch (err) {
        return { success: false, organizations: [] };
    }
};

export const getSingleOrg = async (orgId: string) => {
    console.log({ orgId });
};

export const updateOrg = async (token: string, orgId: string) => {
    console.log({ token, orgId });
};
