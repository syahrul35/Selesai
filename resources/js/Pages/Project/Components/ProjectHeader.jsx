export default function ProjectHeader({ onAddClick }) {

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Left */}
            <h2 className="text-lg font-semibold">Project List</h2>

            {/* Right */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Add Project */}
                <button
                    onClick={onAddClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    + Add Project
                </button>
            </div>
        </div>
    );
}
