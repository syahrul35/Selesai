import Calendar from '@/Components/Calendar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';

// =====================
// Reusable Components
// =====================

function Badge({ children, color }) {
    const colors = {
        red: 'bg-red-100 text-red-700',
        yellow: 'bg-yellow-100 text-yellow-700',
        gray: 'bg-gray-100 text-gray-700',
        green: 'bg-green-100 text-green-700',
    };

    return (
        <span className={`px-2 py-1 text-xs rounded ${colors[color]}`}>
            {children}
        </span>
    );
}

function TaskListCard({ title, tasks, type }) {
    
    return (
        <div className="bg-white shadow-sm rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>

            {tasks.length === 0 ? (
                <p className="text-sm text-gray-500">No tasks</p>
            ) : (
                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`p-3 rounded-lg border ${
                                type === 'overdue'
                                    ? 'border-red-300 bg-red-50'
                                    : 'border-gray-200'
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-xs text-gray-500">
                                        {task.project?.name || 'No Project'}
                                    </p>
                                </div>

                                {task.priority && (
                                    <Badge
                                        color={
                                            task.priority === 'high'
                                                ? 'red'
                                                : task.priority === 'medium'
                                                ? 'yellow'
                                                : 'gray'
                                        }
                                    >
                                        {task.priority}
                                    </Badge>
                                )}
                            </div>

                            <div className="mt-2 flex justify-between items-center">
                                <Badge
                                    color={
                                        task.status === 'done'
                                            ? 'green'
                                            : 'gray'
                                    }
                                >
                                    {task.status}
                                </Badge>

                                {type === 'overdue' && (
                                    <span className="text-xs text-red-600">
                                        ⚠ Overdue
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function SummaryCard({ summary }) {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500">Projects</p>
                <p className="text-2xl font-bold">
                    {summary.totalProjects}
                </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500">Tasks</p>
                <p className="text-2xl font-bold">
                    {summary.totalTasks}
                </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold">
                    {summary.completedTasks}
                </p>
            </div>
        </div>
    );
}

function QuickActions() {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
            <Link
                href="/tasks/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
                + Add Task
            </Link>

            <Link
                href="/projects/create"
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
            >
                + Add Project
            </Link>
        </div>
    );
}

// =====================
// Main Dashboard
// =====================

export default function Dashboard() {
    const {
        todayTasks,
        upcomingTasks,
        overdueTasks,
        summary,
    } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">

                    {/* Summary */}
                    <SummaryCard summary={summary} />

                    {/* Task Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TaskListCard
                            title="Today Tasks"
                            tasks={todayTasks}
                            type="today"
                        />

                        <TaskListCard
                            title="Upcoming Tasks"
                            tasks={upcomingTasks}
                            type="upcoming"
                        />

                        <TaskListCard
                            title="Overdue Tasks"
                            tasks={overdueTasks}
                            type="overdue"
                        />
                    </div>

                    {/* Quick Actions */}
                    <QuickActions />

                    {/* Calendar */}
                    {/* <div className="bg-white p-4 rounded-xl shadow-sm">
                        <Calendar tasks={todayTasks} />
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
