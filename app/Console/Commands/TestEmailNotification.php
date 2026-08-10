<?php

namespace App\Console\Commands;

use App\Mail\ScheduleNotificationMail;
use App\Models\Task;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmailNotification extends Command
{
    protected $signature = 'test:email-notification {email} {--task=}';

    protected $description = 'Send a test task notification email to a given address';

    public function handle()
    {
        $email = $this->argument('email');
        $taskId = $this->option('task');

        if ($taskId) {
            $task = Task::find($taskId);
            if (!$task) {
                $this->error("Task with ID {$taskId} not found.");
                return 1;
            }
        } else {
            // Create a dummy task for testing purposes
            $task = new Task([
                'id'          => 9999,
                'title'       => '[TEST] Email Button Done',
                'description' => 'This is a test email to verify the Done button feature is working correctly.',
                'status'      => 'pending',
                'due_at'      => now()->addDay()->format('Y-m-d H:i:s'),
                'time_notif'  => now()->format('H:i:s'),
                'user_id'     => 1,
            ]);
            $task->exists = false; // prevent it being treated as a real model
        }

        $this->info("Sending test email to: {$email}");

        try {
            Mail::to($email)->send(new ScheduleNotificationMail($task));
            $this->info("✅ Email sent successfully to {$email}");
        } catch (\Throwable $th) {
            $this->error("❌ Failed to send email: " . $th->getMessage());
            return 1;
        }

        return 0;
    }
}
