import Link from 'next/link';

const Header = () => (
    <header className="flex items-center justify-between px-20 py-4 text-white bg-green-600">
        {/* logo */}
        <div>
            <Link href="/">Logo</Link>
        </div>

        {/* tabs/navigations */}
        <nav className="flex gap-12">
            <span className="transition-all duration-300 hover:text-gray-200 hover:underline">
                <Link href="/">Home</Link>
            </span>

            <span className="transition-all duration-300 hover:text-gray-200 hover:underline">
                <Link href="/about-us">About Us</Link>
            </span>

            <span className="transition-all duration-300 hover:text-gray-200 hover:underline">
                <Link href="/contact-us">Contact Us</Link>
            </span>
        </nav>

        {/* buttons */}
        <div className="flex gap-3">
            {/* btn-register */}
            <Link href="/organization-info" passHref>
                <button
                    type="button"
                    className="px-4 py-1 transition-all duration-300 bg-green-400 rounded-md hover:bg-purple-500"
                >
                    Register
                </button>
            </Link>

            {/* btn-login */}
            <Link href="/login" passHref>
                <button
                    type="button"
                    className="px-4 py-1 transition-all duration-300 bg-green-400 rounded-md hover:bg-purple-500"
                >
                    Login
                </button>
            </Link>
        </div>
    </header>
);

export default Header;
