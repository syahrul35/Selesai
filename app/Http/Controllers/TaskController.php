<?php

namespace App\Http\Controllers;

use App\Imports\TaskImport;
use App\Models\Project;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $today = Carbon::today();
        $userId = Auth::id();

        $month = (int) $request->get('month', now()->month);
        $year  = (int) $request->get('year', now()->year);
        $projectId = $request->get('project_id');

        $start = Carbon::create($year, $month)->startOfMonth();
        $end   = Carbon::create($year, $month)->endOfMonth();

        // Base query: semua task yang relevan untuk user
        $baseQuery = Task::with('project', 'assignedUser')
            ->where(function ($q) use ($userId) {
                $q->where('user_id', $userId) // task yang dibuat user
                ->orWhere('assigned_to', $userId); // task yang di-assign ke user
            })
            ->select('tasks.*')
            ->distinct();

        // Calendar reference (clone biar tidak bentrok)
        $calendarTasks = (clone $baseQuery);

        // Main tasks (list + filter)
        $tasks = (clone $baseQuery)
            ->whereBetween('due_at', [$start, $end])
            ->when($projectId === 'no_project', function ($query) {
                $query->whereNull('project_id');
            })
            ->when($projectId && $projectId !== 'no_project', function ($query) use ($projectId) {
                $query->where('project_id', $projectId);
            })
            ->orderBy('due_at')
            ->orderBy('time_notif')
            ->paginate(10)
            ->withQueryString();

        // Project list berdasarkan membership
        $projects = Project::with('members')
            ->whereHas('members', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->get();

        return Inertia::render('Task/Index', [
            'tasks' => $tasks,
            'projects' => $projects,
            'filters' => [
                'project_id' => $projectId,
            ],
            'month' => $month,
            'year' => $year,
            'todayTasks' => (clone $calendarTasks)
                ->whereDate('due_at', $today)
                ->limit(7)
                ->get(),
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
        if ($request->input('project_id') === 'no_project') {
            $request->merge(['project_id' => null]);
        }

        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'project_id' => 'nullable|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'priority' => 'required|in:low,medium,high',
            'time_notif' => 'required|date_format:Y-m-d\TH:i', // must date type timestramp
            'description' => 'nullable|string',
        ]);

        try {
            // due at +9 hours from time_notif with Y-m-d\TH:i format
            $validate['due_at'] = Carbon::parse($validate['time_notif'])->addHours(9)->format('Y-m-d H:i:s');

            // if assigned_to is null, then set assigned_to to user_id (creator)
            if (is_null($validate['assigned_to'])) {
                $validate['assigned_to'] = Auth::id();
            }

            $validate['user_id'] = Auth::id();
            $validate['status'] = 'pending';
            $validate['is_notified'] = false;
            $validate['completed_at'] = null;
            $validate['is_late'] = false;

            // dd($validate);
            Task::create($validate);

            return redirect()
                ->back()
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Task Created Successfully!'
                    ]
                ]);
        } catch (\Throwable $th) {
            return redirect()
                ->back()
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Task Failed to Create!' . $th
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
        if ($request->input('project_id') === 'no_project') {
            $request->merge(['project_id' => null]);
        }
        // dd($request->all());

        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'project_id' => 'nullable|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'due_at' => 'required|date',
            'priority' => 'required|in:low,medium,high',
            'time_notif' => 'required|date',
            'description' => 'nullable|string',
        ]);

        try {
            $task = Task::findOrFail($id);
            $task->update($validate);

            return redirect()
                ->route('tasks.index')
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Task Updated Successfully!'
                    ]
                ]);
        } catch (\Throwable $th) {
            return redirect()
                ->route('tasks.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Failed to Update Task!' . $th
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
            Task::destroy($id);

            return redirect()
                ->route('tasks.index')
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Task Deleted Successfully!'
                    ]
                ]);
        } catch (\Throwable $th) {
            return redirect()
                ->route('tasks.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Task Failed to Delete!' . $th
                    ]
                ]);
        }
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        Excel::import(new TaskImport, $request->file('file'));

        return redirect()->route('tasks.index')->with([
            'message' => [
                'type' => 'success',
                'message' => 'Data berhasil diimport!'
            ]
        ]);
    }

    public function confirm(Request $request, Task $task)
    {
        $completedAt = now();
        $isLate = $completedAt->gt(Carbon::parse($task->due_at));

        if ($task->user_id !== Auth::id() && $task->assigned_to !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'late_reason' => $isLate ? 'required|string|max:500' : 'nullable',
        ]);
        
        try {
            $task->update([
                'status' => 'done',
                'completed_at' => $completedAt,
                'is_late' => $isLate,
                'late_reason' => $validated['late_reason'] ?? null,
                'status_late_approval' => $isLate ? 'pending' : null,
                'late_decline_reason' => null, // Reset reason if resubmitted
            ]);

            return back()->with([
                'message' => [
                    'type' => 'success',
                    'message' => 'Task marked as done!'
                ]
            ]);
        } catch (\Throwable $th) {
            return redirect()
                ->back()
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Failed to Confirm Task!' . $th
                    ]
                ]);
        }
    }

    public function approve(Request $request, Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'action' => 'required|in:accept,decline',
            'late_decline_reason' => 'required_if:action,decline|nullable|string|max:500',
        ]);

        try {
            if ($validated['action'] === 'accept') {
                $task->update([
                    'status_late_approval' => 'approved',
                ]);

                // Create log entry
                DB::table('task_logs')->insert([
                    'task_id' => $task->id,
                    'user_id' => Auth::id(),
                    'type' => 'update',
                    'note' => 'Task late submission approved',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $message = 'Task approval accepted!';
            } else {
                $task->update([
                    'status' => 'pending',
                    'status_late_approval' => 'declined',
                    'late_decline_reason' => $validated['late_decline_reason'],
                    'completed_at' => null,
                ]);

                // Create log entry
                DB::table('task_logs')->insert([
                    'task_id' => $task->id,
                    'user_id' => Auth::id(),
                    'type' => 'update',
                    'note' => 'Task late submission declined. Reason: ' . $validated['late_decline_reason'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $message = 'Task approval declined and returned to pending!';
            }

            return back()->with([
                'message' => [
                    'type' => 'success',
                    'message' => $message
                ]
            ]);
        } catch (\Throwable $th) {
            return redirect()
                ->back()
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Failed to process task approval! ' . $th->getMessage()
                    ]
                ]);
        }
    }

    public function completeViaEmail(Request $request, Task $task)
    {
        if ($task->status === 'done') {
            return view('emails.task_completed', [
                'task' => $task,
                'alreadyDone' => true,
            ]);
        }

        $completedAt = now();
        $isLate = $completedAt->gt(Carbon::parse($task->due_at));

        if ($isLate) {
            $submitUrl = URL::signedRoute('tasks.submit_complete_via_email', ['task' => $task->id]);
            return view('emails.task_late_reason', [
                'task' => $task,
                'submitUrl' => $submitUrl,
            ]);
        }

        $task->update([
            'status' => 'done',
            'completed_at' => $completedAt,
            'is_late' => false,
            'late_reason' => null,
            'status_late_approval' => null,
            'late_decline_reason' => null,
        ]);

        try {
            DB::table('task_logs')->insert([
                'task_id' => $task->id,
                'user_id' => $task->user_id,
                'type' => 'update',
                'note' => 'Task marked as done via Email notification link',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (\Throwable $e) {
            
        }

        return view('emails.task_completed', [
            'task' => $task,
            'alreadyDone' => false,
            'isLate' => false,
        ]);
    }

    public function submitCompleteViaEmail(Request $request, Task $task)
    {
        if ($task->status === 'done') {
            return view('emails.task_completed', [
                'task' => $task,
                'alreadyDone' => true,
            ]);
        }

        $validated = $request->validate([
            'late_reason' => 'required|string|max:500',
        ]);

        $completedAt = now();

        $task->update([
            'status' => 'done',
            'completed_at' => $completedAt,
            'is_late' => true,
            'late_reason' => $validated['late_reason'],
            'status_late_approval' => 'pending',
            'late_decline_reason' => null,
        ]);

        try {
            DB::table('task_logs')->insert([
                'task_id' => $task->id,
                'user_id' => $task->user_id,
                'type' => 'update',
                'note' => 'Task marked as done via Email link with late reason: ' . $validated['late_reason'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (\Throwable $e) {
            // Ignore if logging fails
        }

        return view('emails.task_completed', [
            'task' => $task,
            'alreadyDone' => false,
            'isLate' => true,
        ]);
    }
}
