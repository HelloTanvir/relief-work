import beneficiaries from '../data/beneficiaries';

export const getBeneficiaries = async () =>
    // try {
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/beneficiary`);
    //     const beneficiaries = res.data;
    //     return { success: true, beneficiaries };
    // } catch (err) {
    //     return { success: false, beneficiaries: [] };
    // }

    ({ success: true, beneficiaries });

export const getSingleBeneficiary = async (beneficiaryId: string) => {
    console.log({ beneficiaryId });
};

export const updateBeneficiary = async (token: string, beneficiaryId: string) => {
    console.log({ token, beneficiaryId });
};
