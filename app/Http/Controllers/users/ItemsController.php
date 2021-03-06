<?php

namespace App\Http\Controllers\users;

use App\Models\Items;
use App\Traits\ItemRules;
use App\Traits\UploadPhoto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ItemsController extends Controller
{
    use UploadPhoto;
    use ItemRules;

    public function getItem(){
        $items=Items::orderBy('id','desc')->paginate(5);
        return response()->json(compact('items'));
    }

    public function getItemDetails($id){
        $item=Items::find($id);
        return response()->json(compact('item'));
    }

    public function addItem(Request $request , $id){

        $rules=$this->ItemRules();

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(['error at validation'] , 400);
        }

        //import from trait(UploadPhoto) 
        $fileName=$this->UploadPhoto($request->file('photo') , 'images/items');
        

        $items=Items::create([
            'name'        => $request->get('name'),
            'description' => $request->get('description'),
            'status'      => $request->get('status'),
            'price'       => $request->get('price'),
            'date'        => now(),
            'approve'     => 0,
            'photo'       => $fileName,
            'user_id'   => $id,
            'category_id' => $request->get('category_id'),
        ]
        );


        return response()->json(compact('items'));
    }
}
