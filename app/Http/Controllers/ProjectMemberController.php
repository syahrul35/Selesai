<?php

namespace App\Http\Controllers;

use App\Mail\ProjectInvited;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ProjectMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($projectId)
    {
        $project = Project::findOrFail($projectId);
        $members = $project->members; // Assuming a relationship is defined in the Project model

        return response()->json($members);
    }

    public function invite(Request $request, Project $project)
    {
        $user = User::findOrFail($request->user_id);
        
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        // attach member
        $project->members()->syncWithoutDetaching($user->id);

        // send email
        Mail::to($user->email)->send(new ProjectInvited($project));

        return back();
    }

    public function remove($projectId, $userId)
    {
        // Logic to remove a member from the project
    }
}
