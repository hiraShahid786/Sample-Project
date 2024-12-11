import React from 'react';
import DataTable from '../components/DataTable';

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Content */}
            <div className="flex-1">
                <div className="p-4">
                    <DataTable />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
