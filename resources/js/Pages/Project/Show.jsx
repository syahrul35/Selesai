import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router, Link } from "@inertiajs/react";
import { useState } from "react";
import { InviteMemberModal } from "./Components/InviteMemberModal";
import TaskModal from "./Components/TaskModal";

export default function Show() {
    const { project, tasks, users, allUsers, auth } = usePage().props;

    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const filteredTasks = tasks.filter((task) => {
        return (
            (statusFilter === "" || task.status === statusFilter) &&
            (priorityFilter === "" || task.priority === priorityFilter)
        );
    });

    const currentUserId = auth.user.id;

    // Create a map of user IDs to user objects for easy lookup
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    // check user role in the project
    const myMember = project.members.find((m) => m.id === currentUserId);

    const isOwner = project.members?.some(
        (member) =>
            member.id === auth.user.id && member.pivot?.role === "owner",
    );

    const handleDelete = (id) => {
        if (confirm("Delete this task?")) {
            router.delete(route("tasks.destroy", id));
        }
    };

    const updateStatus = (id, status) => {
        router.put(route("tasks.update", id), { status });
    };

    // invite member
    const [showInvite, setShowInvite] = useState(false);

    // show add/edit task modal
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowTaskModal] = useState(false);

    // Handle close modal function to reset selectedTask
    const handleCloseModal = () => {
        setShowTaskModal(false);
        setSelectedTask(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {project.name}
                </h2>
            }
        >
            <Head title={project.name} />

            <div className="py-10">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        {/* Collaborators */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold">Members</h3>
                                {isOwner && (
                                    <>
                                        <button
                                            onClick={() => setShowInvite(true)}
                                            className="text-sm bg-emerald-600 text-white px-3 py-1 rounded"
                                        >
                                            + Add Member
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project.members?.map((member) => {
                                    const isOwner =
                                        member.pivot?.role === "owner";

                                    return (
                                        <div
                                            key={member.id}
                                            className={`px-3 py-1 rounded text-sm ${
                                                isOwner
                                                    ? "bg-rose-100 text-rose-700 font-semibold"
                                                    : "bg-emerald-100 text-emerald-700"
                                            }`}
                                        >
                                            {member.name}{" "}
                                            {isOwner && " (Owner)"}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <hr className="my-6" />

                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Task List
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Manage all tasks in this project
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {/* Status Filter */}
                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                    className="border rounded px-3 py-2 text-sm"
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="done">Done</option>
                                    <option value="failed">Failed</option>
                                </select>

                                {/* Priority Filter */}
                                <select
                                    value={priorityFilter}
                                    onChange={(e) =>
                                        setPriorityFilter(e.target.value)
                                    }
                                    className="border rounded px-3 py-2 text-sm"
                                >
                                    <option value="">All Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>

                                {/* Add Task */}
                                {isOwner && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setSelectedTask(null);
                                                setShowTaskModal(true);
                                            }}
                                            className="px-4 py-2 bg-blue-600 text-white rounded"
                                        >
                                            + Add Task
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Task List */}
                        {filteredTasks.length > 0 ? (
                            <div className="border rounded-lg overflow-hidden">
                                <div className="max-h-[400px] overflow-y-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 text-gray-600">
                                            <tr>
                                                <th className="text-left px-4 py-3">
                                                    Task
                                                </th>
                                                <th className="text-left px-4 py-3">
                                                    Assigned
                                                </th>
                                                <th className="text-left px-4 py-3">
                                                    Status
                                                </th>
                                                <th className="text-left px-4 py-3">
                                                    Priority
                                                </th>
                                                <th className="text-center px-4 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredTasks.map((task) => {
                                                const isMyTask =
                                                    task.assigned_to ===
                                                    currentUserId;

                                                return (
                                                    <tr
                                                        key={task.id}
                                                        className="border-t hover:bg-gray-50 transition"
                                                    >
                                                        {/* Task */}
                                                        <td className="px-4 py-3">
                                                            <div className="font-semibold">
                                                                {task.title}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                Due:{" "}
                                                                {new Date(
                                                                    task.due_date,
                                                                ).toLocaleDateString() ||
                                                                    "-"}
                                                            </div>
                                                        </td>

                                                        {/* Assigned */}
                                                        <td className="px-4 py-3">
                                                            {userMap[
                                                                task.assigned_to
                                                            ]?.name || "-"}
                                                        </td>

                                                        {/* Status */}
                                                        <td className="px-4 py-3">
                                                            {isOwner ? (
                                                                <select
                                                                    value={
                                                                        task.status
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateStatus(
                                                                            task.id,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    className="border rounded px-2 py-1 text-xs"
                                                                >
                                                                    <option value="pending">
                                                                        Pending
                                                                    </option>
                                                                    <option value="in_progress">
                                                                        In
                                                                        Progress
                                                                    </option>
                                                                    <option value="done">
                                                                        Done
                                                                    </option>
                                                                    <option value="failed">
                                                                        Failed
                                                                    </option>
                                                                </select>
                                                            ) : (
                                                                <span
                                                                    className={`text-xs capitalize px-2 py-1 rounded ${
                                                                        task.status ===
                                                                        "pending"
                                                                            ? "bg-yellow-100 text-yellow-600"
                                                                            : task.status ===
                                                                                "in_progress"
                                                                              ? "bg-blue-100 text-blue-600"
                                                                              : task.status ===
                                                                                  "done"
                                                                                ? "bg-green-100 text-green-600"
                                                                                : task.status ===
                                                                                    "failed"
                                                                                  ? "bg-red-100 text-red-600"
                                                                                  : "bg-gray-100 text-gray-600"
                                                                    }`}
                                                                >
                                                                    {task.status.replace(
                                                                        "_",
                                                                        " ",
                                                                    )}
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Priority */}
                                                        <td className="px-4 py-3">
                                                            <span
                                                                className={`px-2 py-1 text-xs rounded ${
                                                                    task.priority ===
                                                                    "high"
                                                                        ? "bg-red-100 text-red-600"
                                                                        : task.priority ===
                                                                            "medium"
                                                                          ? "bg-yellow-100 text-yellow-600"
                                                                          : "bg-green-100 text-green-600"
                                                                }`}
                                                            >
                                                                {task.priority}
                                                            </span>
                                                        </td>

                                                        {/* Action */}
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                {task.status !==
                                                                    "done" && (
                                                                    <>
                                                                        {isOwner ? (
                                                                            <>
                                                                                <button
                                                                                    className="px-3 py-1 text-xs bg-amber-500 text-white rounded"
                                                                                    onClick={() => {
                                                                                        setSelectedTask(
                                                                                            task,
                                                                                        );
                                                                                        setShowTaskModal(
                                                                                            true,
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    Edit
                                                                                </button>

                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleDelete(
                                                                                            task.id,
                                                                                        )
                                                                                    }
                                                                                    className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                                                                                >
                                                                                    Delete
                                                                                </button>
                                                                            </>
                                                                        ) : (
                                                                            isMyTask && (
                                                                                <Link
                                                                                    as="button"
                                                                                    method="post"
                                                                                    href={route(
                                                                                        "tasks.confirm",
                                                                                        task.id,
                                                                                    )}
                                                                                    className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                                                                                >
                                                                                    Done
                                                                                </Link>
                                                                            )
                                                                        )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-10">
                                No tasks found
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Invite Member Modal */}
            <InviteMemberModal
                show={showInvite}
                onClose={() => setShowInvite(false)}
                users={allUsers}
                onSubmit={(user) => {
                    router.post(route("projects.invite", project.id), {
                        user_id: user.id,
                    });
                    setShowInvite(false);
                }}
            />

            {/* Add/Edit Task Modal */}
            <TaskModal
                show={showModal}
                onClose={handleCloseModal}
                projects={[project]}
                fixedProjectId={project.id}
                task={selectedTask}
            />
        </AuthenticatedLayout>
    );
}
