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
            'admins_id'   => $id,
            'category_id' => $request->get('category_id'),
        ]
        );


        return response()->json(compact('items'));
    }

    public function getItem(){
        $items=Items::orderBy('id','desc')->paginate(5);
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
        $items->category_id = $request->category_id;
        

        $items->save();
        
        return response()->json(compact('items'));
    }

    public function deleteItem($id){
        $items=Items::find($id);
        $items->delete();
    }

    public function getCount(){
		$items=Items::all();
		$itemsCount=$items->count();
		return response()->json(compact('itemsCount'));
	}
}
