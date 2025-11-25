import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ScheduleModal({ show, onClose, schedule }) {
    const { data, setData, post, put, processing, reset } = useForm({
        title: schedule?.title || '',
        due_date: schedule?.due_date || '',
        time_notif: schedule?.time_notif || '18:00',
        status: schedule?.status || 'pending',
        description: schedule?.description || '',
    });

    useEffect(() => {
        if (schedule) {
            setData({
                title: schedule.title || '',
                due_date: schedule.due_date || '',
                time_notif: schedule.time_notif || '18:00',
                status: schedule.status || 'pending',
                description: schedule.description || '',
            });
        } else {
            reset();
            setData({
                title: '',
                due_date: '',
                time_notif: '18:00',
                status: 'pending',
                description: '',
            });
        }
    }, [schedule]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (schedule) {
            // edit
            put(route('schedules.update', schedule.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            // add
            post(route('schedules.store'), {
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
                    {schedule ? 'Edit Schedule' : 'Add Schedule'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

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
                            {schedule ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}