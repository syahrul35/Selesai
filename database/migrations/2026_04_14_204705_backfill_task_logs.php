<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('tasks')->chunkById(100, function ($tasks) {
            foreach ($tasks as $task) {
                DB::table('task_logs')->insert([
                    'task_id' => $task->id,
                    'user_id' => $task->user_id,
                    'type' => 'update',
                    'note' => $task->description,
                    'created_at' => $task->created_at,
                    'updated_at' => $task->updated_at,
                ]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
