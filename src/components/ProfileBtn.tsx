import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { IoLogOutOutline } from 'react-icons/io5';
import { logOutUser } from '../apiHandlers/auth';

const ProfileBtn = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await logOutUser();
        router.push('/login');
    };

    return (
        <Menu as="div" className="relative">
            <div>
                <Menu.Button className="flex items-center px-4 py-2 gap-2 text-xs font-medium tracking-wider text-white bg-gray-700 rounded-md  hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all duration-300">
                    <AiOutlineUser />
                    Profile
                    <BsChevronDown />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 md:left-auto md:right-0 w-max md:w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={`${
                                        active ? 'bg-gray-300 text-white' : 'text-gray-900'
                                    } transition-all duration-300 flex rounded-md items-center gap-1 px-2 py-2 text-xs md:text-sm w-full`}
                                    onClick={handleLogout}
                                >
                                    <IoLogOutOutline />
                                    Logout
                                </button>
                            )}
                        </Menu.Item>
                    </div>

                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={`${
                                        active ? 'bg-gray-300 text-white' : 'text-gray-900'
                                    } transition-all duration-300 flex rounded-md items-center gap-1 px-2 py-2 text-xs md:text-sm w-full`}
                                >
                                    <FiEdit />
                                    Update Organization
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default ProfileBtn;
