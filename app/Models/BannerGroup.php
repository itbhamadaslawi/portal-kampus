<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BannerGroup extends Model
{
    protected $fillable = [
        'banner_id',
        'group_name',
    ];

    public function banner(): BelongsTo
    {
        return $this->belongsTo(
            Banner::class
        );
    }
}