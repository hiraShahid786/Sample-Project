import { Link } from 'react-router-dom';

const HeaderBar = () => {
    return (
        <header className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo from public folder */}
                <div className="flex items-center space-x-3">
                    <img
                        src="/Images/logo.jpg"
                        alt="Client Logo"
                        className="h-10 w-10 rounded-full"
                    />
                    <span className="text-2xl font-bold text-white">ClientName</span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className="text-white hover:text-blue-200 font-medium transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-white hover:text-blue-200 font-medium transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        to="/services"
                        className="text-white hover:text-blue-200 font-medium transition-colors"
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className="text-white hover:text-blue-200 font-medium transition-colors"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Search and User Actions */}
                <div className="flex items-center space-x-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none shadow-sm"
                        />
                        <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            🔍
                        </button>
                    </div>

                    {/* User Profile/Actions */}
                    <div className="relative group">
                        <button className="text-white text-lg">☰</button>
                        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg hidden group-hover:block">
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                                Settings
                            </Link>
                            <Link
                                to="/logout"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderBar;
