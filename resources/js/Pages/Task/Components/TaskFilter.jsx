import { router } from "@inertiajs/react";

export default function TaskFilter({ projects, filters, month, year }) {
    const handleProjectChange = (value) => {
        router.get(
            route("tasks.index"),
            {
                month,
                year,
                project_id: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Left - Filters */}
            <div className="flex items-center gap-3">
                {/* Project Filter */}
                <select
                    value={filters.project_id || ""}
                    onChange={(e) => handleProjectChange(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm min-w-28"
                >
                    <option value="">All Projects</option>
                    <option value="no_project">No Project</option>

                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>

                {/* 🚀 Future slot (belum aktif) */}
                {/* <select>status</select> */}
                {/* <input type="text" placeholder="Search..." /> */}
            </div>

            {/* Right - Month Navigation */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() =>
                        router.get(
                            route("tasks.index"),
                            {
                                month: month === 1 ? 12 : month - 1,
                                year: month === 1 ? year - 1 : year,
                                project_id: filters.project_id,
                            },
                            {
                                preserveState: true,
                                preserveScroll: true,
                            },
                        )
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    ←
                </button>

                <div className="font-semibold">
                    {new Date(year, month - 1).toLocaleString("id-ID", {
                        month: "long",
                        year: "numeric",
                    })}
                </div>

                <button
                    onClick={() =>
                        router.get(
                            route("tasks.index"),
                            {
                                month: month === 12 ? 1 : month + 1,
                                year: month === 12 ? year + 1 : year,
                                project_id: filters.project_id,
                            },
                            {
                                preserveState: true,
                                preserveScroll: true,
                            },
                        )
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    →
                </button>
            </div>
        </div>
    );
}
