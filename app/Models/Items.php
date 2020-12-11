<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    protected $table='items';
    protected $fillable=['name','description','status','price','date','approve','photo','admins_id','category_id'];
    public $timestamps=false;
    
    public function category(){
        return $this->belongsTo('App\Models\Category','category_id');
    }
}
