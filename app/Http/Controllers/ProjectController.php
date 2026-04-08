<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::all();

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
            $validate['user_id'] = Auth::id();

            Project::create($validate);

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
