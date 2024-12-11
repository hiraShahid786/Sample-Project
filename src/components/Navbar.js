import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = ({ isOpen, toggleNavbar }) => {
    const [activeMenu, setActiveMenu] = useState(null);

    const handleMenuToggle = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const menuItems = [
        {
            title: 'Production Control',
            subItems: ['Overview', 'Production Requests', 'Production Orders', 'Monitoring', 'Task Control'],
        },
        {
            title: 'Personnel Administration',
            subItems: ['Dashboard'],
        },
        {
            title: 'Liquidity Management',
            subItems: ['Cash Flow', 'Budget Forecasting', 'Financial Reporting'],
        },
        {
            title: 'Inventory Valuation',
            subItems: ['Reports', 'Transactions'],
        },
    ];    

    return (
        <div>
            <div
                className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-600 to-blue-500 text-white w-72 p-4 transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 z-20 shadow-lg`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Dashboard</h2>
                    <button
                        className="text-white hover:bg-blue-700 p-2 rounded"
                        onClick={toggleNavbar}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <ul className="space-y-4">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <div
                                className="flex justify-between items-center p-2 cursor-pointer hover:bg-blue-700 rounded-md"
                                onClick={() => handleMenuToggle(item.title)}
                            >
                                <span>{item.title}</span>
                                <span className={`transform transition-transform ${activeMenu === item.title ? 'rotate-90' : ''}`}>
                                    ▶
                                </span>
                            </div>
                            {activeMenu === item.title && (
                                <ul className="pl-4 mt-2 space-y-2 text-sm">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                to={`/${subItem.replace(/\s+/g, '-').toLowerCase()}`}
                                                className="block p-2 hover:bg-blue-700 rounded-md"
                                            >
                                                {subItem}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <button
                className={`fixed top-4 left-4 z-30 text-white bg-gradient-to-r from-blue-600 to-blue-400 p-3 rounded-full shadow-lg ${
                    isOpen ? 'hidden' : ''
                }`}
                onClick={toggleNavbar}
            >
                <AiOutlineMenu size={24} />
            </button>
        </div>
    );
};

export default Navbar;
