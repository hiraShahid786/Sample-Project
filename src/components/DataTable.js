import React, { useState, useEffect } from "react";
import api from "../utils/api";
import ExtraDetails from "./ExtraDetails";

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users", {
        params: {
          search: searchTerm,
          page: currentPage,
          limit: usersPerPage,
        },
      });
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.post("/api/users", formData);
      fetchUsers();
      setFormData({ first_name: "", last_name: "", email: "", password: "" });
      setIsModalOpen(false);
      setIsConfirmationModalOpen(false);
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, currentPage]);

  return (
    <div className="flex gap-6 p-6">
      {/* Left Panel: Table and Add User */}
      <div className="w-2/3 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Users</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
          >
            Add User
          </button>
        </div>
        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded w-full max-w-sm focus:outline-blue-300 shadow-md"
          />
        </div>
        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 font-semibold text-sm">First Name</th>
                <th className="py-3 px-6 font-semibold text-sm">Last Name</th>
                <th className="py-3 px-6 font-semibold text-sm">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`border-t cursor-pointer ${
                    selectedUserId === user.id ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <td className="py-3 px-6">{user.first_name}</td>
                  <td className="py-3 px-6">{user.last_name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(totalUsers / usersPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>

      {/* Right Panel: Extra Details */}
      <div className="w-1/3 bg-gray-100 shadow-md rounded-lg p-6">
        {selectedUserId ? (
          <ExtraDetails userId={selectedUserId} />
        ) : (
          <p className="text-gray-600">Select a user to view extra details</p>
        )}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-semibold mb-4">Add User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsConfirmationModalOpen(true);
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border p-3 rounded-md w-full focus:outline-blue-300"
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border p-3 rounded-md w-full focus:outline-blue-300"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border p-3 rounded-md w-full focus:outline-blue-300"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="border p-3 rounded-md w-full focus:outline-blue-300"
                  required
                />
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
            <p>Are you sure you want to add this user?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsConfirmationModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
