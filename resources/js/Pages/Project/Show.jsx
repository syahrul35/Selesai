import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { InviteMemberModal } from "./Components/InviteMemberModal";
import TaskModal from "./Components/TaskModal";
import TaskTable from "@/Pages/Task/Components/TaskTable";

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
    const isOwner = project.members?.some(
        (member) =>
            member.id === auth.user.id && member.pivot?.role === "owner",
    );

    const handleDelete = (id) => {
        if (confirm("Delete this task?")) {
            router.delete(route("tasks.destroy", id));
        }
    };

    // invite member
    const [showInvite, setShowInvite] = useState(false);

    // show add/edit task modal
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowTaskModal] = useState(false);

    const handleOpenEdit = (task) => {
        setSelectedTask(task);
        setShowTaskModal(true);
    };

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
                                    const memberIsOwner =
                                        member.pivot?.role === "owner";

                                    return (
                                        <div
                                            key={member.id}
                                            className={`px-3 py-1 rounded text-sm ${
                                                memberIsOwner
                                                    ? "bg-rose-100 text-rose-700 font-semibold"
                                                    : "bg-emerald-100 text-emerald-700"
                                            }`}
                                        >
                                            {member.name}{" "}
                                            {memberIsOwner && " (Owner)"}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <hr className="my-6" />

                        {/* Task List Header */}
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
                                    <button
                                        onClick={() => {
                                            setSelectedTask(null);
                                            setShowTaskModal(true);
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded"
                                    >
                                        + Add Task
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Task Table */}
                        <div className="border rounded-lg overflow-hidden">
                            <TaskTable
                                tasks={filteredTasks}
                                mode="project"
                                isOwner={isOwner}
                                userMap={userMap}
                                onEdit={handleOpenEdit}
                                onDelete={handleDelete}
                            />
                        </div>
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
