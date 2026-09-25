<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KeycloakSession extends Model
{
    protected $fillable = [
        'keycloak_sid',
        'laravel_session_id',
        'user_id',
    ];

    protected $casts = [
        'user_id' => 'string',
    ];
}