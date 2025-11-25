<?php

namespace App\Console\Commands;

use App\Mail\ScheduleNotificationMail;
use App\Models\Schedule;
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
    protected $signature = 'schedules:send-reminders';

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

        $schedules = Schedule::where('is_notified', false)
            ->whereDate('due_date', $now->toDateString())
            ->whereTime('time_notif', '<=', $now->toTimeString())
            ->with('user')
            ->get();

        $this->info("Found " . $schedules->count() . " schedule.");

        foreach ($schedules as $schedule) {
            if ($schedule->user && $schedule->user->email) {
                Mail::to($schedule->user->email)->send(new ScheduleNotificationMail($schedule));
                $schedule->update([
                    'is_notified' => true,
                ]);
                $this->info("Email sending to {$schedule->user->email}");
            } else {
                $this->warn("User/Email not found for schedule ID {$schedule->id}");
            }
        }

        $this->info('Done.');
    }
}
