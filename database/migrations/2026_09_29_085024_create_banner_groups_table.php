<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('banner_groups', function (Blueprint $table) {
            $table->id();

            $table->foreignId('banner_id')
                ->constrained('banners')
                ->cascadeOnDelete();

            $table->string('group_name');

            $table->timestamps();

            $table->unique([
                'banner_id',
                'group_name',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('banner_groups');
    }
};