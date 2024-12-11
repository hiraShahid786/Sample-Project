const FilterBar = () => {
    return (
        <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
            <input
                type="text"
                placeholder="Search..."
                className="border p-2 rounded w-full max-w-sm"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded ml-4">
                Search
            </button>
        </div>
    );
};

export default FilterBar;
