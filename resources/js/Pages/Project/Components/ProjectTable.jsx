import { Link } from "@inertiajs/react";

export default function ProjectTable({ projects, onEdit }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-center">Name</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-center">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <tr key={project.id}>
                                {/* Name */}
                                <td className="px-4 py-2 w-3/4">
                                    {project.name}
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-2 w-1/4%">
                                    <div className="flex flex-col sm:flex-row gap-2 sm:justify-center">
                                        <button
                                            onClick={() => onEdit(project)}
                                            className=" w-full sm:w-auto px-3 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-amber-400"
                                        >
                                            Edit
                                        </button>

                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "projects.destroy",
                                                project.id,
                                            )}
                                            className="w-full sm:w-auto px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-400"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="px-4 py-6 text-center text-gray-500"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span>No Projects Yet</span>
                                    <span className="text-sm">
                                        Click "+ Add Project" to start
                                    </span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
