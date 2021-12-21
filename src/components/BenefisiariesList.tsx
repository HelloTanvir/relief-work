import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';
import { AiOutlineOrderedList } from 'react-icons/ai';

interface Props {
    benefisiaries: {
        _id: string;
        status: string;
        name: string;
        occupasion: string;
    }[];
}

const BenefisiariesList: FC<Props> = ({ benefisiaries }) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="flex items-center gap-2 px-4 py-1 text-white transition-all duration-300 bg-gray-700 rounded-md hover:bg-gray-600 text-sm tracking-wide"
                >
                    <AiOutlineOrderedList />
                    Benefisiaries
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Benefisiaries List
                                </Dialog.Title>
                                <div className="mt-2">
                                    {benefisiaries.map((benefisiary) => (
                                        <div
                                            // eslint-disable-next-line no-underscore-dangle
                                            key={benefisiary._id}
                                            className="flex flex-col max-w-xl gap-3 px-5 py-2 bg-gray-200 shadow-md md:gap-1 rounded-xl"
                                        >
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-lg font-medium tracking-wide">
                                                    {benefisiary.name}
                                                </span>
                                                <span className="text-sm tracking-wide text-gray-500">
                                                    ({benefisiary.status})
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-medium text-gray-700">
                                                    occupasion :
                                                </span>
                                                <span className="text-sm tracking-wide text-gray-500">
                                                    {benefisiary.occupasion}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default BenefisiariesList;
