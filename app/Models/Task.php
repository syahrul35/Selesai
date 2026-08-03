<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'project_id',
        'assigned_to',
        'due_at',
        'status',
        'time_notif',
        'is_notified',
        'priority',
        'description',
        'completed_at',
        'is_late',
        'late_reason',
        'status_late_approval',
        'late_decline_reason',
    ];

    protected $casts = [
        'time_notif'  => 'datetime',
        'due_at'     => 'datetime',
        'completed_at' => 'datetime',
        'is_notified'  => 'boolean',
        'is_late'      => 'boolean',
    ];

    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
