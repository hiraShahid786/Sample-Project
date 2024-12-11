import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Home from './pages/home';
import Reports from './pages/Reports';
import Transactions from './pages/Transactions';

const App = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);

    return (
        <Router>
            <div className="flex h-screen">
                {/* Navbar */}
                <Navbar
                    isOpen={isNavbarOpen}
                    toggleNavbar={() => setIsNavbarOpen(!isNavbarOpen)}
                />

                {/* Content Area */}
                <div
                    className={`transition-all duration-300 ${
                        isNavbarOpen ? 'ml-72' : 'ml-0'
                    } flex-1 bg-gray-100`}
                >
                    {/* Header */}
                    <HeaderBar />

                    {/* Main Content */}
                    <div className="p-6">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/dashboard"
                                element={<Dashboard isNavbarOpen={isNavbarOpen} />}
                            />
                            <Route path="/transactions" element={<Transactions />} />
                            <Route path="/reports" element={<Reports />} />
                        </Routes>
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </Router>
    );
};

export default App;
