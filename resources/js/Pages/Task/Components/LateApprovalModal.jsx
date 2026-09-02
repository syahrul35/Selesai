import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function LateApprovalModal({ show, onClose, task }) {
    const [step, setStep] = useState("review"); // "review" | "decline"

    const { data, setData, post, processing, reset } = useForm({
        action: "accept",
        late_decline_reason: "",
    });

    const handleAccept = () => {
        post(route("tasks.approve", task.id), {
            data: { action: "accept" },
            onSuccess: () => {
                handleClose();
            },
        });
    };

    const handleDeclineSubmit = (e) => {
        e.preventDefault();
        post(route("tasks.approve", task.id), {
            onSuccess: () => {
                handleClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        setStep("review");
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            Review Late Task
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">{task.title}</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition text-xl leading-none ml-4"
                        title="Tutup"
                    >
                        &times;
                    </button>
                </div>

                {/* Late Reason */}
                <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Late Reason
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-sm text-gray-700 min-h-[60px]">
                        {task.late_reason
                            ? task.late_reason
                            : <span className="text-gray-400 italic">No reason provided.</span>
                        }
                    </div>
                </div>

                {/* Step: Review — show two buttons */}
                {step === "review" && (
                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setData("action", "decline");
                                setStep("decline");
                            }}
                            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
                        >
                            Decline
                        </button>
                        <button
                            type="button"
                            onClick={handleAccept}
                            disabled={processing}
                            className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
                        >
                            {processing ? "Processing..." : "Approve"}
                        </button>
                    </div>
                )}

                {/* Step: Decline — show decline reason */}
                {step === "decline" && (
                    <form onSubmit={handleDeclineSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                Decline Reason
                            </label>
                            <textarea
                                required
                                rows="3"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                                placeholder="Write decline reason..."
                                value={data.late_decline_reason}
                                onChange={(e) =>
                                    setData("late_decline_reason", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={() => setStep("review")}
                                className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
                            >
                                {processing ? "Processing..." : "Send Rejection"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
