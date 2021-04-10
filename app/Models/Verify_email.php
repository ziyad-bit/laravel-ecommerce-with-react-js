<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Verify_email extends Model
{
    protected $table    = 'verify_email';
    protected $fillable = ['token','email','created_at','updated_at'];
}
