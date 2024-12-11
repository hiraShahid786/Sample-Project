import React, { useState, useEffect } from 'react';

const ExtraDetails = ({ userId }) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/extra-details/${userId}`);
                const data = await response.json();
                setDetails(data[0]); // Assuming one record per user
            } catch (error) {
                console.error('Error fetching extra details:', error);
            }
        };

        if (userId) {
            fetchDetails();
        }
    }, [userId]);

    if (!details) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-sm">Loading extra details...</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                Extra Details for {details.user_name}
            </h2>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Gender:</span>
                    <span className="text-gray-900">{details.gender}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Comments:</span>
                    <span className="text-gray-900">{details.comments || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Status:</span>
                    <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                            details.status === 'Active'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-red-100 text-red-600'
                        }`}
                    >
                        {details.status}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">First Login:</span>
                    <span className="text-gray-900">
                        {new Date(details.first_login).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ExtraDetails;
