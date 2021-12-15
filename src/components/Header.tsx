import { Turn as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';

const Header = () => {
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {};

    return (
        <header className="flex flex-col px-10 py-2 text-gray-700 md:items-center md:justify-between md:flex-row md:px-20 md:py-3 shadow border-b">
            {/* logo and menu bar (on small device) */}
            <div className="flex items-center justify-between flex-1 md:flex-none">
                <Link href="/">Logo</Link>

                {/* hamburger */}
                <div className="md:hidden">
                    <Hamburger
                        toggled={open}
                        toggle={setOpen}
                        direction="right"
                        rounded
                        size={28}
                    />
                </div>
            </div>

            {/* tabs/navigations */}
            <nav
                className={`${
                    open ? 'flex' : 'hidden md:flex'
                } flex-col items-center gap-2 mt-2 md:gap-12 md:flex-row md:mt-0`}
            >
                <span className="w-full py-1 text-center transition-all duration-300 bg-gray-200 rounded-md md:py-0 md:w-auto md:bg-transparent hover:text-gray-400 hover:underline">
                    <Link href="/">Home</Link>
                </span>

                <span className="w-full py-1 text-center transition-all duration-300 bg-gray-200 rounded-md md:py-0 md:w-auto md:bg-transparent hover:text-gray-400 hover:underline">
                    <Link href="/about-us">About Us</Link>
                </span>

                <span className="w-full py-1 text-center transition-all duration-300 bg-gray-200 rounded-md md:py-0 md:w-auto md:bg-transparent hover:text-gray-400 hover:underline">
                    <Link href="/contact-us">Contact Us</Link>
                </span>
            </nav>

            {/* buttons */}
            <div
                className={`${
                    open ? 'flex' : 'hidden md:flex'
                } justify-center gap-5 pb-4 mt-4 md:gap-3 md:mt-0 md:pb-0`}
            >
                {/* btn-logout */}
                <button
                    type="button"
                    className="px-4 py-1 transition-all duration-300 bg-gray-700 text-white rounded-md hover:bg-gray-600 flex items-center gap-1"
                    onClick={handleLogout}
                >
                    <IoLogOutOutline />
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
