<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table      = 'category';
    protected $fillable   = ['name','description','photo'];
    public    $timestamps = false;

    public function items(){
        return $this->hasMany('App\Models\Items','category_id');
    }
}
