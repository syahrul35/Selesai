import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import { useState } from "react";
import ScheduleModal from "../../Components/ScheduleModal";

export default function Schedule() {
    const { schedules, month, year } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    // Import Excel
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            alert("Pilih file Excel terlebih dahulu!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        router.post(route("schedules.import"), formData, {
            forceFormData: true,
            onSuccess: () => {
                alert("Data berhasil diimport!");
            },
        });
    };

    const goToMonth = (newMonth, newYear) => {
        router.get(route("schedules.index"), {
            month: newMonth,
            year: newYear,
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Schedule
                </h2>
            }
        >
            <Head title="Schedule" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Tombol Add */}
                            <div className="mb-4">
                                <button
                                    onClick={() => {
                                        setSelectedSchedule(null);
                                        setShowModal(true);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    + Add Schedule
                                </button>
                            </div>

                            {/* Tombol Import */}
                            <div className="mb-4">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex items-center gap-3"
                                >
                                    <label className="flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition">
                                        <span className="text-sm text-gray-700">
                                            📂 Pilih File
                                        </span>
                                        <input
                                            type="file"
                                            accept=".xlsx,.xls,.csv"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
                                    >
                                        ⬆️ Import Excel
                                    </button>
                                </form>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={() =>
                                        goToMonth(
                                            month === 1 ? 12 : month - 1,
                                            month === 1 ? year - 1 : year
                                        )
                                    }
                                    className="px-3 py-1 bg-gray-200 rounded"
                                >
                                    ← Prev
                                </button>

                                <div className="font-semibold">
                                    {new Date(year, month - 1).toLocaleString("id-ID", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </div>

                                <button
                                    onClick={() =>
                                        goToMonth(
                                            month === 12 ? 1 : month + 1,
                                            month === 12 ? year + 1 : year
                                        )
                                    }
                                    className="px-3 py-1 bg-gray-200 rounded"
                                >
                                    Next →
                                </button>
                            </div>

                            {/* Tabel */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left">
                                                Title
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Due Date
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Time Notif
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Status
                                            </th>
                                            <th className="px-4 py-2 text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {schedules.data.length > 0 ? (
                                            schedules.data.map((schedule) => (
                                                <tr key={schedule.id}>
                                                    <td className="px-4 py-2">
                                                        {schedule.title}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {new Date(schedule.due_date).toLocaleDateString("id-ID", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric"
                                                        })}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {schedule.time_notif}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {schedule.status}
                                                    </td>
                                                    <td className="px-4 py-2 text-center md:space-x-auto lg:space-x-2 space-y-1">
                                                        <button
                                                            key={schedule.id}
                                                            onClick={() => {
                                                                setSelectedSchedule(
                                                                    schedule
                                                                );
                                                                setShowModal(
                                                                    true
                                                                );
                                                            }}
                                                            className="px-3 py-1 bg-yellow-500 text-white rounded w-20 h-8"
                                                        >
                                                            Edit
                                                        </button>
                                                        <Link
                                                            as="button"
                                                            method="delete"
                                                            href={route(
                                                                "schedules.destroy",
                                                                schedule.id
                                                            )}
                                                            className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 w-20 h-8"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-4 py-2 text-center text-gray-500"
                                                >
                                                    No schedules found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Links */}
                            <div className="mt-4 flex flex-wrap gap-1">
                                {schedules.links.map((link, index) => (
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
                            <ScheduleModal
                                show={showModal}
                                onClose={() => setShowModal(false)}
                                schedule={selectedSchedule}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
