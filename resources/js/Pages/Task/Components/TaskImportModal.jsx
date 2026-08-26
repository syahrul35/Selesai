import { useState } from "react";
import { router } from "@inertiajs/react";

export default function TaskImportModal({ show, onClose }) {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showGuide, setShowGuide] = useState(false);

    if (!show) return null;

    const handleFileChange = (selectedFile) => {
        setErrorMsg("");
        if (!selectedFile) return;

        const validTypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
            "text/csv",
        ];
        const extension = selectedFile.name.split(".").pop().toLowerCase();

        if (
            !validTypes.includes(selectedFile.type) &&
            !["xlsx", "xls", "csv"].includes(extension)
        ) {
            setErrorMsg("Unsupported file format. Please upload a .xlsx, .xls, or .csv file.");
            return;
        }

        setFile(selectedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const handleClose = () => {
        if (processing) return;
        setFile(null);
        setErrorMsg("");
        setShowGuide(false);
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            setErrorMsg("Please select an Excel/CSV file first.");
            return;
        }

        setErrorMsg("");
        setProcessing(true);

        const formData = new FormData();
        formData.append("file", file);

        router.post(route("tasks.import"), formData, {
            forceFormData: true,
            onSuccess: () => {
                setProcessing(false);
                setFile(null);
                onClose();
            },
            onError: (errors) => {
                setProcessing(false);
                if (errors.file) {
                    setErrorMsg(errors.file);
                } else {
                    setErrorMsg("Failed to import file. Please check your file format.");
                }
            },
            onFinish: () => setProcessing(false),
        });
    };

    const downloadSampleCSV = () => {
        const csvContent =
            "title,project_id,assigned_to,time_notif,priority,status,description\n" +
            '"Sample Task 1",,, "2026-08-30 18:00",medium,pending,"Description for task 1"\n' +
            '"Sample Task 2",,, "2026-08-31 09:00",high,pending,"Description for task 2"';

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "sample_task_import.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-50 p-4 transition-opacity animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">
                                Import Task File
                            </h3>
                            <p className="text-xs text-gray-500">
                                Upload an Excel (.xlsx, .xls) or CSV file
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={processing}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-4">
                    {/* Error Alert */}
                    {errorMsg && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-start gap-2.5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 shrink-0 mt-0.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                />
                            </svg>
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {/* Drag and Drop Zone */}
                    {!file ? (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center relative ${
                                isDragging
                                    ? "border-emerald-500 bg-emerald-50/50 scale-[0.99]"
                                    : "border-gray-200 hover:border-emerald-400 hover:bg-slate-50/50"
                            }`}
                        >
                            <input
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) =>
                                    e.target.files?.[0] &&
                                    handleFileChange(e.target.files[0])
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="w-12 h-12 mb-3 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                                Drag & drop file here, or{" "}
                                <span className="text-emerald-600 font-semibold underline">
                                    browse file
                                </span>
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Supports XLSX, XLS, or CSV (Max 10MB)
                            </p>
                        </div>
                    ) : (
                        /* File Selected Preview Card */
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="p-3 bg-emerald-500 text-white rounded-lg shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                        />
                                    </svg>
                                </div>
                                <div className="truncate">
                                    <p className="text-sm font-semibold text-gray-800 truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFile(null)}
                                disabled={processing}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                title="Remove file"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Template & Guidelines Bar */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                                💡 Need help with Excel format?
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowGuide(!showGuide)}
                                    className="text-emerald-600 hover:text-emerald-700 font-medium underline"
                                >
                                    {showGuide ? "Hide format" : "View column format"}
                                </button>
                                <span className="text-gray-300">•</span>
                                <button
                                    type="button"
                                    onClick={downloadSampleCSV}
                                    className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium underline"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-3.5 h-3.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                        />
                                    </svg>
                                    Download Sample
                                </button>
                            </div>
                        </div>

                        {/* Format guide accordion */}
                        {showGuide && (
                            <div className="pt-2 border-t border-slate-200 text-xs text-gray-600 space-y-1.5">
                                <p className="font-medium text-gray-700">
                                    Supported column headers in your Excel/CSV file:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-500 pl-1">
                                    <li>
                                        <strong className="text-gray-700">title</strong> (Required): Task title
                                    </li>
                                    <li>
                                        <strong className="text-gray-700">priority</strong>: low, medium, or high (Default: medium)
                                    </li>
                                    <li>
                                        <strong className="text-gray-700">time_notif</strong>: Format YYYY-MM-DD HH:mm (optional)
                                    </li>
                                    <li>
                                        <strong className="text-gray-700">description</strong>: Task description or notes
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-slate-50/50 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={processing}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/60 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={processing || !file}
                        className={`px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all shadow-sm flex items-center gap-2 ${
                            processing || !file
                                ? "bg-emerald-400 cursor-not-allowed opacity-75"
                                : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"
                        }`}
                    >
                        {processing ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Importing...
                            </>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                    />
                                </svg>
                                Import Data
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
