import { Link } from "@inertiajs/react";

export default function ProjectTable({ projects, onEdit }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-center">Name</th>
                        <th>Progress</th>
                        <th>Total Task</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-center">
                    {projects.length > 0 ? (
                        projects.map((project) => {
                            const isOwner = project.members?.some(
                                (member) =>
                                    member.id === auth.user.id &&
                                    member.pivot?.role === "owner"
                            );

                            return (
                                <tr key={project.id}>
                                    {/* Name */}
                                    <td>
                                        <Link href={route("projects.show", project.id)}>
                                            {project.name}
                                        </Link>
                                    </td>

                                    {/* Progress */}
                                    <td>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{
                                                    width: `${project.progress}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm">
                                            {project.progress}%
                                        </span>
                                    </td>

                                    {/* Total Tasks */}
                                    <td>{project.total_tasks}</td>

                                    {/* Actions */}
                                    <td className="px-4 py-2 w-1/4%">
                                        <div className="flex flex-col sm:flex-row gap-2 sm:justify-center">
                                            {isOwner && (
                                                <>      
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
                                                </>
                                            )}

                                            <Link
                                                href={route(
                                                    "projects.show",
                                                    project.id,
                                                )}
                                                className="w-full sm:w-auto px-3 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-sky-400"
                                            >
                                                Show
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
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
