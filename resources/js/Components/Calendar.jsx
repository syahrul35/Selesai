import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { router, usePage } from "@inertiajs/react";

dayjs.extend(isToday);

const Calendar = ({ transactions = [], categories = [] }) => {
    const { schedules } = usePage().props;

    const [viewDate, setViewDate] = useState(dayjs());

    const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const daystoPrepend = useMemo(() => {
        const startOfMonth = viewDate.startOf("month");
        const startOfFirstWeek = startOfMonth.startOf("week");
        const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, "day");
        return Array.from({ length: daysToFirstDay }, (_, i) => i);
    }, [viewDate]);

    const units = useMemo(() => {
        const ranges = [];
        let currentDate = viewDate.startOf("month");
        const endOfRange = viewDate.endOf("month");

        while (
            currentDate.isBefore(endOfRange) ||
            currentDate.isSame(endOfRange)
        ) {
            ranges.push(currentDate);
            currentDate = currentDate.add(1, "day");
        }
        return ranges;
    }, [viewDate]);

    const shiftMonth = (amount) => setViewDate(viewDate.add(amount, "month"));
    const reset = () => setViewDate(dayjs());

    const getSchedulesByDate = (date) => {
        const dateString = date.format("YYYY-MM-DD");

        return schedules.filter((s) => {
            const scheduleDate = dayjs(s.due_date).format("YYYY-MM-DD");
            return scheduleDate === dateString;
        });
    };

    const onConfirmSchedule = (id) => {
        router.post(
            `/schedules/${id}/confirm`,
            {},
            {
                onSuccess: () => {
                    console.log("Schedule updated!");
                },
            }
        );
    };

    return (
        <div className="container bg-white p-2 rounded-lg shadow-xl mb-4 max-h-[80vh] overflow-y-auto">
            <div className="min-w-[900px] overflow-x-auto calendar">
                <div className="flex items-center justify-between mb-4 tag">
                    <button
                        className="bg-emerald-500 p-2 rounded-lg text-white shadow-lg text-sm"
                        onClick={reset}
                    >
                        Today
                    </button>
                    <div className="flex items-center space-x-4">
                        <button className="btn" onClick={() => shiftMonth(-1)}>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                ></path>
                            </svg>
                        </button>
                        <span className="text-lg">
                            {viewDate.format("MMMM YYYY")}
                        </span>
                        <button className="btn" onClick={() => shiftMonth(1)}>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((d) => (
                        <div key={d} className="text-center">
                            {d}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7">
                    {daystoPrepend.map((p) => (
                        <div key={p}></div>
                    ))}
                    {units.map((d) => {
                        const daySchedules = getSchedulesByDate(d);
                        return (
                            <div
                                key={d.format("YYYY-MM-DD")}
                                className="border border-slate-200 flex flex-col h-32 p-1"
                            >
                                <div
                                    className={`${
                                        d.isToday()
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-100"
                                    } text-center`}
                                >
                                    <span>{d.format("D")}</span>
                                </div>

                                <div className="flex flex-col overflow-y-auto text-xs mt-1 space-y-1">
                                    {daySchedules.length === 0 ? (
                                        <div className="text-gray-400 text-center">
                                            No schedule
                                        </div>
                                    ) : (
                                        daySchedules.map((s) => (
                                            <div
                                                key={s.id}
                                                className={`p-1 ${s.status === 'done' ? 'bg-emerald-200' : 'bg-blue-50'} rounded border`}
                                            >
                                                <div className="font-semibold">
                                                    {s.title}
                                                </div>
                                                <div className="text-[10px] text-gray-600">
                                                    Status: {s.status}
                                                </div>

                                                {s.status === "pending" && (
                                                    <button
                                                        className="bg-emerald-500 text-white px-2 py-1 text-xs rounded mt-1"
                                                        onClick={() =>
                                                            onConfirmSchedule(
                                                                s.id
                                                            )
                                                        }
                                                    >
                                                        Confirm
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
