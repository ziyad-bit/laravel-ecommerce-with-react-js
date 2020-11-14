<?php

namespace App\Http\Controllers\Admins;

use App\Models\Users;
use App\Traits\UploadPhoto;
use App\Traits\MembersRules;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MembersController extends Controller
{
    use UploadPhoto;
    use MembersRules;

    public function addUser(Request $request ){

        //import from trait(MembersRules)
        $rules=$this->MembersRules($request);

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(['error at validation'] , 400);
        }

        $fileName='';
        if($request->file('photo')){
            //import from trait(UploadPhoto) 
            $fileName=$this->UploadPhoto($request->file('photo') , 'images/items');
        }
        
        

        $users=Users::create([
            'name'     => $request->get('name'),
            'email'    => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'date'     => now(),
            'approve'  => 1,
            'photo'    => $fileName,
        ]
        
        );


        return response()->json(compact('users'));
    }

    public function getUser(){
        $users=Users::orderBy('id','desc')->paginate(2);
        return response()->json(compact('users'));
    }

    public function deleteUser($id){
        $users=Users::find($id);
        $users->delete();
    }

    public function editUser($id){
        $users=Users::find($id);
        return response()->json(compact('users'));
    }

    public function updateUser(Request $request,$id){
        $users=Users::find($id);
        $photo=$request->file('photo');
        $rules=$this->MembersRules($photo,$users);

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json(['error at validation'] , 400);
        }

        $fileName='';
        if($photo){
            $fileName=$this->UploadPhoto($photo , 'images/users');
        }
        

        $users->name     = $request->name;
        $users->email    = $request->email;
        $users->password = $request->password;
        $users->photo    = $fileName;

        $users->save();
        
        return response()->json(compact('users'));
    }
}
