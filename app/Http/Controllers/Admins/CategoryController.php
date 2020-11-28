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
        $nameUniqueRule=[
            'name'=>'unique:category'
        ];
        $error=[
            'name_unique'=>'this name is used'
        ];

        $validator=Validator::make($request->only('name'),$nameUniqueRule);
        if($validator->fails()){
            return response()->json($error , 400);
        }

        //import from trait(CategoryRules)
        $rules=$this->CategoryRules($request);

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

    public function getCategory(){
        $categories=Category::paginate(5);
        return response()->json(compact('categories'));
    }

    public function deleteCategory($id){
        $categories=Category::find($id);
        $categories->delete();
    }

    public function updateCategory(Request $request ,$id){
        $nameUniqueRule=[
            'name'=>'unique:category,name,'.$id
        ];
        $error=[
            'name_unique'=>'this name is used'
        ];

        $validator=Validator::make($request->only('name'),$nameUniqueRule);
        if($validator->fails()){
            return response()->json($error , 400);
        }

        //import from trait(CategoryRules)
        $rules=$this->CategoryRules($request);

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(['error at validation'] , 400);
        }
        
        $category=Category::find($id);
        $category->name=$request->name;
        $category->description=$request->description;

        return response()->json(compact('category'));
    }

    public function updatePhoto(Request $request ,$id){

        //import from trait(CategoryRules)
        $rules=[
            'photo'=>'required|image|mimes:jpg,jpeg,gif,png|max:14'
        ];

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(['error at validation'] , 400);
        }

        //import from trait(UploadPhoto) 
        $fileName=$this->UploadPhoto($request->file('photo') , 'images/category');
        

        $category=Category::find($id);
        $category->photo=$request->photo;
        

        return response()->json(compact('category'));
    }

    public function editCategory($id){
        $category=Category::find($id);
        return response()->json(compact('category'));
    }
    
}
