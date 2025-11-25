<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Schedule Reminder</title>
</head>
<body>
    <h2>📅 {{ $schedule->title }}</h2>

    <p>{{ $schedule->description ?? 'Tidak ada deskripsi.' }}</p>

    <p><strong>Tanggal:</strong> {{ \Carbon\Carbon::parse($schedule->due_date)->format('d M Y') }}</p>
    <p><strong>Waktu Notifikasi:</strong> {{ $schedule->time_notif }}</p>

    <p>Status saat ini: <strong>{{ ucfirst($schedule->status) }}</strong></p>

    <p>Terima kasih,<br>
    {{ config('app.name') }}</p>
</body>
</html>
