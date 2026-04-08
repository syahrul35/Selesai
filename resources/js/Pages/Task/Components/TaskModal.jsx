import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function TaskModal({ show, onClose, task, projects = [] }) {
    const projectOptions = [{ id: 'no_project', name: 'No Project' }, ...projects];

    const { data, setData, post, put, processing, reset } = useForm({
        title: task?.title || '',
        project_id: task?.project_id || '',
        due_date: task?.due_date || '',
        time_notif: task?.time_notif || '18:00',
        status: task?.status || 'pending',
        description: task?.description || '',
    });

    const normalizeDate = (value) => {
        if (!value) return '';
        // Backend bisa kirim "2026-03-31T17:00:00.000000Z" atau "2026-03-31";
        const dateOnly = value.toString().split('T')[0];
        return dateOnly;
    };

    useEffect(() => {
        if (task) {
            setData({
                title: task.title || '',
                project_id: task.project_id ?? 'no_project',
                due_date: normalizeDate(task.due_date),
                time_notif: task.time_notif || '18:00',
                status: task.status || 'pending',
                description: task.description || '',
            });
        } else {
            reset();
            setData({
                title: '',
                project_id: 'no_project',
                due_date: '',
                time_notif: '18:00',
                status: 'pending',
                description: '',
            });
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task) {
            // edit
            put(route('tasks.update', task.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            // add
            post(route('tasks.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold mb-4">
                    {task ? 'Edit Task' : 'Add Task'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

                    <select
                        value={data.project_id}
                        onChange={(e) => setData('project_id', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select Project</option>
                        <option value="no_project">No Project</option>
                        {projectOptions
                            .filter((proj) => proj.id !== 'no_project')
                            .map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                    </select>

                    <input
                        type="date"
                        value={data.due_date}
                        onChange={(e) => setData('due_date', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

                    <input
                        type="time"
                        value={data.time_notif}
                        onChange={(e) => setData('time_notif', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                    </select>

                    <textarea
                        placeholder="Description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {task ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}