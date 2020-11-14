<?php

namespace App\Http\Controllers\Admins;

use App\Models\Category;
use App\Traits\UploadPhoto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\CategoryRules;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    use UploadPhoto;
    use CategoryRules;
    public function addCategory(Request $request ){
        
        $rules=$this->CategoryRules();

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(['error at validation'] , 400);
        }

        //import from trait(UploadPhoto) 
        $fileName=$this->UploadPhoto($request->file('photo') , 'images/category');
        

        $category=Category::create([
            'name'        => $request->get('name'),
            'description' => $request->get('description'),
            'photo'       => $fileName,
        ]
        
        );


        return response()->json(compact('category'));
    }
}
