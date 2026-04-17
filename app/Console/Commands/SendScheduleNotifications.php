<?php

namespace App\Console\Commands;

use App\Mail\ScheduleNotificationMail;
use App\Models\Schedule;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendScheduleNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tasks:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send schedule reminder emails to users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = now();
        $this->info("Running command at: " . $now);

        $tasks = Task::where('is_notified', false)
            ->whereDate('due_date', $now->toDateString())
            ->whereTime('time_notif', '<=', $now->toTimeString())
            ->with('user', 'assignedUser')
            ->get();

        $this->info("Found " . $tasks->count() . " schedule.");

        foreach ($tasks as $task) {
            // ambil email dengan prioritas
            $email = optional($task->assignedUser)->email ?? optional($task->user)->email;

            if ($email) {
                Mail::to($email)->send(new ScheduleNotificationMail($task));

                $task->update([
                    'is_notified' => true,
                ]);

                $this->info("Email sent to {$email}");
            } else {
                $this->warn("No valid email for task ID {$task->id}");
            }
        }

        $this->info('Done.');
    }
}
