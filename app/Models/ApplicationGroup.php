<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicationGroup extends Model
{
    protected $fillable = [
        'application_id',
        'group_name',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }
}