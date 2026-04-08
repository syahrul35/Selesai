import { useState } from "react";
import { router } from "@inertiajs/react";

export default function TaskHeader({ onAddClick }) {
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select an Excel file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        router.post(route("tasks.import"), formData, {
            forceFormData: true,
            onSuccess: () => {
                alert("Data successfully imported!");
            },
        });
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Left */}
            <h2 className="text-lg font-semibold">Task List</h2>

            {/* Right */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Add Task */}
                <button
                    onClick={onAddClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    + Add Task
                </button>

                {/* Import */}
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2"
                >
                    <label className="px-3 py-2 bg-gray-100 border rounded cursor-pointer">
                        📂 File
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="hidden"
                        />
                    </label>

                    <button className="px-4 py-2 bg-green-600 text-white rounded">
                        Import
                    </button>
                </form>
            </div>
        </div>
    );
}
