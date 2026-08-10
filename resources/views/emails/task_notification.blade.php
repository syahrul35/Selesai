<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Reminder</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px;">
    <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="background-color: #4F46E5; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">📅 Task Reminder</h1>
        </div>
        
        <div style="padding: 24px; color: #374151; line-height: 1.6;">
            <h2 style="margin-top: 0; color: #1F2937; font-size: 18px;">{{ $task->title }}</h2>

            <p style="color: #6B7280; font-size: 14px; margin-bottom: 20px;">
                {{ $task->description ?? 'No description.' }}
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr>
                    <td style="padding: 6px 0; color: #6B7280; width: 140px;"><strong>Due Date:</strong></td>
                    <td style="padding: 6px 0; color: #1F2937;">{{ \Carbon\Carbon::parse($task->due_at)->format('d M Y, H:i') }}</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #6B7280;"><strong>Current Status:</strong></td>
                    <td style="padding: 6px 0;">
                        <span style="display: inline-block; padding: 2px 10px; border-radius: 12px; font-weight: bold; font-size: 12px; background-color: {{ $task->status === 'done' ? '#D1FAE5' : '#FEF3C7' }}; color: {{ $task->status === 'done' ? '#065F46' : '#92400E' }};">
                            {{ ucfirst($task->status) }}
                        </span>
                    </td>
                </tr>
            </table>
            
            @if($task->status !== 'done' && isset($actionUrl))
                <div style="text-align: center; margin: 30px 0 20px 0;">
                    <a href="{{ $actionUrl }}" style="background-color: #10B981; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block; box-shadow: 0 2px 4px rgba(16,185,129,0.3);">
                        ✔ Mark as Done
                    </a>
                </div>
                <p style="font-size: 12px; color: #9CA3AF; text-align: center;">This button contains a secure link to update the task status directly.</p>
            @endif

            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0 16px 0;">

            <p style="font-size: 13px; color: #6B7280; margin: 0;">
                Terima kasih,<br>
                <strong>{{ config('app.name') }}</strong>
            </p>
        </div>
    </div>
</body>
</html>
