<?php

namespace App\Imports;

use App\Models\Schedule;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ScheduleImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Schedule([
            'user_id'     => Auth::id(),
            'title'       => $row['title'],
            'due_date'    => $row['due_date'],
            'status'      => $row['status'],
            'time_notif'  => $row['time_notif'],
            'is_notified' => $row['is_notified'],
        ]);
    }
}
