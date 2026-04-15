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
        Schema::table('tasks', function (Blueprint $table) {
            // assignment
            $table->foreignId('assigned_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // priority
            $table->enum('priority', ['low', 'medium', 'high'])
                ->default('medium');

            // status improvement
            $table->enum('status', ['pending', 'in_progress', 'done', 'failed'])
                ->default('pending')
                ->change();

            // late indicator
            $table->boolean('is_late')->default(false);

            // completion time
            $table->timestamp('completed_at')->nullable();
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
