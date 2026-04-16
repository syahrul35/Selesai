<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectInviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Logic to list all invites for the authenticated user
    }

    public function accept($inviteId)
    {
        // Logic to accept the invite and add the user to the project
    }

    public function reject($inviteId)
    {
        // Logic to reject the invite and remove it from the pending invites
    }
}
