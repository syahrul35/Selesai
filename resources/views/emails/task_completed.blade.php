<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Status Updated</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .card {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px 32px;
            max-width: 450px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
        .icon {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin: 0 auto 20px auto;
        }
        .icon-success {
            background-color: #D1FAE5;
            color: #059669;
        }
        .icon-pending {
            background-color: #FEF3C7;
            color: #D97706;
        }
        .badge-pending {
            display: inline-block;
            background-color: #FEF3C7;
            color: #92400E;
            font-size: 13px;
            font-weight: 600;
            padding: 5px 12px;
            border-radius: 20px;
            margin-bottom: 12px;
        }
        h1 {
            font-size: 22px;
            color: #111827;
            margin: 0 0 10px 0;
        }
        p {
            color: #4b5563;
            font-size: 15px;
            line-height: 1.5;
            margin: 0 0 24px 0;
        }
        .task-box {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 14px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 24px;
        }
        .btn {
            background-color: #4F46E5;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            display: inline-block;
            transition: background-color 0.2s;
        }
        .btn:hover {
            background-color: #4338CA;
        }
    </style>
</head>
<body>
    <div class="card">
        
        @if($alreadyDone)
            <div class="icon icon-success">✓</div>
            <h1>Task already marked as done!</h1>
            <p>This task was previously marked as done.</p>
        @elseif($isLate)
            <div class="icon icon-pending">⏳</div>
            <span class="badge-pending">⚠️ Pending Approval</span>
            <h1>Task submitted, waiting for approval</h1>
            <p>Your task has been marked as <strong>Done</strong>, but since it was submitted late, it is currently <strong>waiting for approval</strong> from the task creator.</p>
        @else
            <div class="icon icon-success">✓</div>
            <h1>Task completed successfully!</h1>
            <p>The task status has been updated to <strong>Done</strong>.</p>
        @endif

        <div class="task-box">
            📌 {{ $task->title }}
        </div>

        <a href="{{ url('/') }}" class="btn">Back to Application</a>
    </div>
</body>
</html>
