import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function TaskModal({ show, onClose, task, projects = [] }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectMembers, setProjectMembers] = useState([]);

    const projectOptions = [{ id: 'no_project', name: 'No Project' }, ...projects];

    const { data, setData, post, put, processing, reset } = useForm({
        title: task?.title || '',
        project_id: task?.project_id || '',
        assigned_to: task?.assigned_to || '',
        due_at: task?.due_at || '',
        time_notif: task?.time_notif || '18:00',
        priority: task?.priority || 'medium',
        description: task?.description || '',
    });

    const normalizeDate = (value) => {
        if (!value) return '';
        // Backend bisa kirim "2026-03-31T17:00:00.000000Z" atau "2026-03-31";
        const dateOnly = value.toString().split('T')[0];
        return dateOnly;
    };

    // Get current user ID from auth prop
    const { auth } = usePage().props;
    const currentUserId = auth.user.id;

    // Filter projects where current user is owner
    const ownerProjects = projects.filter(project => 
        project.members?.some(member => 
            member.id === currentUserId && member.pivot?.role === 'owner'
        )
    );

    // Update project members when project_id changes
    useEffect(() => {
        if (data.project_id && data.project_id !== 'no_project') {
            const project = projects.find(p => p.id === parseInt(data.project_id));
            if (project && project.members) {
                setProjectMembers(project.members);
                setSelectedProject(project);
            } else {
                setProjectMembers([]);
                setSelectedProject(null);
            }
        } else {
            setProjectMembers([]);
            setSelectedProject(null);
            // Reset assigned_to if no project selected
            if (data.project_id === 'no_project' || !data.project_id) {
                setData('assigned_to', '');
            }
        }
    }, [data.project_id, projects]);

    useEffect(() => {
        if (task) {
            setData({
                title: task.title || '',
                project_id: task.project_id ?? 'no_project',
                assigned_to: task.assigned_to || '',
                due_at: normalizeDate(task.due_at),
                time_notif: task.time_notif || '18:00',
                priority: task.priority || 'medium',
                description: task.description || '',
            });
        } else {
            reset();
            setData({
                title: '',
                project_id: 'no_project',
                assigned_to: '',
                due_at: '',
                time_notif: '18:00',
                priority: 'medium',
                description: '',
            });
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare data for submission
        const submitData = {
            ...data,
            // If project_id is 'no_project', send null instead
            project_id: data.project_id === 'no_project' ? null : data.project_id,
            // If assigned_to is empty, send null
            assigned_to: data.assigned_to || null
        };

        if (task) {
            // edit
            put(route('tasks.update', task.id), {
                data: submitData,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            // add
            post(route('tasks.store'), {
                data: submitData,
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
                        {ownerProjects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>

                    {/* Assign To dropdown - only shows when project is selected */}
                    {(data.project_id && data.project_id !== 'no_project' && projectMembers.length > 0) && (
                        <select
                            value={data.assigned_to}
                            onChange={(e) => setData('assigned_to', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Assign to (Optional)</option>
                            {projectMembers.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name} {member.pivot?.role === 'owner' && '(Owner)'}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Show message when project has no members */}
                    {(data.project_id && data.project_id !== 'no_project' && projectMembers.length === 0 && selectedProject) && (
                        <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
                            No members in this project yet
                        </div>
                    )}

                    <input
                        type="date"
                        value={data.due_at}
                        onChange={(e) => setData('due_at', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

                    <input
                        type="datetime-local"
                        value={data.time_notif}
                        onChange={(e) => setData('time_notif', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

                    {/* Priority dropdown - replaces status */}
                    <select
                        value={data.priority}
                        onChange={(e) => setData('priority', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
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