import { Link, router, usePage } from "@inertiajs/react";
import LateTaskModal from "./LateTaskModal";
import { useState } from "react";

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

    // late task modal state
    const [showLateModal, setShowLateModal] = useState(false);
    const [taskToConfirm, setTaskToConfirm] = useState(null);

    const isOverdue = (dueDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(dueDate);
        return due < today;
    };

    const handleDoneClick = (task) => {
        if (isOverdue(task.due_at)) {
            setTaskToConfirm(task);
            setShowLateModal(true);
        } else {
            // Jika tidak telat, langsung tembak route confirm
            router.post(route("tasks.confirm", task.id));
        }
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
                                            <span className="text-gray-400">
                                                Unassigned
                                            </span>
                                        )}
                                    </td>

                                    {/* Due Date */}
                                    <td
                                        className={`px-4 py-2 ${getDueDateStyle(task.due_at)}`}
                                    >
                                        {new Date(
                                            task.due_at,
                                        ).toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${getStatusBadge(task.status)}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>

                                    {/* Priority */}
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${getPriorityBadge(task.priority)}`}
                                        >
                                            {task.priority}
                                        </span>
                                    </td>

                                    {/* Time Notif */}
                                    <td className="px-4 py-2">
                                        {task.time_notif?.slice(0, 5)}
                                    </td>

                                    {/* Actions */}
                                    {task.status !== "done" &&
                                        task.user_id === auth.user.id && (
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-between min-w-[120px]">
                                                    {/* Tombol Done di Kiri */}
                                                    <button
                                                        onClick={() =>
                                                            handleDoneClick(
                                                                task,
                                                            )
                                                        }
                                                        className="px-4 py-2 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
                                                    >
                                                        Done
                                                    </button>

                                                    {/* Ikon Edit & Delete di Kanan (diberi gap) */}
                                                    <div className="flex items-center gap-3 ml-4">
                                                        <button
                                                            onClick={() =>
                                                                onEdit(task)
                                                            }
                                                            className="text-amber-500 hover:text-amber-600 transition"
                                                            title="Edit Task"
                                                        >
                                                            {/* Ganti dengan <PencilIcon className="w-5 h-5" /> jika pakai Heroicons */}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-5 h-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                />
                                                            </svg>
                                                        </button>

                                                        <Link
                                                            as="button"
                                                            method="delete"
                                                            href={route(
                                                                "tasks.destroy",
                                                                task.id,
                                                            )}
                                                            className="text-red-600 hover:text-red-700 transition"
                                                            title="Delete Task"
                                                        >
                                                            {/* Ganti dengan <TrashIcon className="w-5 h-5" /> jika pakai Heroicons */}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-5 h-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                        )}
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

            {taskToConfirm && (
                <LateTaskModal
                    show={showLateModal}
                    onClose={() => setShowLateModal(false)}
                    task={taskToConfirm}
                />
            )}
        </div>
    );
}
