<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $projects = Project::with('members')
            ->whereHas('members', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->withCount([
                'tasks as total_tasks' => function ($query) use ($userId) {
                    $query->where(function ($q) use ($userId) {
                        $q->where('user_id', $userId)
                        ->orWhere('assigned_to', $userId);
                    });
                },
                'tasks as done_tasks' => function ($query) use ($userId) {
                    $query->where('status', 'done')
                        ->where(function ($q) use ($userId) {
                            $q->where('user_id', $userId)
                                ->orWhere('assigned_to', $userId);
                        });
                }
            ])
            ->get()
            ->map(function ($project) use ($userId) {
                $total = $project->total_tasks;
                $done = $project->done_tasks;

                $member = $project->members->firstWhere('id', $userId);
                $role = $member?->pivot?->role;

                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'total_tasks' => $total,
                    'progress' => $total > 0 ? round(($done / $total) * 100) : 0,
                    'role' => $role,
                    'is_owner' => $role === 'owner',
                ];
            });

        return inertia('Project/Index', [
            'projects' => $projects,
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
            'name' => 'required|string|max:255',
        ]);

        try {
            $project = Project::create([
                'name' => $validate['name'],
                'user_id' => Auth::id(), // optional (kalau masih dipakai)
            ]);

            $project->members()->attach(Auth::id(), [
                'role' => 'owner'
            ]);

            return redirect()
                ->route('projects.index')
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Project Created Successfully!'
                    ]
                ]);
        } catch (\Throwable $th) {
            return redirect()
                ->route('projects.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Project Failed to Create!' . $th
                    ]
                ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $userId = Auth::id();

        // Authorization
        abort_unless(
            $project->members()->where('user_id', $userId)->exists(),
            403
        );

        // Load members
        $project->load('members');

        // Tasks with relation
        $tasks = $project->tasks()
            ->with('assignedUser')
            ->where(function ($q) use ($userId) {
                $q->where('user_id', $userId)
                ->orWhere('assigned_to', $userId);
            })
            ->orderBy('due_date')
            ->orderBy('time_notif')
            ->get();

        $projects = collect([$project]);

        return inertia('Project/Show', [
            'projects' => $projects,
            'project' => $project,
            'tasks' => $tasks,
            'allUsers' => User::all()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                ];
            }),
            'users' => $project->members->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                ];
            }),
        ]);
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
            'name' => 'required|string|max:255',
        ]);

        try {
            $project = Project::findOrFail($id);
            $project->update($validate);

            return redirect()
                ->route('projects.index')
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Project Updated Successfully!'
                    ]
                ]); 
        } catch (\Throwable $th) {
            return redirect()
                ->route('projects.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Failed to Update Project!' . $th
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
            $project = Project::findOrFail($id);
            $project->delete();

            return redirect()
                ->route('projects.index')
                ->with([
                    'message' => [
                        'type' => 'success',
                        'message' => 'Project Deleted Successfully!'
                    ]
                ]);
        } catch (\Throwable $th) {
            return redirect()
                ->route('projects.index')
                ->with([
                    'message' => [
                        'type' => 'failed',
                        'message' => 'Failed to Delete Project!' . $th
                    ]
                ]);
        }
    }
}
