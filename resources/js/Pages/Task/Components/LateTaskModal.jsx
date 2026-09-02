import { useForm } from "@inertiajs/react";

export default function LateTaskModal({ show, onClose, task }) {
    const { data, setData, post, processing, reset } = useForm({
        late_reason: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Sending data to the confirm route with a reason
        post(route("tasks.confirm", task.id), {
            data: { late_reason: data.late_reason },
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                <h2 className="text-lg font-bold mb-4 text-red-600">
                    Late Task!
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    This task has already passed its due date. Please fill in the reason for the delay:
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        required
                        className="w-full border rounded px-3 py-2"
                        rows="3"
                        placeholder="Write your reason..."
                        value={data.late_reason}
                        onChange={(e) => setData("late_reason", e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                            {processing ? 'Processing...' : 'Done'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
