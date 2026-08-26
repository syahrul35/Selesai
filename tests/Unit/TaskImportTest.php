<?php

namespace Tests\Unit;

use App\Imports\TaskImport;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class TaskImportTest extends TestCase
{
    public function test_task_import_calculates_due_at_correctly_from_datetime_string()
    {
        Auth::shouldReceive('id')->andReturn(123);

        $import = new TaskImport();
        $row = [
            'title' => 'Test Task',
            'time_notif' => '2026-08-26 10:00:00',
        ];

        $task = $import->model($row);

        $this->assertEquals(123, $task->user_id);
        $this->assertEquals('Test Task', $task->title);
        $this->assertEquals('2026-08-26 10:00:00', $task->time_notif->format('Y-m-d H:i:s'));
        $this->assertEquals('2026-08-26 19:00:00', $task->due_at->format('Y-m-d H:i:s'));
    }

    public function test_task_import_calculates_due_at_correctly_from_excel_numeric_date()
    {
        Auth::shouldReceive('id')->andReturn(123);

        $import = new TaskImport();
        // 46258.416666667 is 2026-08-24 10:00:00 in Excel serial date format
        $row = [
            'title' => 'Test Task Excel Date',
            'time_notif' => 46258.416666667,
        ];

        $task = $import->model($row);

        $this->assertEquals(123, $task->user_id);
        $this->assertEquals('2026-08-24 10:00:00', $task->time_notif->format('Y-m-d H:i:s'));
        $this->assertEquals('2026-08-24 19:00:00', $task->due_at->format('Y-m-d H:i:s'));
    }
}
