<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Task Reminder</title>
</head>
<body>
    <h2>📅 {{ $task->title }}</h2>

    <p>{{ $task->description ?? 'Tidak ada deskripsi.' }}</p>

    <p><strong>Tanggal:</strong> {{ \Carbon\Carbon::parse($task->due_date)->format('d M Y') }}</p>
    <p><strong>Waktu Notifikasi:</strong> {{ $task->time_notif }}</p>

    <p>Status saat ini: <strong>{{ ucfirst($task->status) }}</strong></p>

    <p>Terima kasih,<br>
    {{ config('app.name') }}</p>
</body>
</html>
