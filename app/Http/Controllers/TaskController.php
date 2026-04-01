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

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = (int) $request->get('month', now()->month);
        $year  = (int) $request->get('year', now()->year);
        $projectId = $request->get('project_id');

        $start = Carbon::create($year, $month)->startOfMonth();
        $end   = Carbon::create($year, $month)->endOfMonth();

        $tasks = Task::with('project')
            ->where('user_id', Auth::id())
            ->whereBetween('due_date', [$start, $end])
            ->when($projectId === 'no_project', function ($query) {
                $query->whereNull('project_id');
            })
            ->when($projectId && $projectId !== 'no_project', function ($query) use ($projectId) {
                $query->where('project_id', $projectId);
            })
            ->orderBy('due_date')
            ->orderBy('time_notif')
            ->paginate(10)
            ->withQueryString();

        $projects = Project::where('user_id', Auth::id())->get();

        return Inertia::render('Task/Index', [
            'tasks' => $tasks,
            'projects' => $projects,
            'filters' => [
                'project_id' => $projectId,
            ],
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
        if ($request->input('project_id') === 'no_project') {
            $request->merge(['project_id' => null]);
        }

        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'project_id' => 'nullable|exists:projects,id',
            'due_date' => 'required|date',
            'status' => 'required|string|max:50',
            'time_notif' => 'required|date_format:H:i',
            'is_notified' => 'nullable|boolean',
            'description' => 'nullable|string',
        ]);

        try {
            $validate['user_id'] = Auth::id();

            Task::create($validate);

            return redirect()
                ->route('tasks.index')
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Task Created Successfully!'
                    ]
                ]);
        } catch (\Throwable $th) {
            return redirect()
                ->route('tasks.index')
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

        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'project_id' => 'nullable|exists:projects,id',
            'due_date' => 'required|date',
            'status' => 'required|string|max:50',
            'time_notif' => 'required|date_format:H:i',
            'is_notified' => 'nullable|boolean',
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

    public function confirm(Task $task)
    {
        try {
            $task->update([
                'status' => 'done'
            ]);

            return back();
        } catch (\Throwable $th) {
            return redirect()
                ->route('dashboard.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Failed to Confirm Task!' . $th
                    ]
                ]);
        }
    }
}
