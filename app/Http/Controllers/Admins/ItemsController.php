<?php

namespace App\Http\Controllers\Admins;

use App\Models\Items;



use App\Traits\ItemRules;
use App\Traits\UploadPhoto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\General;
use Illuminate\Support\Facades\Validator;

class ItemsController extends Controller
{
    use UploadPhoto;
    use ItemRules;
    use General;
    
    ######################################        add            ########################## 
    public function addItem(Request $request ){
        try {
            $rules=$this->ItemRules($request->file('photo'));

            $validator=Validator::make($request->all(),$rules);
    
            if($validator->fails()){
                return  $this->returnError($validator->errors(),400);
            }
    
            //import from trait(UploadPhoto) 
            $fileName=$this->UploadPhoto($request->file('photo') , 'images/items');
            
            $name        = filter_var($request->get('name')        ,FILTER_SANITIZE_STRING);
            $description = filter_var($request->get('description') ,FILTER_SANITIZE_STRING);
            $price       = filter_var($request->get('price')       ,FILTER_SANITIZE_STRING);
            $photo       = filter_var($fileName                    ,FILTER_SANITIZE_STRING);
    
            Items::create([
                'name'        => $name,
                'description' => $description,
                'status'      => $request->get('status'),
                'price'       => $price,
                'date'        => now(),
                'approve'     => 1,
                'photo'       => $photo,
                'admins_id'   => $request->admins_id,
                'category_id' => $request->get('category_id'),
            ]);
    
            return $this->returnSuccess('you successfully added item');

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        get            ########################## 
    public function getItem(){
        try {
            $items=Items::orderBy('id','desc')->paginate(5);
            return $this->returnSuccess('','items',$items);
        } catch (\Throwable $th) {
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        edit            ########################## 
    public function editItem($id){
        try {
            $items=Items::find($id);
            if(!$items ){
                return $this->returnError("this item isn't found",404);
            }
            return $this->returnSuccess('','items',$items);

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        updateItem            ########################## 
    public function updateItem(Request $request,$id){
        try {
            $photo=$request->file('photo');
            $rules=$this->ItemRules($photo);

            $validator=Validator::make($request->all(),$rules);
    
            if($validator->fails()){
                return $this->returnError($validator->errors(),400);
            }

            $items=Items::find($id);
            if(! $items){
                return $this->returnError("this item isn't found",404);
            }

            $fileName=$items->$photo;
            if($photo){
                $fileName=$this->UploadPhoto($request->file('photo') , 'images/items');
            }

            $name        = filter_var($request->name        ,FILTER_SANITIZE_STRING);
            $description = filter_var($request->description ,FILTER_SANITIZE_STRING);
            $price       = filter_var($request->price       ,FILTER_SANITIZE_STRING);
            $photo       = filter_var($fileName             ,FILTER_SANITIZE_STRING);

            $items->name        = $name;
            $items->description = $description;
            $items->status      = $request->status;
            $items->price       = $price;
            $items->photo       = $photo;
            $items->category_id = $request->category_id;
            
            $items->save();
            
            return $this->returnSuccess('you successfully updated item');

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
    }

    ######################################        delete            ########################## 
    public function deleteItem($id){
        try {
            $items=Items::find($id);
            if(! $items){
                return $this->returnError("this item isn't found",404);
            }
            $items->delete();

            return $this->returnSuccess('you successfully deleted item');

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
        
    }

    ######################################        get count            ########################## 
    public function getCount(){
        try {
            $items=Items::all();
            $itemsCount=$items->count();
            return response()->json(compact('itemsCount'));

        } catch (\Exception $th) {
            return  $this->returnError('something went wrong',500);
        }
	
	}
}
