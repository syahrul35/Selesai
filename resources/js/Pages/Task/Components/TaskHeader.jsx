export default function TaskHeader({ onAddClick, onImportClick }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Left */}
            <div>
                <h2 className="text-xl font-bold text-gray-900">Task List</h2>
                <p className="text-xs text-gray-500 mt-0.5">Manage and monitor all your tasks here</p>
            </div>

            {/* Right */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Import Button */}
                <button
                    type="button"
                    onClick={onImportClick}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-2xs"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                    </svg>
                    Import File
                </button>

                {/* Add Task Button */}
                <button
                    type="button"
                    onClick={onAddClick}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Add Task
                </button>
            </div>
        </div>
    );
}

