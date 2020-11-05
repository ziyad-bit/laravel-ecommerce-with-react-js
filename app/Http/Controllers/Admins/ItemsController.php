<?php

namespace App\Http\Controllers\Admins;

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
            'approve'     => 1,
            'photo'       => $fileName,
            'admins_id'   => $id
        ]
        
        );


        return response()->json(compact('items'));
    }

    public function getItem(){
        $items=Items::all();
        return response()->json(compact('items'));
    }

    public function editItem($id){
        $items=Items::find($id);
        return response()->json(compact('items'));
    }

    public function updateItem(Request $request,$id){
        $rules=$this->ItemRules();

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(['error at validation'] , 400);
        }

        $fileName=$this->UploadPhoto($request->file('photo') , 'images/items');

        $items=Items::find($id);

        $items->name        = $request->name;
        $items->description = $request->description;
        $items->status      = $request->status;
        $items->price       = $request->price;
        $items->photo       = $fileName;

        $items->save();
        
        return response()->json(compact('items'));
    }

}
