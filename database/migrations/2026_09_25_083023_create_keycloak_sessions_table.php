<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('keycloak_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('keycloak_sid')->unique();
            $table->string('laravel_session_id')->unique();
            $table->string('user_id')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('keycloak_sessions');
    }
};