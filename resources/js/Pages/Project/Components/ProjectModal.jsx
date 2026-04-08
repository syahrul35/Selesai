import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ProjectModal({ show, onClose, project = [] }) {

    const { data, setData, post, put, processing, reset } = useForm({
        name: project?.name || '',
    });

    useEffect(() => {
        if (project) {
            setData({
                name: project.name || '',
            });
        } else {
            reset();
            setData({
                name: '',
            });
        }
    }, [project]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (project) {
            // edit
            put(route('projects.update', project.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            // add
            post(route('projects.store'), {
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
                    {project ? 'Edit Project' : 'Add Project'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
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
                            {project ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}