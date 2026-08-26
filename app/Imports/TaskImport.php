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
        // Handle time_notif (normalize to datetime/timestamp)
        $timeNotifRaw = $row['time_notif'] ?? null;
        if ($timeNotifRaw) {
            if (is_numeric($timeNotifRaw)) {
                $timeNotif = Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($timeNotifRaw));
            } else {
                $timeNotif = Carbon::parse($timeNotifRaw);
            }
        } else {
            $timeNotif = now()->setTime(18, 0, 0);
        }

        // due_at is automatically +9 hours from time_notif
        $dueAt = (clone $timeNotif)->addHours(9);

        return new Task([
            'user_id'     => Auth::id(),
            'title'       => $row['title'] ?? 'Untitled Task',
            'project_id'  => $row['project_id'] ?? null,
            'assigned_to' => $row['assigned_to'] ?? Auth::id(),
            'due_at'      => $dueAt->format('Y-m-d H:i:s'),
            'time_notif'  => $timeNotif->format('Y-m-d H:i:s'),
            'priority'    => $row['priority'] ?? 'medium',
            'status'      => $row['status'] ?? 'pending',
            'is_notified' => $row['is_notified'] ?? false,
            'description' => $row['description'] ?? null,
        ]);
    }
}
