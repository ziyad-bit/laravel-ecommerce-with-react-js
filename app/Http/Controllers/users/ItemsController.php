<?php

namespace App\Http\Controllers\users;

use App\Models\Items;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ItemsController extends Controller
{
    public function getItem(){
        $items=Items::orderBy('id','desc')->paginate(5);
        return response()->json(compact('items'));
    }
}
