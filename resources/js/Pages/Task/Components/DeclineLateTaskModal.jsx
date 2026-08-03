import { useForm } from "@inertiajs/react";

export default function DeclineLateTaskModal({ show, onClose, task }) {
    const { data, setData, post, processing, reset } = useForm({
        action: "decline",
        late_decline_reason: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tasks.approve", task.id), {
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
                    Tolak Penyelesaian Task
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    Mohon isi alasan mengapa Anda menolak penyelesaian task terlambat ini:
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        required
                        className="w-full border rounded px-3 py-2 text-sm"
                        rows="3"
                        placeholder="Tulis alasan penolakan..."
                        value={data.late_decline_reason}
                        onChange={(e) => setData("late_decline_reason", e.target.value)}
                    />
                    <div className="flex justify-end gap-2 text-sm">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            {processing ? 'Processing...' : 'Tolak Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
