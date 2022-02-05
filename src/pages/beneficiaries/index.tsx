/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBeneficiaries } from '../../apiHandlers/beneficiary';
import { setState } from '../../store/stateSlice';

export interface Beneficiary {
    id: number;
    name: string;
    age: number;
    gender: string;
    occupation: string;
    district: string;
    thana: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { success, beneficiaries } = await getBeneficiaries();

    if (!success) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { beneficiaries },
    };
};

const Beneficiaries = ({ beneficiaries }: { beneficiaries: Beneficiary[] }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setState({ title: 'Beneficiaries' }));
    }, [dispatch]);

    const tableHeader = ['name', 'age', 'gender', 'occupation', 'district', 'thana'];

    return (
        <div className="flex flex-col md:my-5">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    {tableHeader.map((header) => (
                                        <th
                                            key={header}
                                            scope="col"
                                            className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {beneficiaries.map((beneficiary) => (
                                    <tr key={beneficiary.id} className="bg-white border-b">
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                            {beneficiary.name}
                                        </td>

                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                                            {beneficiary.age}
                                        </td>

                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                                            {beneficiary.gender}
                                        </td>

                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                                            {beneficiary.occupation}
                                        </td>

                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                                            {beneficiary.district}
                                        </td>

                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                                            {beneficiary.thana}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Beneficiaries;
