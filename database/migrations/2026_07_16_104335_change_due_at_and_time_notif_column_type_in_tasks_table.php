<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Rename column
        Schema::table('tasks', function (Blueprint $table) {
            $table->renameColumn('due_date', 'due_at');
        });

        // Change column type
        Schema::table('tasks', function (Blueprint $table) {
            $table->timestamp('due_at')->nullable()->change();
            $table->timestamp('time_notif')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Change column type back
        Schema::table('tasks', function (Blueprint $table) {
            $table->date('due_at')->nullable()->change();
            $table->date('time_notif')->nullable()->change();
        });

        // Rename column back
        Schema::table('tasks', function (Blueprint $table) {
            $table->renameColumn('due_at', 'due_date');
        });
    }
};
