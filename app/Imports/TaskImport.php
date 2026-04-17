<?php

namespace App\Imports;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TaskImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // Handle due_date (Excel bisa kirim angka)
        $dueDate = isset($row['due_date'])
            ? Carbon::parse($row['due_date'])->format('Y-m-d')
            : null;

        // Handle time_notif (normalize ke H:i:s)
        $timeNotif = isset($row['time_notif'])
            ? Carbon::parse($row['time_notif'])->format('H:i:s')
            : '18:00:00';

        return new Task([
            'user_id'     => Auth::id(),
            'title'       => $row['title'] ?? 'Untitled Task',
            'project_id'  => $row['project_id'] ?? null,
            'assigned_to' => $row['assigned_to'] ?? null,
            'due_date'    => $dueDate,
            'time_notif'  => $timeNotif,
            'priority'    => $row['priority'] ?? 'medium',
            'status'      => $row['status'] ?? 'pending',
            'is_notified' => $row['is_notified'] ?? false,
            'description' => $row['description'] ?? null,
        ]);
    }
}
