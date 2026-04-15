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
        DB::table('projects')->whereNotNull('user_id')->chunkById(100, function ($projects) {
            foreach ($projects as $project) {
                DB::table('project_members')->insert([
                    'project_id' => $project->id,
                    'user_id' => $project->user_id,
                    'role' => 'owner',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            //
        });
    }
};
