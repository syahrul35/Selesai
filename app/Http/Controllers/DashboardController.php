<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $today = Carbon::today();
        $tomorrow = Carbon::tomorrow();
        $next3Days = Carbon::today()->addDays(3);

        // Take the project that the user is a member of
        $projects = Project::whereHas('members', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        });

        // Take the tasks that are assigned to the user or created by the user, and belong to the projects that the user is a member of
        $tasks = Task::with('project')
            ->whereHas('project.members', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->where(function ($q) use ($userId) {
                $q->where('user_id', $userId)
                    ->orWhere('assigned_to', $userId);
            });

        return Inertia::render('Dashboard', [
            'todayTasks' => (clone $tasks)
                ->whereDate('due_date', $today)
                ->limit(7)
                ->get(),

            'upcomingTasks' => (clone $tasks)
                ->whereBetween('due_date', [$tomorrow, $next3Days])
                ->limit(5)
                ->get(),

            'overdueTasks' => (clone $tasks)
                ->whereDate('due_date', '<', $today)
                ->where('status', '!=', 'completed')
                ->limit(5)
                ->get(),

            'summary' => [
                'totalProjects' => Project::with('members')
                    ->whereHas('members', function ($query) use ($userId) {
                        $query->where('user_id', $userId);
                    })->count(),
                'totalTasks' => $tasks->count(),
                'completedTasks' => (clone $tasks)->where('status', 'done')->count(),
            ]
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
