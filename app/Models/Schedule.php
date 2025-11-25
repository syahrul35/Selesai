<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Carbon\Carbon;

class Schedule extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'due_date',
        'status',
        'time_notif',
        'is_notified',
        'description',
    ];

    protected $casts = [
        'due_date'    => 'date',
        'is_notified' => 'boolean',
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
}
