import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import TaskHeader from "./Components/TaskHeader";
import TaskFilter from "./Components/TaskFilter";
import TaskTable from "./Components/TaskTable";
import TaskModal from "./Components/TaskModal";
import Calendar from "@/Components/Calendar";

export default function Task() {
    const { tasks, projects, filters, month, year, todayTasks } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Task
                </h2>
            }
        >
            <Head title="Task" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TaskHeader
                                onAddClick={() => {
                                    setSelectedTask(null);
                                    setShowModal(true);
                                }}
                            />
                            
                            <TaskFilter
                                projects={projects}
                                filters={filters}
                                month={month}
                                year={year}
                            />

                            <TaskTable
                                tasks={tasks}
                                onEdit={(task) => {
                                    setSelectedTask(task);
                                    setShowModal(true);
                                }}
                            />

                            {/* Pagination Links */}
                            <div className="mt-4 flex flex-wrap gap-1">
                                {tasks.links.map((link, index) => (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() => router.get(link.url)}
                                        className={`px-3 py-1 border rounded text-sm ${
                                            link.active
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>

                            {/* Modal */}
                            <TaskModal
                                show={showModal}
                                onClose={() => setShowModal(false)}
                                task={selectedTask}
                                projects={projects}
                            />

                            {/* Calendar */}
                            {/* <div className="bg-white p-4 rounded-xl shadow-sm">
                                <Calendar tasks={todayTasks} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
