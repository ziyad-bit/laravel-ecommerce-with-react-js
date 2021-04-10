<?php

namespace App\Http\Controllers\users;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function getCategory(){
        $categories=Category::where('id','>','0')->get();
        return response()->json(compact('categories'));
    }

    public function getCategoryItems($id){
        $categories=Category::find($id);
        $category_items=Category::find($id)->items;
        return response()->json(compact('categories','category_items'));
    }
}
