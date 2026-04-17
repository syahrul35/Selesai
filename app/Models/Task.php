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
        'due_date',
        'status',
        'time_notif',
        'is_notified',
        'priority',
        'description',
        'completed_at',
        'is_late',
    ];

    protected $casts = [
        'due_date'     => 'datetime',
        'completed_at' => 'datetime',
        'is_notified'  => 'boolean',
        'is_late'      => 'boolean',
    ];

    // Accessor untuk tampilan saja, jangan ubah format asli field
    public function getTimeNotifFormattedAttribute()
    {
        return Carbon::parse($this->time_notif)->format('H:i');
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
