<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Late Reason Confirmation</title>
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
            padding: 36px 28px;
            max-width: 480px;
            width: 90%;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
        .badge-late {
            background-color: #FEE2E2;
            color: #991B1B;
            font-size: 13px;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 20px;
            display: inline-block;
            margin-bottom: 16px;
        }
        h1 {
            font-size: 20px;
            color: #111827;
            margin: 0 0 8px 0;
        }
        p.subtitle {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.5;
            margin: 0 0 20px 0;
        }
        .task-box {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 14px;
            font-size: 14px;
            color: #1f2937;
            margin-bottom: 20px;
        }
        .task-box strong {
            display: block;
            font-size: 15px;
            margin-bottom: 4px;
            color: #111827;
        }
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }
        label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 6px;
        }
        textarea {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 10px 12px;
            font-size: 14px;
            font-family: inherit;
            resize: vertical;
            min-height: 100px;
            outline: none;
            transition: border-color 0.2s;
        }
        textarea:focus {
            border-color: #4F46E5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }
        .error-text {
            color: #dc2626;
            font-size: 13px;
            margin-top: 4px;
        }
        .btn-submit {
            background-color: #10B981;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.2s;
        }
        .btn-submit:hover {
            background-color: #059669;
        }
    </style>
</head>
<body>
    <div class="card">
        <div style="text-align: center;">
            <span class="badge-late">⚠️ Task Late</span>
            <h1>Task Late Reason</h1>
            <p class="subtitle">This task was completed after the due date. Please fill in the reason for the delay to continue.</p>
        </div>

        <div class="task-box">
            <strong>📌 {{ $task->title }}</strong>
            <span style="color: #6b7280; font-size: 13px;">Due Date: {{ \Carbon\Carbon::parse($task->due_at)->format('d M Y, H:i') }}</span>
        </div>

        <form method="POST" action="{{ $submitUrl }}">
            @csrf
            <div class="form-group">
                <label for="late_reason">Reason for Late <span style="color: #dc2626;">*</span></label>
                <textarea id="late_reason" name="late_reason" placeholder="Example: Experiencing internet connection problems and waiting for data from the team..." required autofocus>{{ old('late_reason') }}</textarea>
                @error('late_reason')
                    <div class="error-text">{{ $message }}</div>
                @enderror
            </div>

            <button type="submit" class="btn-submit">✔ Submit & Mark as Done</button>
        </form>
    </div>
</body>
</html>
