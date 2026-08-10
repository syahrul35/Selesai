<?php

namespace App\Mail;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\URL;

class ScheduleNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $task;

    /**
     * Create a new message instance.
     */
    public function __construct(Task $task)
    {
         $this->task = $task;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reminder: ' . $this->task->title,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $actionUrl = URL::signedRoute('tasks.complete_via_email', ['task' => $this->task->id]);

        return new Content(
            view: 'emails.task_notification',
            with: [
                'task' => $this->task,
                'actionUrl' => $actionUrl,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
