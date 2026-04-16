import { Link, usePage } from "@inertiajs/react";

export default function TaskTable({ tasks, onEdit }) {
    const { auth } = usePage().props;

    const getStatusBadge = (status) => {
        switch (status) {
            case "done":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800";
            case "medium":
                return "bg-yellow-100 text-yellow-800";
            case "low":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getDueDateStyle = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);

        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        if (due < today) {
            return "text-red-600 font-semibold"; // overdue
        }

        if (due.getTime() === today.getTime()) {
            return "text-yellow-600 font-semibold"; // today
        }

        return "";
    };

    return (
        <div className="overflow-x-auto">
            <div className="max-h-[400px] overflow-y-auto">
                <table className="border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Project</th>
                            <th className="px-4 py-2 text-left">Assigned</th>
                            <th className="px-4 py-2 text-left">Due Date</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Priority</th>
                            <th className="px-4 py-2 text-left">Time Notif</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {tasks.data.length > 0 ? (
                            tasks.data.map((task) => (
                                <tr key={task.id}>
                                    {/* Title */}
                                    <td className="px-4 py-2">{task.title}</td>

                                    {/* Project */}
                                    <td className="px-4 py-2">
                                        {task.project ? (
                                            <span className="px-2 py-1 text-gray-800 rounded">
                                                {task.project.name}
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                                                No Project
                                            </span>
                                        )}
                                    </td>

                                    {/* Assigned User */}
                                    <td className="px-4 py-2">
                                        {task.assigned_user ? (
                                            <span className="px-2 py-1 text-gray-800 rounded">
                                                {task.assigned_user.name}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">Unassigned</span>
                                        )}
                                    </td>

                                    {/* Due Date */}
                                    <td
                                        className={`px-4 py-2 ${getDueDateStyle(task.due_date)}`}
                                    >
                                        {new Date(task.due_date).toLocaleDateString(
                                            "id-ID",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            },
                                        )}
                                    </td>

                                    {/* Priority */}
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded text-sm ${getPriorityBadge(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </td>

                                    {/* Time Notif */}
                                    <td className="px-4 py-2">{task.time_notif?.slice(0,5)}</td>

                                    {/* Status */}
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${getStatusBadge(task.status)}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    {task.user_id === auth.user.id && (
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col sm:flex-row gap-2 sm:justify-center">
                                                <button
                                                    onClick={() => onEdit(task)}
                                                    className=" w-full sm:w-auto px-3 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-amber-400"
                                                >
                                                    Edit
                                                </button>

                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={route('tasks.destroy', task.id)}
                                                    className=" w-full sm:w-auto px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-400
                                                    "
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </td>
                                    )}
                                        <td className="px-4 py-3 text-center text-gray-400">
                                            -
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
                                        <span>No Tasks Yet</span>
                                        <span className="text-sm">
                                            Click "+ Add Task" to start
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
