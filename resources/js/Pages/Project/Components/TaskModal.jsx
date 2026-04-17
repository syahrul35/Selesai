import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ProjectModal({ show, onClose, projects = [], fixedProjectId = null, task = null }) {

    const { auth } = usePage().props;
    const currentUserId = auth.user.id;

    // Filter projects where the current user is the owner (for global mode)
    const ownerProjects = projects.filter(project => 
        project.members?.some(member => 
            member.id === currentUserId && member.pivot?.role === 'owner'
        )
    );

    const [projectMembers, setProjectMembers] = useState([]);
    
    // Determine initial project_id based on fixedProjectId or task's project_id
    const initialProjectId = fixedProjectId 
        ? fixedProjectId 
        : (task?.project_id || 'no_project');

    const { data, setData, post, put, processing, reset } = useForm({
        title: task?.title || '',
        project_id: initialProjectId,
        assigned_to: task?.assigned_to || '',
        due_date: task?.due_date || '',
        time_notif: task?.time_notif || '18:00',
        priority: task?.priority || 'medium',
        description: task?.description || '',
    });

    const normalizeDate = (value) => {
        if (!value) return '';
        const dateOnly = value.toString().split('T')[0];
        return dateOnly;
    };

    // Update project members when project_id changes
    useEffect(() => {
        if (data.project_id && data.project_id !== 'no_project') {
            const project = projects.find(p => p.id === parseInt(data.project_id));
            if (project && project.members) {
                setProjectMembers(project.members);
            } else {
                setProjectMembers([]);
            }
        } else {
            setProjectMembers([]);
            if (data.project_id === 'no_project' || !data.project_id) {
                setData('assigned_to', '');
            }
        }
    }, [data.project_id, projects]);

    useEffect(() => {
        if (task) {
            setData({
                title: task.title || '',
                project_id: fixedProjectId || (task.project_id ?? 'no_project'),
                assigned_to: task.assigned_to || '',
                due_date: normalizeDate(task.due_date),
                time_notif: task.time_notif || '18:00',
                priority: task.priority || 'medium',
                description: task.description || '',
            });
        } else if (!fixedProjectId) {
            reset();
            setData({
                title: '',
                project_id: 'no_project',
                assigned_to: '',
                due_date: '',
                time_notif: '18:00',
                priority: 'medium',
                description: '',
            });
        }
    }, [task, fixedProjectId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = {
            title: data.title,
            project_id: data.project_id === 'no_project' ? null : data.project_id,
            assigned_to: data.assigned_to || null,
            due_date: data.due_date,
            time_notif: data.time_notif,
            priority: data.priority,
            description: data.description,
        };

        if (task) {
            put(route('tasks.update', task.id), {
                data: submitData,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
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

    // Find the fixed project details if in fixed project mode
    const fixedProject = fixedProjectId 
        ? projects.find(p => p.id === fixedProjectId)
        : null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold mb-4">
                    {task ? 'Edit Task' : 'Add Task'}
                    {fixedProject && ` - ${fixedProject.name}`}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                    {/* Project dropdown */}
                    {!fixedProjectId && (
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
                    )}

                    {/* If in fixed project mode, show info text only */}
                    {fixedProjectId && (
                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            Project: <span className="font-semibold">{fixedProject?.name}</span>
                        </div>
                    )}

                    {/* Assign To dropdown */}
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

                    {/* Due Date */}
                    <input
                        type="date"
                        value={data.due_date}
                        onChange={(e) => setData('due_date', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

                    {/* Time Notification */}
                    <input
                        type="time"
                        value={data.time_notif}
                        onChange={(e) => setData('time_notif', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

                    {/* Priority dropdown */}
                    <select
                        value={data.priority}
                        onChange={(e) => setData('priority', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent Priority</option>
                    </select>

                    {/* Description */}
                    <textarea
                        placeholder="Description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        rows="3"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : (task ? 'Update' : 'Save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}