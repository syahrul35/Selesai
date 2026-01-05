<?php

namespace App\Http\Controllers;

use App\Imports\ScheduleImport;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = (int) $request->get('month', now()->month);
        $year  = (int) $request->get('year', now()->year);

        $start = Carbon::create($year, $month)->startOfMonth();
        $end   = Carbon::create($year, $month)->endOfMonth();
        
        $schedules = Schedule::where('user_id', Auth::id())
            ->whereBetween('due_date', [$start, $end])
            ->orderBy('due_date')
            ->orderBy('time_notif')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Schedule/Index', [
            'schedules' => $schedules,
            'month' => $month,
            'year' => $year,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'required|date',
            'status' => 'required|string|max:50',
            'time_notif' => 'required|date_format:H:i',
            'is_notified' => 'nullable|boolean',
        ]);

        try {
            $validate['user_id'] = Auth::id();

            Schedule::create($validate);

            return redirect()
                ->route('schedules.index')
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Schedule Created Successfully!'
                    ]
                ]);
        } catch (\Throwable $th) {
            return redirect()
                ->route('schedules.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Schedule Failed to Create!' . $th
                    ]
                ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'required|date',
            'status' => 'required|string|max:50',
            'time_notif' => 'required|date_format:H:i',
            'is_notified' => 'nullable|boolean',
        ]);

        try {
            $schedule = Schedule::findOrFail($id);
            $schedule->update($validate);

            return redirect()
                ->route('schedules.index')
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Schedule Updated Successfully!'
                    ]
                ]);
        } catch (\Throwable $th) {
            return redirect()
                ->route('schedules.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Failed to Update Schedule!' . $th
                    ]
                ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            Schedule::destroy($id);

            return redirect()
                ->route('schedules.index')
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Schedule Deleted Successfully!'
                    ]
                ]);
        } catch (\Throwable $th) {
            return redirect()
                ->route('schedules.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Schedule Failed to Delete!' . $th
                    ]
                ]);
        }
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        Excel::import(new ScheduleImport, $request->file('file'));

        return redirect()->route('schedules.index')->with([
            'message' => [
                'type' => 'success',
                'message' => 'Data berhasil diimport!'
            ]
        ]);
    }

    public function confirm(Schedule $schedule)
    {
        try {
            $schedule->update([
                'status' => 'done'
            ]);

            return back();
        } catch (\Throwable $th) {
            return redirect()
                ->route('dashboard.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Failed to Confirm Schedule!' . $th
                    ]
                ]);
        }
    }
}
