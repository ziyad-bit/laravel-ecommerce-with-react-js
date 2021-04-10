<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table      = 'comment';
    protected $fillable   = ['user_id','item_id','comment'];
    public    $timestamps = false;

    public function users(){
        return $this->belongsTo('App\Models\Users','user_id');
    }
}
