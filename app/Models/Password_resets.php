<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Password_resets extends Model
{
    protected $table='password_resets';
    protected $fillable=['token','email','created_at','updated_at'];
    
    
}
